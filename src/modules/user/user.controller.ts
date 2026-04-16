import { Request, Response } from "express";
import httpStatus, { status } from "http-status";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import User from "./user.model";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const CreateUser = async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  if (!userData.name || !userData.email || !userData.password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Name, email, and password are required",
      success: false,
      status: status.BAD_REQUEST,
    });
  }

  if (
    typeof userData.name !== "string" ||
    typeof userData.email !== "string" ||
    typeof userData.password !== "string"
  ) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Name, email, and password must be strings",
      success: false,
      status: status.BAD_REQUEST,
    });
  }

  if (userData.email.length < 5 || userData.password.length < 6) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message:
        "Email must be at least 5 characters and password at least 6 characters",
      success: false,
      status: status.BAD_REQUEST,
    });
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Invalid email format",
      success: false,
      status: status.BAD_REQUEST,
    });
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(httpStatus.CONFLICT).json({
      message: "User with this email already exists",
      success: false,
      status: status.CONFLICT,
    });
  }

  try {
    const result = await UserService.createUser(userData);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      data: result,
      success: true,
      status: status.CREATED,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create user",
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
      status: status.INTERNAL_SERVER_ERROR,
    });
  }
};

const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Email and password are required",
      success: false,
      status: status.BAD_REQUEST,
    });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Email and password must be strings",
      success: false,
      status: status.BAD_REQUEST,
    });
  }
  if (email.length < 5 || password.length < 6) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message:
        "Email must be at least 5 characters and password at least 6 characters",
      success: false,
      status: status.BAD_REQUEST,
    });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Invalid email format",
      success: false,
      status: status.BAD_REQUEST,
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid email or password",
      success: false,
      status: status.UNAUTHORIZED,
    });
  }

  // Compare the password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );
  if (!isPasswordValid) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid email or password",
      success: false,
      status: status.UNAUTHORIZED,
    });
  }

  // If login is successful, return the user data (excluding password)
  const userData = await UserService.loginUser({ email, password });

  if (!userData) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Login failed",
      success: false,
      status: status.UNAUTHORIZED,
    });
  }

  res.cookie("refreshToken", userData.refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    maxAge: 2592000000, // 30 days
  });

  res.status(httpStatus.OK).json({
    message: "Login successful",
    data: {
      accessToken: userData.accessToken,
    },
    success: true,
    status: status.OK,
  });
};

const SocialLogin = async (req: Request, res: Response) => {
  const { email, name, avatar, provider, accessToken } = req.body;
  if (provider == "google") {
    // Handle Google login
    const googleResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const data = (await googleResponse.json()) as {
      email?: string;
    };
    if (data.email == email) {
      // If login is successful, return the user data (excluding password)
      let userData = await User.findOne({
        email: email,
      });
      if (!userData) {
        userData = await User.create({
          name,
          email,
          avatar,
        });
      }
      const accessToken = jwtHelpers.generateToken(
        {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        },
        config.jwt.jwt_access_secret as string,
        config.jwt.jwt_access_expires_in as string
      );
      const refreshToken = jwtHelpers.generateToken(
        {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        },
        config.jwt.jwt_refresh_secret as string,
        config.jwt.jwt_refresh_expires_in as string
      );
      if (!userData) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Login failed",
          success: false,
          status: status.UNAUTHORIZED,
        });
      }
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 2592000000, // 30 days
      });
      res.status(httpStatus.OK).json({
        message: "Login successful",
        data: {
          accessToken: accessToken,
        },
        success: true,
        status: status.OK,
      });
    }
  }
};

const GetMe = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }

  const result = await UserService.getMe(user._id as string);

  if (!result) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }

  res.status(httpStatus.OK).json({
    data: result,
    success: true,
    status: httpStatus.OK,
    message: "User fetched successfully",
  });
};

const RefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Refresh token is required",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }

  try {
    const result = await UserService.refreshAccessToken(refreshToken);

    if (!result) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid refresh token",
        success: false,
        status: httpStatus.UNAUTHORIZED,
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Access token refreshed successfully",
      data: result,
      success: true,
      status: httpStatus.OK,
    });
  } catch {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid or expired refresh token",
      success: false,
      status: httpStatus.UNAUTHORIZED,
    });
  }
};

export const UserController = {
  CreateUser,
  LoginUser,
  SocialLogin,
  GetMe,
  RefreshToken,
};

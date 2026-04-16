import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import Workspace from "../workspace/workspace.model";
import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const hashedPassword = await bcrypt.hash(
    payload.password as string,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });

  return result.toObject();
};

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await User.findOne({ email: payload.email });

  if (!userData) {
    return null;
  }

  await User.updateOne({ _id: userData._id }, { lastLogin: new Date() });

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

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (id: string) => {
  const user = await User.findById(id).select("-password -__v");
  if (!user) return null;
  const workSpaceData = await Workspace.find({
    teamMembers: {
      $elemMatch: {
        _id: user._id,
      },
    },
  });

  return {
    ...user.toObject(),
    workspace: workSpaceData.map((workspace) => workspace._id),
  };
};

const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.jwt_refresh_secret as string
  );

  const user = await User.findById(decoded._id).select("_id name email");
  if (!user) {
    return null;
  }

  const accessToken = jwtHelpers.generateToken(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  getMe,
  refreshAccessToken,
};

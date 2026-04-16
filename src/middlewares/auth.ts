import { NextFunction, Request, Response } from "express";

import config from "../config";

import httpStatus from "http-status";
import { jwtHelpers } from "../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt.jwt_access_secret!
      );

      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

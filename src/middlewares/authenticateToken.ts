import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../constants";
import { JwtUserPayload, UserRequest } from "../interfaces";
import { NextFunction, Request, Response } from "express";

const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
  role: string
) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization?.split(" ")?.[1];
    if (token) {
      const payload: JwtUserPayload = jwt.verify(
        token,
        SECRET_ACCESS_TOKEN
      ) as JwtUserPayload;
      const user = await User.findOne({
        where: {
          id: payload?.id,
          email: payload?.email,
        },
      });
      if (user?.role === role) {
        req.user = user;
        return next();
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateAdminToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  return authenticate(req, res, next, "admin");
};

export const authenticateCustomerToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  return authenticate(req, res, next, "customer");
};

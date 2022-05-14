import User, { IUser } from "./models/user";
import { Request } from "express";
import jwt from "jsonwebtoken";

export interface UserRequest extends Request {
  user?: User | null;
}

export interface JwtUserPayload extends jwt.JwtPayload {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
}

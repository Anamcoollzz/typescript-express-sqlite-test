import { hashPassword } from "./../helpers/stringhelper";
import { SECRET_ACCESS_TOKEN } from "./../constants";
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const AdministratorController = {
  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      data.role = "admin";
      data.password = await hashPassword(data.password);
      const user = await User.create(data);
      res.json({ message: "success", data: user });
    } catch (error: any) {
      res.json({ message: error?.message });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        where: {
          role: "admin",
        },
        order: [["id", "desc"]],
      });
      res.json({ message: "success", data: users });
    } catch (error) {
      res.json({ message: error });
    }
  },

  async helloWorld(req: Request, res: Response) {
    try {
      const data: string = "Hello World :)";
      res.json({ message: "success", data });
    } catch (error) {
      res.json({ message: error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      const payload: object = { email, name: user?.name, id: user?.id };
      const accessToken: string = jwt.sign(payload, SECRET_ACCESS_TOKEN);
      res.json({ message: "success", data: user, accessToken });
    } catch (error: any) {
      res.json({ message: error?.message });
    }
  },
};

export default AdministratorController;

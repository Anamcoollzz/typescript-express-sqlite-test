import { compareHash } from "../helpers/stringhelper";
import express, { NextFunction, Request, Response, Router } from "express";
import { body, Meta, validationResult } from "express-validator";
import AdministratorController from "../controllers/AdministratorController";
import User from "../models/user";
import { authenticateAdminToken } from "../middlewares/authenticateToken";
import executeRules from "../middlewares/executeRules";

const adminRouter: Router = express.Router();

adminRouter.get("/admins", authenticateAdminToken, AdministratorController.get);
adminRouter.get("/admins/hello-world", authenticateAdminToken, AdministratorController.helloWorld);
adminRouter.post(
  "/admins/register",
  body("name").not().isEmpty(),
  body("email")
    .isEmail()
    .custom(async (value: string) => {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });
      if (user !== null) return Promise.reject("Email already exists");
    }),
  body("password").isLength({ min: 5 }),
  executeRules,
  AdministratorController.register
);

adminRouter.post(
  "/admins/login",
  body("email")
    .isEmail()
    .custom(async (value: string, meta: Meta) => {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });
      if (user === null) return Promise.reject("Email doesn't exists");
      const checkPass = await compareHash(meta.req.body.password, user.password);
      if (checkPass === false || user.role !== "admin") {
        return Promise.reject("Email or password is incorrect");
      }
      meta.req.user = user;
    }),
  body("password").isLength({ min: 5 }),
  executeRules,
  AdministratorController.login
);

export default adminRouter;

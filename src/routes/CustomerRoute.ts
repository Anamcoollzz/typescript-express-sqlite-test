import { compareHash } from "./../helpers/stringhelper";
import express, { NextFunction, Request, Response, Router } from "express";
import { body, Meta, validationResult } from "express-validator";
import CustomerController from "../controllers/CustomerController";
import User from "../models/user";
import { authenticateCustomerToken } from "../middlewares/authenticateToken";
import executeRules from "../middlewares/executeRules";

const customerRouter: Router = express.Router();

customerRouter.get("/customers", authenticateCustomerToken, CustomerController.get);
customerRouter.get("/customers/hello-world", authenticateCustomerToken, CustomerController.helloWorld);
customerRouter.post(
  "/customers/register",
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
  CustomerController.register
);

customerRouter.post(
  "/customers/login",
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
      if (checkPass === false || user.role !== "customer") {
        return Promise.reject("Email or password is incorrect");
      }
      meta.req.user = user;
    }),
  body("password").isLength({ min: 5 }),
  executeRules,
  CustomerController.login
);

export default customerRouter;

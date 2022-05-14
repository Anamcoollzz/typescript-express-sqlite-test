"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringhelper_1 = require("./../helpers/stringhelper");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const CustomerController_1 = __importDefault(require("../controllers/CustomerController"));
const user_1 = __importDefault(require("../models/user"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const executeRules_1 = __importDefault(require("../middlewares/executeRules"));
const customerRouter = express_1.default.Router();
customerRouter.get("/customers", authenticateToken_1.authenticateCustomerToken, CustomerController_1.default.get);
customerRouter.get("/customers/hello-world", authenticateToken_1.authenticateCustomerToken, CustomerController_1.default.helloWorld);
customerRouter.post("/customers/register", (0, express_validator_1.body)("name").not().isEmpty(), (0, express_validator_1.body)("email")
    .isEmail()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: {
            email: value,
        },
    });
    if (user !== null)
        return Promise.reject("Email already exists");
})), (0, express_validator_1.body)("password").isLength({ min: 5 }), executeRules_1.default, CustomerController_1.default.register);
customerRouter.post("/customers/login", (0, express_validator_1.body)("email")
    .isEmail()
    .custom((value, meta) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: {
            email: value,
        },
    });
    if (user === null)
        return Promise.reject("Email doesn't exists");
    const checkPass = yield (0, stringhelper_1.compareHash)(meta.req.body.password, user.password);
    if (checkPass === false || user.role !== "customer") {
        return Promise.reject("Email or password is incorrect");
    }
    meta.req.user = user;
})), (0, express_validator_1.body)("password").isLength({ min: 5 }), executeRules_1.default, CustomerController_1.default.login);
exports.default = customerRouter;

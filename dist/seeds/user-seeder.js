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
const user_1 = __importDefault(require("../models/user"));
const userSeeder = () => {
    // const options = { force: true };
    const options = {};
    user_1.default.sync(options).then(() => __awaiter(void 0, void 0, void 0, function* () {
        user_1.default.findOne({ where: { email: "hairulanamadmin@gmail.com" } }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                yield user_1.default.create({
                    email: "hairulanamadmin@gmail.com",
                    name: "Hairul Anam Admin",
                    password: yield (0, stringhelper_1.hashPassword)("123456"),
                    role: "admin",
                    //   id: 1,
                });
            }
        }));
        user_1.default.findOne({ where: { email: "hairulanamcustomer@gmail.com" } }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                yield user_1.default.create({
                    email: "hairulanamcustomer@gmail.com",
                    name: "Hairul Anam Customer",
                    password: yield (0, stringhelper_1.hashPassword)("123456"),
                    role: "customer",
                    //   id: 1,
                });
            }
        }));
    }));
};
exports.default = userSeeder;

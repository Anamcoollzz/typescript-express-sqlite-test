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
const constants_1 = require("./../constants");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdministratorController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.role = "admin";
                data.password = yield (0, stringhelper_1.hashPassword)(data.password);
                const user = yield user_1.default.create(data);
                res.json({ message: "success", data: user });
            }
            catch (error) {
                res.json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    },
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.findAll({
                    where: {
                        role: "admin",
                    },
                    order: [["id", "desc"]],
                });
                res.json({ message: "success", data: users });
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    },
    helloWorld(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = "Hello World :)";
                res.json({ message: "success", data });
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield user_1.default.findOne({ where: { email } });
                const payload = { email, name: user === null || user === void 0 ? void 0 : user.name, id: user === null || user === void 0 ? void 0 : user.id };
                const accessToken = jsonwebtoken_1.default.sign(payload, constants_1.SECRET_ACCESS_TOKEN);
                res.json({ message: "success", data: user, accessToken });
            }
            catch (error) {
                res.json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    },
};
exports.default = AdministratorController;

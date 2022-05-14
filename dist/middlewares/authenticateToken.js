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
exports.authenticateCustomerToken = exports.authenticateAdminToken = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const authenticate = (req, res, next, role) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authorization = req.header("Authorization");
        const token = (_a = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")) === null || _a === void 0 ? void 0 : _a[1];
        if (token) {
            const payload = jsonwebtoken_1.default.verify(token, constants_1.SECRET_ACCESS_TOKEN);
            const user = yield user_1.default.findOne({
                where: {
                    id: payload === null || payload === void 0 ? void 0 : payload.id,
                    email: payload === null || payload === void 0 ? void 0 : payload.email,
                },
            });
            if ((user === null || user === void 0 ? void 0 : user.role) === role) {
                req.user = user;
                return next();
            }
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});
const authenticateAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return authenticate(req, res, next, "admin");
});
exports.authenticateAdminToken = authenticateAdminToken;
const authenticateCustomerToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return authenticate(req, res, next, "customer");
});
exports.authenticateCustomerToken = authenticateCustomerToken;

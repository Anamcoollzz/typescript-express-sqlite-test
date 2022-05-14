"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_REFRESH_TOKEN = exports.SECRET_ACCESS_TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
exports.SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

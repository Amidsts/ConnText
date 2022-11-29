"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.CLOUD_KEY = exports.CLOUD_SECRET = exports.CLOUD_NAME = exports.JWTSECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let { env } = process;
exports.PORT = env.port || 4000;
exports.JWTSECRET = env.jwt_secret || "";
exports.CLOUD_NAME = env.cloud_name || "";
exports.CLOUD_SECRET = env.cloud_secret || "";
exports.CLOUD_KEY = env.cloud_key || "";
exports.MONGO_URI = env.mongo_uri || "";

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = exports.validator = exports.responsehandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
const error_1 = require("./error");
const responsehandler = (payload, message = "success") => {
    return {
        success: true,
        message,
        data: payload || {}
    };
};
exports.responsehandler = responsehandler;
function validator(schema, inputData) {
    const { error, value } = schema.validate(inputData);
    if (error)
        throw new error_1.clientError(`${value} ${error.message}`, 400);
    return value;
}
exports.validator = validator;
function hashPassword(plainPassword) {
    return bcrypt_1.default.hashSync(plainPassword, bcrypt_1.default.genSaltSync(10));
}
exports.hashPassword = hashPassword;
function comparePassword(hashedPassword, plainPassword) {
    return bcrypt_1.default.compareSync(plainPassword, hashedPassword);
}
exports.comparePassword = comparePassword;
function generateToken(payload) {
    let options = { expiresIn: 60 * 60 };
    return (0, jsonwebtoken_1.sign)(payload, env_1.JWTSECRET, options);
}
exports.generateToken = generateToken;
function verifyToken(authToken) {
    const token = authToken.split(" ")[1];
    return (0, jsonwebtoken_1.verify)(token, env_1.JWTSECRET);
}
exports.verifyToken = verifyToken;
function cloudinary(_req, _res, next) {
    cloudinary_1.v2.config({
        cloud_name: env_1.CLOUD_NAME,
        api_key: env_1.CLOUD_KEY,
        api_secret: env_1.CLOUD_SECRET
    });
    // console.log("connected to cloudinary")
    return next();
}
exports.cloudinary = cloudinary;

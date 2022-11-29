"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../utils/helpers");
//.pattern(/^[A-Za-z0-9]{5, 10}$/)
const createUserValidator = (payload) => {
    return (0, helpers_1.validator)(joi_1.default.object({
        username: joi_1.default.string().trim().required(),
        email: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required(),
        phoneNo: joi_1.default.string().trim().required(),
        address: joi_1.default.object({
            country: joi_1.default.string().trim().required(),
            state: joi_1.default.string().trim().required(),
            localGovt: joi_1.default.string().trim().required(),
            postalcode: joi_1.default.string().length(6).required()
        })
        // followers: Joi.array().items(Joi.string()),
        // followings: Joi.array().items(Joi.string())
    }), payload);
};
exports.createUserValidator = createUserValidator;
const loginUserValidator = (payload) => {
    return (0, helpers_1.validator)(joi_1.default.object({
        email: joi_1.default.string().trim().required(),
        password: joi_1.default.string().required() //alphanumeric password, min 5 & max 10
    }), payload);
};
exports.loginUserValidator = loginUserValidator;

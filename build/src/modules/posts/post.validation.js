"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../../utils/helpers");
const createPostValidate = (payload) => {
    return (0, helpers_1.validator)(joi_1.default.object({
        description: joi_1.default.string().trim().required()
    }), payload);
};
exports.createPostValidate = createPostValidate;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const usersRepository_1 = require("../modules/users/usersRepository");
const error_1 = require("../utils/error");
const helpers_1 = require("../utils/helpers");
function validateUser(Roles) {
    return (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization)
            throw new error_1.clientError("authorization token is required", 400);
        try {
            let confirmToken;
            confirmToken = (0, helpers_1.verifyToken)(authorization);
            const { id } = confirmToken;
            const user = yield (0, usersRepository_1.findUser)({ _id: id });
            if (!user)
                throw new error_1.clientError("user account not found", 404);
            if (!(Roles.includes(user.role)))
                throw new error_1.clientError("you are not authourized", 401);
            req.user = user;
            if (req.user.status === "suspended" || req.user.status === "inactive")
                throw new error_1.clientError("account is in active or suspended", 403);
            return next();
        }
        catch (err) {
            return err;
        }
    });
}
exports.validateUser = validateUser;

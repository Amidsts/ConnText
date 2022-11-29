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
exports.followUserService = exports.loginUserService = exports.createUserService = void 0;
const mongoose_1 = require("mongoose");
const error_1 = require("../../utils/error");
const helpers_1 = require("../../utils/helpers");
const usersRepository_1 = require("./usersRepository");
const uservalidation_1 = require("./uservalidation");
const usermodel_1 = __importDefault(require("./usermodel"));
function createUserService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, phoneNo, address: { country, state, localGovt, postalcode } } = (0, uservalidation_1.createUserValidator)(payload);
            console.log(password);
            const newUser = yield (0, usersRepository_1.createUser)({
                username, email,
                password: (0, helpers_1.hashPassword)(password),
                phoneNo,
                address: {
                    country,
                    state,
                    localGovt,
                    postalcode
                }
            });
            newUser.password = "";
            return newUser;
        }
        catch (err) {
            return err;
        }
    });
}
exports.createUserService = createUserService;
function loginUserService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = (0, uservalidation_1.loginUserValidator)(payload);
            // let user = await findUser({email})
            let user = yield usermodel_1.default.findOne({ email });
            if (!user || !((0, helpers_1.comparePassword)(user.password, password))) {
                throw new error_1.clientError("invalid email or password", 400);
            }
            // const token = generateToken({id: User._id})
            user.status = "active";
            yield user.save();
            return {
                accessToken: (0, helpers_1.generateToken)({ id: user._id }),
                user
            };
        }
        catch (err) {
            return err;
        }
    });
}
exports.loginUserService = loginUserService;
//forgot password
//reset password
//change password
//resend password verification code
//upload profile pictures
//online offline status of user using socket.io
//follow or unfollow user
function followUserService(userId, followerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield (0, mongoose_1.startSession)();
        session.startTransaction();
        try {
            if (userId === followerId.toString())
                throw new error_1.clientError("you cannot follow yourself", 401);
            const user = yield usermodel_1.default.findById(userId);
            const follower = yield usermodel_1.default.findById(followerId);
            if (!user || user.status === "suspended" || user.status === "inactive")
                throw new error_1.clientError("user account not found or account has been suspended", 404);
            //update user's follower
            if (!(user.followers.includes(followerId))) {
                yield user.updateOne({
                    $push: {
                        followers: followerId
                    },
                    $inc: {
                        followersCount: 1
                    }
                }, { session });
                yield (follower === null || follower === void 0 ? void 0 : follower.updateOne({
                    $push: {
                        followings: userId
                    },
                    $inc: {
                        followingsCount: 1
                    }
                }, { session }));
                yield session.commitTransaction();
            }
            else {
                yield user.update({
                    $pull: {
                        followers: followerId
                    },
                    $inc: {
                        followersCount: -1
                    }
                }, { session });
                yield (follower === null || follower === void 0 ? void 0 : follower.update({
                    $pull: {
                        followings: userId
                    },
                    $inc: {
                        followingsCount: -1
                    }
                }, { session }));
            }
            return yield usermodel_1.default.findById(userId);
        }
        catch (err) {
            yield session.abortTransaction();
            return err;
        }
        finally {
            yield session.endSession();
        }
    });
}
exports.followUserService = followUserService;
//get followers
//get followings

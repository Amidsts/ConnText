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
exports.likePostService = exports.deletepostService = exports.getpostsService = exports.getpostService = exports.createPostService = void 0;
const post_repository_1 = require("./post.repository");
const post_validation_1 = require("../posts/post.validation");
const error_1 = require("../../utils/error");
const usersRepository_1 = require("../users/usersRepository");
const post_model_1 = __importDefault(require("./post.model"));
//create post
function createPostService(userId, payload, images) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { description } = (0, post_validation_1.createPostValidate)(payload);
            return yield (0, post_repository_1.createPost)(userId, description, images);
        }
        catch (err) {
            return err;
        }
    });
}
exports.createPostService = createPostService;
function getpostService(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, post_repository_1.getPost)(postId);
            if (!post)
                throw new error_1.clientError("post not found", 404);
            return post;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getpostService = getpostService;
function getpostsService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield (0, post_repository_1.getPosts)();
            if (!posts)
                throw new error_1.clientError("no post found", 404);
            return posts;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getpostsService = getpostsService;
function deletepostService(postid, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, post_repository_1.getPost)(postid);
            if (!post)
                throw new error_1.clientError("post not found", 404);
            const user = yield (0, usersRepository_1.findUser)({ _id: post.userId });
            if (userId !== (post.userId).toString())
                throw new error_1.serverError("user account not found", 404);
            post.delete();
            return "post has been deleted successfully";
        }
        catch (err) {
            return err;
        }
    });
}
exports.deletepostService = deletepostService;
// export async function updatepost(postid: string, payload: {[key: string]: any}) {
//     try {
//         const post = await updatePost(postid)
//         if (!post) throw new clientError("post not found", 404)
//     } catch (err) {
//         return err
//     }
// }
//like or unlike a post
function likePostService(postId, userid) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, post_repository_1.getPost)(postId);
            if (!post)
                throw new error_1.clientError("post not found", 404);
            //check if the person has liked the post
            if ((_a = post.likedBy) === null || _a === void 0 ? void 0 : _a.includes(userid)) {
                yield post.update({
                    $inc: {
                        likesCount: -1
                    },
                    $pull: {
                        likedBy: userid
                    }
                });
            }
            else {
                yield post.update({
                    $inc: {
                        likesCount: 1
                    },
                    $push: {
                        likedBy: userid
                    }
                });
            }
            return yield post_model_1.default.findById(post._id);
        }
        catch (err) {
            return err;
        }
    });
}
exports.likePostService = likePostService;
//comment on a post or create comment
//delete comment
//update comment

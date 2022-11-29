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
exports.updatePost = exports.getPosts = exports.getPost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("./post.model"));
function createPost(userid, payload, image) {
    return __awaiter(this, void 0, void 0, function* () {
        return new post_model_1.default({
            userId: userid,
            description: payload,
            postImages: [image]
        }).save();
    });
}
exports.createPost = createPost;
function getPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield post_model_1.default.findById(postId);
    });
}
exports.getPost = getPost;
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield post_model_1.default.find();
    });
}
exports.getPosts = getPosts;
// export async function deletePost (postid: string, userid: string) {
//     return await Post.findOne({ _id: postid, userId: userid })
// }
function updatePost(postid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield post_model_1.default.findOne({ _id: postid });
    });
}
exports.updatePost = updatePost;

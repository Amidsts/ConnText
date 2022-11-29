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
exports.likePostController = exports.deletePostController = exports.getpostsController = exports.getPostController = exports.createPostController = void 0;
const post_service_1 = require("./post.service");
const helpers_1 = require("../../utils/helpers");
function createPostController(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, post_service_1.createPostService)((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, req.body, res.locals.img);
            res.json((0, helpers_1.responsehandler)(response));
        }
        catch (err) {
            return err;
        }
    });
}
exports.createPostController = createPostController;
function getPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, post_service_1.getpostService)(req.params.postId);
            res.status(200).json((0, helpers_1.responsehandler)(response));
        }
        catch (err) {
            return err;
        }
    });
}
exports.getPostController = getPostController;
function getpostsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, post_service_1.getpostsService)();
            res.status(200).json((0, helpers_1.responsehandler)(response));
        }
        catch (err) {
            return err;
        }
    });
}
exports.getpostsController = getpostsController;
function deletePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, post_service_1.deletepostService)(req.params.postId, req.body.userId);
            res.status(200).json((0, helpers_1.responsehandler)(response));
        }
        catch (err) {
            return err;
        }
    });
}
exports.deletePostController = deletePostController;
function likePostController(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const response = yield (0, post_service_1.likePostService)(req.params.postId, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            res.status(200).json((0, helpers_1.responsehandler)(response));
        }
        catch (err) {
            return err;
        }
    });
}
exports.likePostController = likePostController;

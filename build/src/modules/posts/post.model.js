"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    postImages: [{
            imgUrl: String,
            imgId: String
        }],
    description: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comments: [{
            user: {
                userId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "users"
                },
                comment: String
            },
            replies: [{
                    user: {
                        userId: {
                            type: mongoose_1.Schema.Types.ObjectId,
                            ref: "users"
                        },
                        comment: String
                    }
                }],
            repliesCount: {
                type: Number,
                default: 0
            }
        }]
}, { timestamps: true });
const Post = (0, mongoose_1.model)("post", postSchema);
exports.default = Post;

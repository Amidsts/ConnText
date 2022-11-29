"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "inactive"
    },
    profilePicture: {
        imageUrl: String,
        imageId: String
    },
    address: {
        country: String,
        state: String,
        localGovt: String,
        postalcode: String
    },
    followers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "users"
        }],
    followersCount: {
        type: Number,
        default: 0
    },
    followings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "users"
        }],
    followingsCount: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;

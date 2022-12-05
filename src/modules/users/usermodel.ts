import { string } from "joi"
import { Schema, model, Types, Document } from "mongoose"

export interface IUser extends Document {
    role: "admin" | "user",
    username: string,
    password: string,
    email: string,
    phoneNo: string,
    status: "active" | "inactive" | "suspended",
    address?: {
        country: string,
        state: string,
        loacalGovt: string,
        postalcode: string 
    },
    followers?: ({
        type: Types.ObjectId,
        ref: string
    } | string)[],
    following?: ({
        type: Types.ObjectId,
        ref: string
    } | string)[],
    profilePicture?: string ,
    isOnline: boolean,
    verificationCode: string
}

const userSchema = new Schema({
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
        imgUrl: String,
        imgId: String
    },
    address: {
        country: String,
        state: String,
        localGovt: String,
        postalcode: String 
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    followersCount: {
        type: Number,
        default: 0
    },
    followings: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    followingsCount: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: true
    }
}, {timestamps: true} )

const User = model<IUser>("user", userSchema)

export default User
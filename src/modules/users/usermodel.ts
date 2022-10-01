import { string } from "joi"
import { Schema, model, Types, Document } from "mongoose"

export interface IUser extends Document {
    isAdmin: boolean,
    username: string,
    password: string,
    email: string,
    phoneNo: string,
    status: "active" | "inactive" | "suspended",
    address: {
        country: string,
        state: string,
        loaclGovt: string,
        postalcode: string 
    },
    followers: {
        type: Types.ObjectId,
        ref: string
    }[],
    following: {
        type: Types.ObjectId,
        ref: string
    }[],
    profilePicture: string ,
    isOnline: boolean
}

const userSchema = new Schema({
    isAdmin: {
        type: Boolean,
        default: false
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
        loaclGovt: String,
        postalcode: String 
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    isOnline: {
        type: Boolean,
        default: false
    }
}, {timestamps: true} )

const User = model<IUser>("user", userSchema)

export default User
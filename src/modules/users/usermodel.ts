import { string } from "joi"
import { Schema, model, Types } from "mongoose"

interface IUser {
    isAdmin: boolean,
    username: string,
    password: string,
    email: string,
    phoneNo: string,
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
    profilePicture: string 
}

const userSchema = new Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    username: {
        type: string,
        required: true,
        unique: true
    },
    email: {
        type: string,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true
    },
    phoneNo: {
        type: string,
        required: true
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
}, {timestamps: true} )

const User = model<IUser>("user", userSchema)

export default User
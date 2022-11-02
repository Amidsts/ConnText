
import { Document, model, Types, Schema } from "mongoose";

interface IPost extends Document{
    userId: {
        type: Types.ObjectId,
        ref: string
    },
    postImages?: {
        imgUrl: string,
        imgId: string
    }[],
    description: string,
    likes?: {
        likesCount: number,
        likedBy: {
            userId: {
                type: Types.ObjectId,
                ref: string
            }
        }[]
    },
    comments?: {
        userId:  {
            type: Types.ObjectId,
            ref: string
        },
        comment: string
    }[]
}

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
    
    likesCount:{
        type: Number,
        default: 0
    },
    likedBy: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],  
    comments: [{
        user: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            comment: String
        },
        replies: [{
            user: {
                userId: {
                    type: Schema.Types.ObjectId,
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
}, {timestamps: true})

const Post = model<IPost>("post", postSchema)

export default Post
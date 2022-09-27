import { required } from "joi";
import { Document, model, Types, Schema } from "mongoose";

interface IPost extends Document {
    userId: Types.ObjectId,
    postImages?: {
        imgUrl: string,
        imgId: string
    }[],
    description: string,
    likes?: {
        likesCount: number,
        likedBy: {
            userId: string
        }[]
    },
    comments?: {
        userId: Types.ObjectId,
        comment: string
    }[]
}

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    postImages: [{
        imgUrl: String,
        imgId: String
    }],
    description: {
        type: String,
        required: true
    },
    likes: {
        likesCount:{
            type: Number,
            required: true
        },
        likedBy: [
            {
                userId: Schema.Types.ObjectId,
                ref: "users",
                required: true
            }
        ]
    },
    comments: [{
        userId: Schema.Types.ObjectId,
        Comment: String,
        required: true
    }]
})

const Post = model<IPost>("post", postSchema)

export default Post
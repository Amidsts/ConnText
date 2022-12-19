import {Schema, Document, Types, model} from "mongoose"

export interface IMessage extends Document{
    senderId: {
        type: Types.ObjectId
        ref: string
    },
    users: {
        receiverId: {
            type: Types.ObjectId,
            ref: string
        },
        senderId: {
            type: Types.ObjectId,
            ref: string
        }
    }[],
    text: string
}

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    users: [{
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    }],
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Message = model("message", messageSchema)

export default Message
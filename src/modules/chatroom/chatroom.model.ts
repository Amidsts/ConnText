import { required } from "joi"
import {Schema, model, Types, Document} from "mongoose"

export interface IChatroom extends Document {
    _id?: Types.ObjectId,
    chatRoomAdminId: {
        type: Types.ObjectId,
        ref: string
    },
    chatRoomName: string,
    roomMembersIds: {
        type: Types.ObjectId,
        ref: string
    }[]
}

const chatRoomSchema = new Schema({
    chatRoomAdminId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    chatRoomName: {
        type: String,
        required: true
    },
    roomMembersIds: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }]
}, {
    timestamps: true
})

const ChatRoom = model("chatroom", chatRoomSchema)

export default ChatRoom
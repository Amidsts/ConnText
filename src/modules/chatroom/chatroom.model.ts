import { required } from "joi"
import {Schema, model, Types, Document} from "mongoose"

export interface IChatroom extends Document {
    _id?: Types.ObjectId,
    chatRoomAdminId: {
        type: Types.ObjectId,
        ref: string
    },
    chatRoomName?: string,
    roomMembersIds: {
        type: Types.ObjectId,
        ref: string
    }[],
    roomType: "biDirectional" | "group",
    message: string,
    roomDiscription?: string
}

const chatRoomSchema = new Schema({
    chatInitiatorId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    chatRoomName: String,
    roomMembersIds: [{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }],
    roomType: {
        type: String,
        enum: [ "biDirectional", "group" ]
    },
    message: {
        type: String,
        required: true
    },
    roomDiscription: {
        type: String
    }
}, {
    timestamps: true
})

const ChatRoom = model("chatroom", chatRoomSchema)

export default ChatRoom
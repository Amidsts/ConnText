import Message from "./chat.model";
import { createMessageValidator } from "./chat.validation";

export async function createMessageService (payload: {[key: string]: any}) {
    const {senderId,receiverId, text} = createMessageValidator(payload)

    try {
        const message = await new Message({
            senderId, 
            users: {
                receiverId,
                senderId
            }, 
            text
        }).save()

        return message

    } catch (err) {
        return err
    }
}
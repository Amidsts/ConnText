import joi, { string } from "joi"
import { validator } from "../../utils/helpers"

export const createMessageValidator = (payload: {[key: string]: any}) => {
    return validator( joi.object({
        senderId:  joi.string().trim().required(),
        receiverId:joi.string().trim().required(),
        text: joi.string().required()
    }), payload)
}
import Joi from "joi";

import {validator} from "../../utils/helpers"

export const createPostValidate = (payload: {[key: string]: any}) => {
    return validator(Joi.object({
        description: Joi.string().trim(). required()
    }), payload)
}
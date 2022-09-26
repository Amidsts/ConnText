import Joi from "joi";

import {validator} from "../../utils/helpers"

export const createUserValidator = (payload: {[key: string]: any}) => {
    return validator( Joi.object({
        username: Joi.string().trim().required(),
        email: Joi.string().trim().required(),
        password: Joi.string().pattern(/^[A-Za-z0-9]{5, 10}$/).required(),
        phoneNo: Joi.string().trim().required(),
        address: Joi.object({
            country: Joi.string().trim().required(),
            state: Joi.string().trim().required(),
            localGovt: Joi.string().trim().required(),
            postalCode: Joi.string().length(6).required()
        })
        // followers: Joi.array().items(Joi.string()),
        // followings: Joi.array().items(Joi.string())
    })
    , payload )
}
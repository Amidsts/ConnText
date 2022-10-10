import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { findUser} from "../modules/users/usersRepository";
import { clientError } from "../utils/error";
import { verifyToken } from "../utils/helpers";
import { IRequest } from "../helpers/custom.types";

export async function validateUser (req: IRequest, _res:Response, next: NextFunction) {

    const {authorization} = req.headers

    if (!authorization) throw new clientError("authorization token is required", 400)

    try {
        let confirmToken
        confirmToken =verifyToken(authorization)

        // console.log("token expire at", confirmToken.exp)
        // if (Date.now() > confirmToken?.exp) {
        //     throw new clientError("token has expired", 401)
        // }

        const {id} = confirmToken
        const user = await findUser({_id: id})
        
        if(!user) throw new clientError("user account not found" ,404)
 
        req.user = user

        if ( req.user.status === "suspended" || req.user.status === "inactive" ) throw new clientError( "account is in active or suspended" ,403)

        return next()
    } catch (err) {
        return err
    }

    // next()
}
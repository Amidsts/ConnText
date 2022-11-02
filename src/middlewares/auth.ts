import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { findUser} from "../modules/users/usersRepository";
import { clientError } from "../utils/error";
import { verifyToken } from "../utils/helpers";
import { IRequest } from "../helpers/custom.types";

export function validateUser (Roles: Array<string>) {
    return async (req: IRequest, _res:Response, next: NextFunction) => {

        const {authorization} = req.headers
    
        if (!authorization) throw new clientError("authorization token is required", 400)
    
        try {
            let confirmToken
            confirmToken =verifyToken(authorization)
    
            const {id} = confirmToken
            const user = await findUser({_id: id})
            
            if(!user) throw new clientError("user account not found" ,404)
    
            if ( !(Roles.includes(user.role)) ) throw new clientError("you are not authourized", 401)
            
            req.user = user
    
            if ( req.user.status === "suspended" || req.user.status === "inactive" ) throw new clientError( "account is in active or suspended" ,403)
    
            return next()
        } catch (err) {
            return err
        }
    }
}
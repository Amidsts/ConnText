import { Request, Response, NextFunction } from "express";
import { findUser} from "../modules/users/usersRepository";
import { clientError } from "../utils/error";
import { verifyToken } from "../utils/helpers";

export async function validateUser (req: Request, res:Response, next: NextFunction) {

    const {authorization} = req.headers

    if (!authorization) throw new clientError("authorization token is required", 400)

    try {
        const {id} = verifyToken(authorization)

        const user = findUser({_id: id})

        if(!user) throw new clientError("user account not found" ,404)

        req.user = user

        if ( req.user.status === "suspended" || req.user.status === "inactive" ) throw new clientError( "account is in active or suspended" ,403)

    } catch (err) {
        return err
    }

    next()
}
import {IUser} from "../modules/users"
// import {Request} from "express"

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}

export{}
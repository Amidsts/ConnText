import {IUser} from "../modules/users"

declare global {
    namespace Express {
        export interface Request {
            user: IUser
        }
    }
}

export{}
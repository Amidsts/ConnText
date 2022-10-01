import { Request } from "express";

import { IUser } from "../modules/users/usermodel";

export interface IRequest extends Request {
    user?: IUser
}
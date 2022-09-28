import { Router, Request, Response } from "express";

import { responsehandler } from "../../utils/helpers";
import { createPostService, createUserService, loginUserService } from "./userService";

const router = Router()

export async function createUserController(req: Request, res:Response) {
    try{
        const response =await createUserService(req.body)

        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function loginUserController(req: Request, res:Response) {
    try{
        const response =await loginUserService(req.body)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

//post
export async function createPostController(req: Request, res:Response) {
    try{
        const response =await createPostService(req.user._id, req.body, )
    } catch (err) {
        return err
    }
}

export default router
import { Request, response, Response } from "express"

import { responsehandler } from "../../utils/helpers"
import { createMessageService } from "./chat.service"

export async function createMessageController(req: Request, res: Response) {
    try{

        const response = createMessageService(req.body)

        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}
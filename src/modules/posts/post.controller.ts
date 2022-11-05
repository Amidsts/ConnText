import { Response, Request } from "express"

import { IRequest } from "../../helpers/custom.types"
import { 
    createPostService,
    getpostService,
    getpostsService,
    deletepostService, 
    likePostService
} from "./post.service"
import { responsehandler } from "../../utils/helpers"


export async function createPostController(req: IRequest, res:Response) {
    try{
        const response =await createPostService(req.user?._id, req.body, res.locals.img)

        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function getPostController (req: Request, res: Response) {
    try {
        
        const response = await getpostService (req.params.postId)

        res.status(200).json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function getpostsController (req: Request, res: Response) {
    try {
        const response = await getpostsService()

        res.status(200).json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function deletePostController (req: Request, res: Response) {
    try {
        const response = await deletepostService(req.params.postId, req.body.userId)

        res.status(200).json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function likePostController (req: IRequest, res: Response) {
    try {
        console.log(req.user?._id)
        const response = await likePostService(req.params.postId, req.user?._id)

        res.status(200).json(responsehandler(response))

    } catch (err) {
        return err
    }
}
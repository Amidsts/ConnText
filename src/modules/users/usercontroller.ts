import { Request, Response } from "express";

import { responsehandler } from "../../utils/helpers";
import { 
    createUserService, 
    followUserService, 
    loginUserService,
    forgotPasswordService, 
    resetPasswordService,
    changePasswordServices,
    uploadProfileImgServices,
    VerificationCodeService
} from "./userService";
import { upload } from "../../middlewares/custom";
import { IRequest } from "../../helpers/custom.types";


export async function createUserController(req: Request, res:Response) {
    try{
        const response =await createUserService(req.body)

        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function verificationCodeController(req: Request, res:Response) {
    try{
        const response =await VerificationCodeService(req.params.userId, req.body)
        
        // res.redirect()
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

export async function forgotPasswordController(req: Request, res:Response) {
    try{
        const response =await forgotPasswordService(req.body, req)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function resetPasswordController(req: Request, res:Response) {
    try{
        const response =await resetPasswordService(req.params.userId, req.body)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function changePasswordController(req: IRequest, res:Response) {
    try{
        const response =await changePasswordServices(req.user?._id, req.body)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function uploadProfileImgController(req: IRequest, res:Response) {
    try{
        const response =await uploadProfileImgServices(req.user?._id, res.locals.img)
        
        res.json(responsehandler(response))
    } catch (err) {
        return err
    }
}

export async function followUserController (req: IRequest, res: Response) {
    try{
        const response = await followUserService(req.params.userId, req.user?._id)

        res.status(200).json(responsehandler(response))
    } catch (err) {
        return err
    }
}
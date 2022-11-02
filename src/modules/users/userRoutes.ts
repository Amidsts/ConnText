import { Router } from "express"
import path from "path"

import { cloudinaryUpload } from "../../middlewares/custom"

import {
    createUserController,
    loginUserController
} from "./usercontroller"
import { upload } from "../../middlewares/custom"
import { validateUser } from "../../middlewares/auth"

const router = Router()

router.post("/create-user", createUserController)
router.post("/login-user", loginUserController)

//test


 
export default router

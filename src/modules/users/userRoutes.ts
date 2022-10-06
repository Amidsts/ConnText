import { Router } from "express"
import path from "path"

import { cloudinaryUpload } from "../../middlewares/custom"

import {
    createUserController,
    loginUserController,
    createPostController
} from "./usercontroller"
import { upload } from "../../middlewares/custom"
import { validateUser } from "../../middlewares/auth"

const router = Router()

router.post("/create-user", createUserController)
router.post("/login-user", loginUserController)

//test

router.post("/create-post", validateUser, upload.single("image"), cloudinaryUpload, createPostController) 
 
export default router

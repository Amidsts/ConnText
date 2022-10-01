import { Router } from "express"

import { cloudinaryUpload } from "../../middlewares/custom"

import {
    createUserController,
    loginUserController
} from "./usercontroller"
import { upload } from "../../middlewares/custom"


const router = Router()

router.post("/create-user", createUserController)
router.post("/login-user", loginUserController)

// router.post("/create-post", upload.array("image", 5), cloudinaryUpload, createPostController)
 
export default router

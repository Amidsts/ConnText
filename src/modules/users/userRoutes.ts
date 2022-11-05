import { Router } from "express"
import path from "path"

import { cloudinaryUpload } from "../../middlewares/custom"

import {
    createUserController,
    followUserController,
    loginUserController
} from "./usercontroller"
import { upload } from "../../middlewares/custom"
import { validateUser } from "../../middlewares/auth"

const router = Router()

router.post("/create-user", createUserController)
router.post("/login-user", loginUserController)

router.put("/follow-unfollow-user/:userId", validateUser(["user"]), followUserController)

//test


 
export default router

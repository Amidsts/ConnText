import { Router } from "express"
import path from "path"

import { cloudinaryUpload, upload } from "../../middlewares/custom"

import {
    changePasswordController,
    createUserController,
    followUserController,
    forgotPasswordController,
    loginUserController,
    resetPasswordController,
    uploadProfileImgController,
    verificationCodeController
} from "./usercontroller"

import { validateUser } from "../../middlewares/auth"

const router = Router()

router.post("/create-user", createUserController)
router.post("/verification-code/:userId", verificationCodeController)
router.post("/login-user", loginUserController)

router.post("/forgot-password", forgotPasswordController)
router.put("/reset-password/:userId", resetPasswordController)
router.put("/change-password", validateUser(["user", "admin"]), changePasswordController)

router.put("/upload-profile-picture", validateUser(["user", "admin"]), upload.single("img"), cloudinaryUpload, uploadProfileImgController)

router.put("/follow-unfollow-user/:userId",  validateUser(["user"]), followUserController)

//test


 
export default router

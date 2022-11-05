import {Router } from "express"

import { cloudinaryUpload } from "../../middlewares/custom";
import { validateUser } from "../../middlewares/auth";
import {upload} from "../../middlewares/custom"
import { 
    createPostController,
    getPostController,
    getpostsController,
    deletePostController, 
    likePostController
} from "./post.controller";

const router = Router()

router.post("/create-post", validateUser(["user"]), upload.single("image"), cloudinaryUpload, createPostController) 

router.get("/get-post/:postId", validateUser(["user"]), getPostController)
router.get("/get-posts", validateUser(["user"]), getpostsController)
router.delete("/delete-post/:postId", validateUser(["user"]), deletePostController)

router.put("/like-post/:postId", validateUser(["user"]), likePostController )


export default router
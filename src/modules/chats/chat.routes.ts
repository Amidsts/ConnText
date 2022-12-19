import { Router } from "express";
import { createMessageController } from "./chat.controller";

const router = Router()

router.post("/create-message", createMessageController)

export default router
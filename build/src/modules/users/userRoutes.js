"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("./usercontroller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/create-user", usercontroller_1.createUserController);
router.post("/login-user", usercontroller_1.loginUserController);
router.put("/follow-unfollow-user/:userId", (0, auth_1.validateUser)(["user"]), usercontroller_1.followUserController);
//test
exports.default = router;

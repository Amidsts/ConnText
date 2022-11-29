"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { logger } from "./logger";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../utils/helpers");
const userRoutes_1 = __importDefault(require("../modules/users/userRoutes"));
const post_routes_1 = __importDefault(require("../modules/posts/post.routes"));
const env_1 = require("../utils/env");
const logger_1 = require("./logger");
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
exports.default = (app) => {
    (0, mongoose_1.connect)(env_1.MONGO_URI, options).then((e) => {
        logger_1.logger.info("connected to the database successfully");
    }).catch((err) => {
        logger_1.logger.info(err);
    });
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", 'public')));
    app.use(express_1.default.json())
        .use(express_1.default.urlencoded({ extended: true }))
        .use((0, cors_1.default)())
        .use((0, morgan_1.default)("tiny"))
        .use((0, helmet_1.default)())
        .use("*", helpers_1.cloudinary);
    let http = require("http").Server(app);
    let io = require("socket.io")(http);
    let user = ["Ameedat", "Balqees"];
    app.get("/try", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "..", 'public/index.html'));
        io.on("connection", function (socket) {
            console.log("user connected!");
            socket.on("setUsername", function (data) {
            });
        });
    });
    app.get("/", (req, res) => {
        res.status(200).send("Hello world, here is a social media chat application");
    });
    app.use("/v1/users", userRoutes_1.default);
    app.use("/v1/posts", post_routes_1.default);
};

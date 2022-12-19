import express,{ Request, Response} from "express"
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";
import path from "path"
import http from "http"
import { Server } from "socket.io";
import {
    cloudinary
} from "../utils/helpers"
import usersRoute from "../modules/users/userRoutes"
import postRoute from "../modules/posts/post.routes"
import chatRoute from "../modules/chats/chat.routes"
import { logger } from "./logger";


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    logger.info("a user is conected")
    socket.on("join", (data)=> {
        logger.info(data)
    })
    socket.emit("server join", "hello from server")
    
    socket.on("chat message", (msg) => {
        logger.info("message", msg)
    })
    socket.on("disconnected", () => {
        logger.info("a user disconected")
    })
})
    console.log("hello")
    // require("../config/db")

    app.use(express.static(path.resolve(__dirname, "..",'public')))

    app.use(express.json())
        .use(express.urlencoded({extended: true}))
        .use(cors())
        .use(morgan("tiny"))
        .use(helmet())
        .use("*", cloudinary)

    app.get("/", (req: Request, res: Response) => {

        res.status(200).send("Hello world, welcome to ConnText. It is a social media chat application")
    })

    app.use("/v1/users", usersRoute)
        .use("/v1/posts", postRoute)
        .use("/v1/chat", chatRoute)

export default server



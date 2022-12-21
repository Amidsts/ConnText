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
import { logger } from "./logger";
import socketIo from "../config/socket.io";


const app = express()
const server = http.createServer(app)
const io = new Server(server)


    require("../config/db")

    app.use(express.static(path.resolve(__dirname, "..",'public')))

    app.use(express.json())
        .use(express.urlencoded({extended: true}))
        .use(cors())
        .use(morgan("tiny"))
        .use(helmet())
        .use("*", cloudinary)

    app.get("/welcome", (req: Request, res: Response) => {

        res.status(200).sendFile( path.resolve(__dirname, "..",'public') )

        res.status(200).send("Hello world, welcome to ConnText. It is a social media chat application")
    })

    app.use("/v1/users", usersRoute)
        .use("/v1/posts", postRoute)

        io.on("connection", socketIo)

export default server



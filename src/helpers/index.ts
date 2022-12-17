import express,{ Request, Response} from "express"
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";
import path from "path"

import {
    cloudinary
} from "../utils/helpers"
import usersRoute from "../modules/users/userRoutes"
import postRoute from "../modules/posts/post.routes"
// import { Socket } from "socket.io";

const app = express()


    
    require("../config/db")

    app.use(express.static(path.resolve(__dirname, "..",'public')))

    app.use(express.json())
        .use(express.urlencoded({extended: true}))
        .use(cors())
        .use(morgan("tiny"))
        .use(helmet())
        .use("*", cloudinary)
        
        // let http = require("http").Server(app)
        // let io = require("socket.io")(http)


        // app.get("/try", (req: Request, res: Response) => {

        //     res.sendFile(path.resolve(__dirname, "..",'public/index.html'))

        //     io.on("connection", function(socket: Socket) {
        //         console.log("user connected!")

        //         socket.on("setUsername", function(data: string) {

        //         })
        //     })
        // })
        
    app.get("/", (req: Request, res: Response) => {

        res.status(200).send("Hello world, welcome to ConnText. It is a social media chat application")
    })
    app.use("/v1/users", usersRoute)
    app.use("/v1/posts", postRoute)

export default app



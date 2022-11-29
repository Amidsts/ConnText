// import { logger } from "./logger";
import express,{Application, Request, Response} from "express"
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";
import {connect, ConnectOptions} from "mongoose"
import path from "path"

import {
    cloudinary
} from "../utils/helpers"
import usersRoute from "../modules/users/userRoutes"
import postRoute from "../modules/posts/post.routes"
import { MONGO_URI } from "../utils/env"; 
import { logger } from "./logger";
import { Socket } from "socket.io";


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
} as ConnectOptions

export default (app: Application ) => {
    connect(MONGO_URI, options).then( (e) => {
        logger.info("connected to the database successfully")
        
    }).catch((err) => {
        logger.info(err)
    })
    
    app.use(express.static(path.resolve(__dirname, "..",'public')))

    app.use(express.json())
        .use(express.urlencoded({extended: true}))
        .use(cors())
        .use(morgan("tiny"))
        .use(helmet())
        .use("*", cloudinary)
        
        let http = require("http").Server(app)
        let io = require("socket.io")(http)

        let user = ["Ameedat", "Balqees"]

        app.get("/try", (req: Request, res: Response) => {

            res.sendFile(path.resolve(__dirname, "..",'public/index.html'))

            io.on("connection", function(socket: Socket) {
                console.log("user connected!")

                socket.on("setUsername", function(data: string) {

                })
            })
        })
        
    app.get("/", (req: Request, res: Response) => {

        res.status(200).send("Hello world, here is a social media chat application")
    })
    app.use("/v1/users", usersRoute)
    app.use("/v1/posts", postRoute)
}




// import { logger } from "./logger";
import {Application, Request, Response} from "express"
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose"

export default (app: Application ) => {
    mongoose.Connection()

    app.use(cors())
        .use(morgan("tiny"))
        .use(helmet())
        
    app.get("/age",  (req: Request, res: Response) => {
        res.status(200).send("Hello world wide")
    })
}




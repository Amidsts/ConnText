import express, { Application } from "express"
import { logger } from "./helpers/logger"
import expressApp from "./helpers/index"
import {PORT} from "./utils/env"
// import c from "./"

(function () {
    const app: Application = express()
    expressApp(app)

    app.listen(PORT,  () => {
        logger.info(`server listening on port ${PORT}`)
    })
})()

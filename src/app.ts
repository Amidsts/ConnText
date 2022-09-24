import express, { Application } from "express"
import { logger } from "./helpers/logger"
import expressApp from "./helpers/index"

(function () {
    const app: Application = express()

    expressApp(app)

    app.listen(2000,  () => {
        logger.info("server listening on port 2000")
    })
})()

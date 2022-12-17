import express, { Application } from "express"
import { logger } from "./helpers/logger"
import app from "./helpers/index"
import {PORT} from "./utils/env"
// import c from "./"

(function () {

    app.listen(PORT,  () => {
        logger.info(`server listening on port ${PORT}`)
    })
})()

import express, { Application } from "express"
import { logger } from "./helpers/logger"
import server from "./helpers/index"
import {PORT} from "./utils/env"
// import c from "./"

(function () {

    server.listen(PORT,  () => {
        logger.info(`server listening on port ${PORT}`)
    })
})()

import {logger} from "../helpers/logger"
import { Socket } from "socket.io"

export default (client: Socket) => {
    let users = []

    logger.info("a user is conected")

    client.on("join", (data)=> {
        logger.info(data)
    })
    client.emit("server join", "hello from server")

    // client.on("identity")
    // client.on("chat message", (msg) => {
    //     logger.info( msg)
    // })

    client.on("disconnect", () => {
        logger.info("a user disconected")
    })
}
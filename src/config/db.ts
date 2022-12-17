import {connect, ConnectOptions} from "mongoose"
import { MONGO_URI } from "../utils/env"
import { logger } from "../helpers/logger";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
} as ConnectOptions

connect(MONGO_URI, options).then( (e) => {
    logger.info("connected to the database successfully")
    
}).catch((err) => {
    logger.info(err)
})
import {createLogger, format, transports} from "winston";

const { combine, errors, timestamp, printf, colorize } = format

const logformat = printf(({ level, timestamp, message, stack }) => {
    
    return `${timestamp} ${level}: ${stack || message}`
})

export const logger = createLogger({
    level: "info",
    format: combine(
        colorize(),
        timestamp({ format: "YYY-MM-DD HH-mm-ss" }),
        errors({ stack: true}),
        logformat
    ),
    transports: [ new transports.Console() ]
})  
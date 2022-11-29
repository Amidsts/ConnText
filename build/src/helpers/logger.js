"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, errors, timestamp, printf, colorize } = winston_1.format;
const logformat = printf(({ level, timestamp, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), timestamp({ format: "YYY-MM-DD HH-mm-ss" }), errors({ stack: true }), logformat),
    transports: [new winston_1.transports.Console()]
});

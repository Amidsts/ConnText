"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.clientError = void 0;
class baseError extends Error {
}
class clientError extends baseError {
    constructor(errMessage, statuscode) {
        super();
        this.succcess = false,
            this.errorName = "client error",
            this.errMessage = errMessage,
            this.statusCode = statuscode;
    }
}
exports.clientError = clientError;
class serverError extends baseError {
    constructor(errMessage, statuscode) {
        super();
        this.succcess = false,
            this.errorName = "server error",
            this.errMessage = errMessage,
            this.statusCode = statuscode;
    }
}
exports.serverError = serverError;

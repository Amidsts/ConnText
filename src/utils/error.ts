class baseError extends Error{
    protected succcess! :boolean
    protected errorName!: string
    protected statusCode!: number
    protected errMessage!: string
}

export class clientError extends baseError {
    constructor ( errMessage: string, statuscode: number) {
        super()
        this.succcess = false,
        this.errorName = "client error",
        this.errMessage = errMessage,
        this.statusCode = statuscode
    }
}

export class serverError extends baseError {
    constructor ( errMessage: string, statuscode: number) {
        super()
        this.succcess = false,
        this.errorName = "server error",
        this.errMessage = errMessage,
        this.statusCode = statuscode
    }
}
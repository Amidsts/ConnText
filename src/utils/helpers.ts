import { clientError } from "./error"


export const responsehandler = (payload: any, message = "success") => {
    return {
        success: true,
        message,
        data: payload || {}
    }
}

export function validator (schema: {[key: string]: any}, inputData: {[key:string]: any}) {

  const {error, value} = schema.validate(inputData)
  if (error) throw new clientError(`${value} ${error.message}`, 400)

  return value
}
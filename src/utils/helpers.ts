import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWTSECRET } from "./env"

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

export function hashPassword (plainPassword: string) {
  return bcrypt.compareSync( plainPassword, bcrypt.genSaltSync(10) )
}

export function comparePassword (hashedPassword: string, plainPassword: string) {
  return bcrypt.compareSync( plainPassword, hashedPassword )
}

export function generateToken (payload: {[key: string]: any}) {
  jwt.sign(payload, JWTSECRET, {expiresIn: 60*60*20})
}
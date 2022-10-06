import bcrypt from "bcrypt"
import {JwtPayload, sign, verify, SignOptions} from "jsonwebtoken"
import {v2} from "cloudinary"
import { 
  JWTSECRET,
  CLOUD_NAME,
  CLOUD_SECRET,
  CLOUD_KEY 
 } from "./env"
import { clientError } from "./error"
import { Request, Response, NextFunction } from "express"

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

  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))

}

export function comparePassword (hashedPassword: string, plainPassword: string) {

 return bcrypt.compareSync(plainPassword, hashedPassword)
 
}

export function generateToken (payload: {[key: string]: any}) {
  
  let options: SignOptions = {expiresIn: 60*60 }

 return  sign(payload, JWTSECRET, options)

}

interface tokenPayload extends JwtPayload{
  id?:string 
}

export function verifyToken (authToken: string) {
  const token = authToken.split(" ")[1]

    return verify(token, JWTSECRET) as tokenPayload

}

 
export function cloudinary (_req:Request, _res: Response, next:NextFunction) {

  v2.config({
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
    
 })
// console.log("connected to cloudinary")
  return next()
}


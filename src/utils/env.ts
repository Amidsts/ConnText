import dotenv from "dotenv"
dotenv.config()

let {env} = process

export const PORT = env.port || 4000
export const JWTSECRET = env.jwt_secret || ""
export const CLOUD_NAME = env.cloud_name || ""
export const CLOUD_SECRET = env.cloud_secret || ""
export const CLOUD_KEY = env.cloud_key || ""
export const MONGO_URI = env.mongo_uri || ""
export const CONNTEXT_USERNAME = env.conntext_username || ""
export const CONNTEXT_PASSWRD = env.context_passwrd || ""
export const HOST =  env.host || "http://localhost:4000"
import dotenv from "dotenv"
dotenv.config()

let {env} = process

export const PORT = env.port || 4000
export const JWTSECRET = env.jwtsecret || ""
export const CLOUD_NAME = env.jwtsecret || ""
export const CLOUD_SECRET = env.jwtsecret || ""
export const CLOUD_KEY = env.jwtsecret || ""
export const MONGO_URI = env.mongo_uri || ""
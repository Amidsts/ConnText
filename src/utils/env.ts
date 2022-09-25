import dotenv from "dotenv"
dotenv.config()

let {env} = process

export const PORT = env.port || 4000
import nodemailer from "nodemailer"
import {
    CONNTEXT_USERNAME,
    CONNTEXT_PASSWRD
} from "./env"
import { serverError } from "./error"

export const sendMail = async (options: {[key: string]: any}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c8273d3fd14efe",
            pass: "dc0488b08f8418"
        }
    })

    const mailInfos = {
        from: '"Ameedat Mustapha" <Amidst@conntext.com>',
        to: options.Email,
        subject: options.subject,
        html: options.message
    }

    try {
       return await transporter.sendMail(mailInfos)
       
    } catch (err) {
        return err
    }
}
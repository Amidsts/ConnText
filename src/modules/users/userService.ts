import { clientError } from "../../utils/error"
import {
    hashPassword, comparePassword, generateToken
} from "../../utils/helpers"
import {
    createPost,
    createUser,
    findUser
} from "./usersRepository"
import {
    createPostValidate,
    createUserValidator, loginUserValidator
} from "./uservalidation"

export async function createUserService(payload: {[key: string]: any}) {
    try {
        const {
            username, email,
            password, phoneNo,
            address: {
                country,
                state,
                localGovt,
                postalcode
            }
        } = createUserValidator(payload)

        await createUser(
            {
                username, email,
                password: hashPassword(password), 
                phoneNo,
                status: "active",
                address: {
                    country,
                    state,
                    localGovt,
                    postalcode
                }
            }
        )
        return "user sign up successfully"
        
    } catch (err) {
        return err
    }
}

export async function loginUserService (payload: {[key: string]: any}) {
    try{
        const {email, password} = loginUserValidator(payload)
        let User = await findUser({email})

       
        if (!User || !( comparePassword( User.password, password ) )) {

            throw new clientError("invalid email or password", 400)
        }
        const token = generateToken({id: User._id})
        
        return {
            accessToken : token,
            User
        }
    } catch (err) {
        return err
    }
}
//forgot password
//reset password
//change password
//resend password verification code
//online offline status of user using socket.io

//create post
export async function createPostService ( userId: string, payload: {[key: string]: any}, images?: {imgUrl: string, imgId: string}){
    try {
        
        const {description} = createPostValidate(payload)

    return await createPost(userId, description, images)
    } catch (err) {
        return err
    }
}
//get profile[]
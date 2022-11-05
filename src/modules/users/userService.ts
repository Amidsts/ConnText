import {ClientSession, startSession} from "mongoose"

import { clientError } from "../../utils/error"
import {
    hashPassword, comparePassword, generateToken
} from "../../utils/helpers"
import {
    createUser,
    findUser
} from "./usersRepository"
import {
    createUserValidator, loginUserValidator
} from "./uservalidation"
import User from "./usermodel"

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
console.log(password)
       const newUser =  await createUser(
            {
                username, email,
                password: hashPassword(password), 
                phoneNo,
                address: {
                    country,
                    state,
                    localGovt,
                    postalcode
                }
            }
        )
        newUser.password = ""
        return newUser
        
    } catch (err) {
        return err
    }
}

export async function loginUserService (payload: {[key: string]: any}) {
    try{
        const {email, password} = loginUserValidator(payload)
        // let user = await findUser({email})

        let user = await User.findOne({email})

        if (!user || !( comparePassword( user.password, password ) )) {

            throw new clientError("invalid email or password", 400)
        }
        // const token = generateToken({id: User._id})

        user.status = "active"
        await user.save()

        return {
            accessToken : generateToken({id: user._id}),
            user
        }
    } catch (err) {
        return err
    }
}
//forgot password
//reset password
//change password
//resend password verification code
//upload profile pictures
//online offline status of user using socket.io

//follow or unfollow user
export async function followUserService (userId: string, followerId: string) {

    const session:ClientSession = await startSession()
    session.startTransaction()

    try {

        if ( userId === followerId.toString() ) throw new clientError("you cannot follow yourself", 401)

        const user = await User.findById(userId)

        const follower = await User.findById(followerId)

        if (!user || user.status === "suspended" ||  user.status === "inactive" )
            throw new clientError("user account not found or account has been suspended", 404)

        //update user's follower
        if ( !(user.followers.includes(followerId)) ) {
            await user.updateOne({
                $push: {
                    followers: followerId
                },
                $inc: {
                    followersCount: 1
                }
            }, { session })

            await follower?.updateOne({
                $push:{
                    followings: userId
                },
                $inc: {
                    followingsCount: 1
                }
            }, { session })

            await session.commitTransaction()
        } else{
            await user.update({
                $pull: {
                    followers: followerId
                },
                $inc: {
                    followersCount: -1
                }
            }, { session })

            await follower?.update({
                $pull: {
                    followings: userId
                },
                $inc: {
                    followingsCount: -1
                }
            }, { session })
        }

        return await User.findById(userId)
    } catch (err) {

        await session.abortTransaction()

        return err
    } finally {
        await session.endSession()
    }
}
//get followers
//get followings

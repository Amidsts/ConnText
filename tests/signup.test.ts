import request from "supertest"
import express from "express"

// import root from "./helpers/index"
import mongoose, {connect, connection, disconnect, Types} from "mongoose"
import {MONGO_URI} from "../src/utils/env"
import {createUserService} from "../src/modules/users/userService"
import { generateToken, verifyToken } from "../src/utils/helpers"
import User from "../src/modules/users/usermodel"

const app = express()

const userPayload1 = {
    username: "Ameedat",
    password: "jn9bh923k",
    email: "great@gmail.com",
    phoneNo: "09057298513",
    status: "active",
    address: {
        country: "Nigeria",
        state: "Kwara",
        localGovt: "ilorin east"
    }
}

const userPayload2 = {
    username: "Ameedat",
    password: "jn9bh92k1",
    email: "greatness@gmail.com",
    phoneNo: "09057298513",
    status: "active",
    address: {
        country: "Nigeria",
        state: "Kwara",
        localGovt: "ilorin east"
    }
}

const logIndetails = {
    email: "great@gmail.com",
    password: "jn9bh923k"
}

const userId = new Types.ObjectId().toString()

const postPayload = {
    description: "making some test for my post"
}

describe("testing the jest api", () => {
    it("tests / endpoint", async() => {
        try {
            const {body, statusCode} = await request(app)
            .get("/")
            
            expect(body).toBe("Hello world, here is a social medial chat application")
        } catch (err){
            err
        }

    })
})

describe( "user", () => {
    beforeAll( async () => {
        await connect(MONGO_URI)
    } )

    afterAll( async () => {
        await disconnect()
        await connection.close()
    })

    it("sign up user and save document to the database", async () => {
        try {
            await createUserService(userPayload1)
            const res = await request(app)
            .post("/v1/users/create-user")
            .send(userPayload1)
    
            expect(res.body).toBe("user sign up successfully")
        } catch (err) {
            err
        }

    })

    it("should log in registered user", async () => {
        try {
            const {body} = await request(app)
            .post("/v1/users/login-user")
            .send(logIndetails)
            
            let id = body.User._id
            const user = await User.findOne({email: logIndetails.email})

            // expect( generateToken({id:id}) ).toBeCalled()
            expect(body).toEqual({
                accessToken :  expect( generateToken({id:id}) ).toBeCalled(),
                user
            })
        } catch (err) {
            err
        }
    }) 

    describe("authorized user can make post and access it", () => {
        beforeAll( async () => {
            const user = new User({
                _id: userId,
                ...userPayload2
            })            
        } )


        it("user should create a new post", async () => {
            const user = await User.findById(userId)
            try {

                const token = generateToken({id: user?._id}) 

                const {body} = await request(app)
                .post("/v1/users/create-post")
                .set({Headers: `Bearer ${token}`})
                .send(postPayload)
        
                expect(body).toEqual({
                    ...postPayload
                })

            } catch (err) {
                err
            }
        }) 
    })

} )

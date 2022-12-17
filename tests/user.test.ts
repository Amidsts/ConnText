import request from "supertest"
import express from "express"
import mongoose, {connect, connection, disconnect} from "mongoose"
import User from "../src/modules/users/usermodel"
import {MONGO_URI} from "../src/utils/env"
import app from "../src/helpers/index"

const newUserData = {
    username: "nametest",
    email: "emaltest",
    password: "fakePassword",
    phoneNo: "09045325519"
}

const logInData = {
    email: "emaltest",
    password: "fakePassword"
}


describe("user authentication for sign up, send verification code, login, forgot password and reset password", () => {

    beforeAll( async () => {
        require("../src/config/db")
    })

    afterAll( async () => {
        await User.deleteMany()
        
    })

    describe("POST signup /v1/users/create-user", () => {

        it("should return status code 200 when user successfuly login", async() => {

           
            const res = await request(app)
            .post("/v1/users/create-user")
            .send(newUserData)

            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toBe("object")
            expect(res.body.data.newUser.username).toBe(newUserData.username)
            // expect(res.body.email).toBe(newUserData.email)

        })
    })
    
})

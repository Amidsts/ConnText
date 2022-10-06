import request from "supertest"
import express from "express"

// import root from "./helpers/index"

const app = express()

describe("testing the jest api", () => {
    it("tests / endpoint", async() => {
        const response = await request(app).get("/")
        
        
        expect(response.body).toMatch("Hello world, here is a social medial chat application")
        
    })
})// expect(response.statusCode).toBe(200)
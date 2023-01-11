import { Response } from 'express';
import supertest from "supertest";
import { User,  } from "../user";
import generate_token from "./generate_token";
import app from "../../server";
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const request = supertest(app)
const token:string = generate_token()
dotenv.config()


describe('user handler methods testing', ()=>{
    it('/users endpoint should return a response with all users',async () => {
        const user:User = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
        expect(response.body).toEqual([user])
    })
    it('post to /users endpoint should create new user and return jwt token', async ()=>{
        const secret = process.env.TOKEN_SECRET as string
        const toBeCreated:User = {first_name:'Ziad', last_name:'Zouhairi', password:'ziad123'}
        const response = await request.post('/users').send(toBeCreated)
        // expect(await bcrypt.compare('ziad123', response.body.password)).toBe(true)
        expect(jwt.verify(response.body, secret)).toBeTruthy()
    })
    it('/users/:id should return the user with the specified id', async ()=>{
        const expected:User = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
        const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
        // expect(await bcrypt.compare('mohamed123', response.body.password)).toBe(true)
        expect({...response.body, password:'mohamed123'}).toEqual(expected)
    })
})
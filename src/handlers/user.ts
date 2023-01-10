import { UserStore, User } from "../models/user";
import express, {Request, Response} from "express";
import { verifyToken } from "./token_verification";

const store = new UserStore()

async function index(req:Request, res:Response){
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
}


async function show(req:Request, res:Response){
    try {
        const id = req.params.id
        const user = await store.show(parseInt(id))
        res.json(user)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
}


async function create(req:Request, res:Response){
    try {
        const user:User = req.body
        const createdUser = await store.create(user)
        res.json(createdUser)
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const user_routes = (app:express.Application)=>{
    app.get('/users', verifyToken, index)
    app.post('/users', verifyToken, create)
    app.get('/users/:id', verifyToken, show)
}

export default user_routes
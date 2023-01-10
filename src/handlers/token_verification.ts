import express, { Request, Response } from "express";

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.TOKEN_SECRET as string



export async function verifyToken(req:Request, res:Response, next:Function){
    const token = (req.headers.authorization?.split(' ')[1] as string);
    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

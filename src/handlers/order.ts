import { Order, OrderStore } from "../models/order";
import express, {Request, Response} from 'express'
import { verifyToken } from "./token_verification";

const store = new OrderStore()


async function getCurrentOrder(req:Request, res:Response){
    const id = req.params.user_id
    const order:Order = await store.currentUserOrder(parseInt(id))
    res.json(order)
}


async function getCompletedOrder(req:Request, res:Response){
    const id = req.params.user_id
    const orders:Order[] = await store.completedUserOrders(parseInt(id))
    res.json(orders)
}


const order_routes = (app:express.Application)=>{
    app.get('/orders/active/:user_id', verifyToken, getCurrentOrder)
    app.get('/orders/completed/:user_id', verifyToken, getCompletedOrder)
}

export default order_routes
import { ProductStore, Product } from "../models/product";
import express, { Request, Response } from "express";
import {verifyToken} from './token_verification'

const store = new ProductStore()


async function index(req:Request, res:Response){
    try {
        const products = await store.index()
        res.json(products)
    } catch (error) {
        res.status(400)
    }

}

async function show(req:Request, res:Response){
    try {
        const id = req.params.id
        const product = await store.show(parseInt(id))
        res.json(product)
    } catch (error) {
        res.status(400)
    }
    
}


async function create(req:Request, res:Response){
    try {
        const product:Product = req.body
        const createdProduct = await store.create(product)
        res.json(createdProduct)
    } catch (error) {
        res.status(400)
    }

}


async function topFivePopular(_req:Request, res:Response){
    try {
        const products:Product[] = await store.topFivePopular()
        res.json(products)
    } catch (error) {
        res.status(400)
    }
    
}

async function filterByCategory(req:Request, res:Response){
    try {
        const category = req.params.category
        const products = await store.filterByCategory(category)
        res.json(products)
    } catch (error) {
        res.status(400)
    }
}

const products_routes = (app:express.Application)=>{
    app.get('/products', index)
    app.post('/products', verifyToken, create)
    app.get('/products/topfivepopular', topFivePopular)
    app.get('/products/:id', show)
    app.get('/products/category/:category', filterByCategory)
}

export default products_routes
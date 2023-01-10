import supertest from "supertest";
import { Product } from "../product";
import generate_token from "./generate_token";
import app from "../../server";

const request = supertest(app)

describe('product handler endpoints test', ()=>{

    it('post to /products endpoint should create new product and return it as response', async ()=>{
        const token:string = generate_token()
        const product:Product = {name:'Book', category: 'Book', price: 20, number_sells: 1000}
        const expected:Product = {id:2, name:'Book', category: 'Book', price: 20, number_sells: 1000}
        const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product)
        expect(response.body).toEqual(expected)
    })

    it('get products should return a response with a list of products', async ()=>{
        const product1:Product = {id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9}
        const product2:Product = {id:2, name:'Book', category: 'Book', price: 20, number_sells: 1000}
        const response = await request.get('/products');
        expect(response.body).toEqual([product1, product2])
    })
    it('get product should return a response with a single object', async ()=>{
        const product1:Product = {id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9}
        const response = await request.get(`/products/1`);
        expect(response.body).toEqual(product1)
    })
    it('get topFivePopular endpoint should return five products', async ()=>{
        const product1:Product = {id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9}
        const product2:Product = {id:2, name:'Book', category: 'Book', price: 20, number_sells: 1000}
        const response = await request.get('/products/topfivepopular')
        expect(response.body).toEqual([product2, product1])
    })
    it('get by category endpoint should return the specefied category', async ()=>{
        const product1:Product = {id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9}
        const category = 'computer'
        const response = await request.get(`/products/category/${category}`)
        expect(response.body).toEqual([product1])
    })
})
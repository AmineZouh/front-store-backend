import supertest from "supertest";
import app from "../../server";
import generate_token from "./generate_token";

const request = supertest(app)

describe('order_product handler testing', ()=>{
    it('/orders/:id/products endpoint should add an existing product to the order', async ()=>{
        const token = generate_token()
        const order_product = {product_id:2, quantity: 7}
        const expected = {id:1, order_id:1, product_id:2, quantity: 7}
        const response = await request.post('/orders/1/products').set('Authorization', `Bearer ${token}`).send(order_product)
        console.log('the result from the handler is : ', response.body)
        expect(response.body).toEqual(expected)
    })
})
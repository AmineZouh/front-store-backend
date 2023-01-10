import supertest from "supertest";

import generate_token from "./generate_token";
import { Order } from "../order";
import app from "../../server";


const request = supertest(app)
const token = generate_token()


describe('Order handler endpoits testing', ()=>{
    it('/orders/active/:user_id endpoint should return the current order of the user with the user_id', async ()=>{
        const activeOrder = {id: 2, user_id: 1, date: '23-05-2023', status: 'active'}
        const response = await request.get('/orders/active/1').set('Authorization', `Bearer ${token}`)
        expect(response.body).toEqual(activeOrder)
    })
    it('/orders/completed/:user_id endpoint should return a list of completed orders of the user with the user_id', async ()=>{
        const completedOrder = {id: 1, user_id: 1, date: '01-06-2023', status: 'completed'}
        const response = await request.get('/orders/completed/1').set('Authorization', `Bearer ${token}`)
        expect(response.body).toEqual([completedOrder])
    })
})
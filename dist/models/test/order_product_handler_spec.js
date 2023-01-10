"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const generate_token_1 = __importDefault(require("./generate_token"));
const request = (0, supertest_1.default)(server_1.default);
describe('order_product handler testing', () => {
    it('/orders/:id/products endpoint should add an existing product to the order', async () => {
        const token = (0, generate_token_1.default)();
        const order_product = { product_id: 2, quantity: 7 };
        const expected = { id: 1, order_id: 1, product_id: 2, quantity: 7 };
        const response = await request.post('/orders/1/products').set('Authorization', `Bearer ${token}`).send(order_product);
        console.log('the result from the handler is : ', response.body);
        expect(response.body).toEqual(expected);
    });
});

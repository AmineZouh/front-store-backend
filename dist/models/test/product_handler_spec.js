"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const generate_token_1 = __importDefault(require("./generate_token"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('product handler endpoints test', () => {
    it('post to /products endpoint should create new product and return it as response', async () => {
        const token = (0, generate_token_1.default)();
        const product = { name: 'Book', category: 'Book', price: 20, number_sells: 1000 };
        const expected = { id: 2, name: 'Book', category: 'Book', price: 20, number_sells: 1000 };
        const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product);
        expect(response.body).toEqual(expected);
    });
    it('get products should return a response with a list of products', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9 };
        const product2 = { id: 2, name: 'Book', category: 'Book', price: 20, number_sells: 1000 };
        const response = await request.get('/products');
        expect(response.body).toEqual([product1, product2]);
    });
    it('get product should return a response with a single object', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9 };
        const response = await request.get(`/products/1`);
        expect(response.body).toEqual(product1);
    });
    it('get topFivePopular endpoint should return five products', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9 };
        const product2 = { id: 2, name: 'Book', category: 'Book', price: 20, number_sells: 1000 };
        const response = await request.get('/products/topfivepopular');
        expect(response.body).toEqual([product2, product1]);
    });
    it('get by category endpoint should return the specefied category', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 9 };
        const category = 'computer';
        const response = await request.get(`/products/category/${category}`);
        expect(response.body).toEqual([product1]);
    });
});

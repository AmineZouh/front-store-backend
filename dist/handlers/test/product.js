"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product_1 = __importDefault(require("../product"));
const request = (0, supertest_1.default)((0, product_1.default)(server_1.default));
describe('product handler endpoints test', () => {
    it('get products should return a response with a list of products', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 0 };
        const response = await request.get('/products');
        expect(response.body).toEqual([product1]);
    });
    it('get product should return a response with a single object', async () => {
        const product1 = { id: 1, name: 'laptop', category: 'computer', price: 1000, number_sells: 0 };
        const response = await request.get(`/products/1`);
        expect(response.body).toEqual(product1);
    });
});

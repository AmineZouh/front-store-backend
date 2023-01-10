"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const generate_token_1 = __importDefault(require("./generate_token"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const token = (0, generate_token_1.default)();
describe('Order handler endpoits testing', () => {
    it('/orders/active/:user_id endpoint should return the current order of the user with the user_id', async () => {
        const activeOrder = { id: 2, user_id: 1, date: '23-05-2023', status: 'active' };
        const response = await request.get('/orders/active/1').set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual(activeOrder);
    });
    it('/orders/completed/:user_id endpoint should return a list of completed orders of the user with the user_id', async () => {
        const completedOrder = { id: 1, user_id: 1, date: '01-06-2023', status: 'completed' };
        const response = await request.get('/orders/completed/1').set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual([completedOrder]);
    });
});

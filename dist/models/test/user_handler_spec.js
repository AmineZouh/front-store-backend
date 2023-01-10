"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const generate_token_1 = __importDefault(require("./generate_token"));
const server_1 = __importDefault(require("../../server"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const request = (0, supertest_1.default)(server_1.default);
const token = (0, generate_token_1.default)();
describe('user handler methods testing', () => {
    it('/users endpoint should return a response with all users', async () => {
        const user = { id: 1, first_name: 'Mohamed', last_name: 'Zouhairi', password: 'mohamed123' };
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual([user]);
    });
    it('post to /users endpoint should create new user and return it', async () => {
        const toBeCreated = { first_name: 'Ziad', last_name: 'Zouhairi', password: 'ziad123' };
        const response = await request.post('/users').set('Authorization', `Bearer ${token}`).send(toBeCreated);
        expect(await bcrypt_1.default.compare('ziad123', response.body.password)).toBe(true);
        expect({ ...response.body, password: 'ziad123' }).toEqual({ id: 2, ...toBeCreated });
    });
    it('/users/:id should return the user with the specified id', async () => {
        const expected = { id: 1, first_name: 'Mohamed', last_name: 'Zouhairi', password: 'mohamed123' };
        const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
        // expect(await bcrypt.compare('mohamed123', response.body.password)).toBe(true)
        expect({ ...response.body, password: 'mohamed123' }).toEqual(expected);
    });
});

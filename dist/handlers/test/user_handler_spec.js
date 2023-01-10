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
xdescribe('user handler methods testing', () => {
    it('/users endpoint should return a response with all users', async () => {
        const user = { id: 1, first_name: 'Mohamed', last_name: 'Zouhairi', password: 'mohamed123' };
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
        console.log('the response which is being returned is the following : ', response.body);
        expect(response.body).toEqual([user]);
    });
    it('/users endpoint should create new user and return it', async () => {
        const toBeCreated = { first_name: 'Ziad', last_name: 'Zouhairi', password: 'ziad123' };
        const response = await request.post('/users').set('Authorization', `Bearer ${token}`).send(toBeCreated);
        console.log('the response which is being returned is the following : ', response.body);
        expect(await bcrypt_1.default.compare('ziad123', response.body.password)).toBe(true);
        expect({ ...response.body, password: 'ziad123' }).toEqual({ id: 2, ...toBeCreated });
    });
    it('/users/:id should the user with specified id', async () => {
        const expected = { id: 2, first_name: 'Ziad', last_name: 'Zouhairi', password: 'ziad123' };
        const response = await request.get('/users/2').set('Authorization', `Bearer ${token}`);
        console.log('the response which is being returned is the following : ', response.body);
        expect(await bcrypt_1.default.compare('ziad123', response.body.password)).toBe(true);
        expect({ ...response.body, password: 'ziad123' }).toEqual(expected);
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../user");
dotenv_1.default.config();
const store = new user_1.UserStore();
const salt_round = process.env.SALT_ROUNDS;
describe('User model method testing', () => {
    it('index method should be defined', async () => {
        expect(store.index()).toBeDefined();
    });
    it('index method should return all users', async () => {
        // const user1:User = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
        const result = await store.index();
        expect(result.length).toEqual(2);
    });
    it('create method should create a user with hashed password', async () => {
        const toBeCreatedUser = { first_name: 'Moad', last_name: 'Slawy', password: 'moad123' };
        const expectedUser = { id: 3, first_name: 'Moad', last_name: 'Slawy', password: "moad123" };
        const result = await store.create(toBeCreatedUser);
        expect(await bcrypt_1.default.compare('moad123', result.password)).toBe(true);
        expect({ ...result, password: 'moad123' }).toEqual({ ...expectedUser, password: 'moad123' });
    });
    it('show method should return a user with the specified id', async () => {
        const expectedUser = { id: 1, first_name: 'Mohamed', last_name: 'Zouhairi', password: 'mohamed123' };
        const result = await store.show(1);
        // expect(await bcrypt.compare('moad123', result.password)).toBe(true)
        expect(result).toEqual(expectedUser);
    });
});

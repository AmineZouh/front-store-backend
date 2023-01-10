import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User, UserStore } from "../user";

dotenv.config()
const store = new UserStore()


const salt_round = process.env.SALT_ROUNDS as unknown as string


describe('User model method testing', ()=>{

    it('index method should be defined', async ()=>{
        expect(store.index()).toBeDefined()
    })

    it('index method should return all users', async ()=>{
        // const user1:User = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
        const result = await store.index()
        expect(result.length).toEqual(2)
    })

    it('create method should create a user with hashed password', async ()=>{
        const toBeCreatedUser:User = {first_name:'Moad', last_name:'Slawy', password:'moad123'}
        const expectedUser:User = {id:3, first_name:'Moad', last_name:'Slawy', password:"moad123"}
        const result = await store.create(toBeCreatedUser)
        expect(await bcrypt.compare('moad123', result.password)).toBe(true)
        expect({...result, password:'moad123'}).toEqual({...expectedUser, password:'moad123'})
    })
    
    it('show method should return a user with the specified id', async ()=>{
        const expectedUser:User = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
        const result = await store.show(1)
        // expect(await bcrypt.compare('moad123', result.password)).toBe(true)
        expect(result).toEqual(expectedUser)
    })

})
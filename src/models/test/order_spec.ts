import { Order, OrderStore } from "../order";


const store = new OrderStore()


describe('Test of order model', ()=>{
    it('completedUserOrders method should be defined', ()=>{
        expect(store.completedUserOrders).toBeDefined()
    })
    it('completedUserOrders should return a list of completed user\'orders', async () => {
        const order:Order = {id:1, user_id:1, date:'01-06-2023', status:'completed'}
        const result:Order[] = await store.completedUserOrders(1)
        expect(result).toEqual([order])
    })
    it('currentUserOrder method should be defined', ()=>{
        expect(store.currentUserOrder).toBeDefined()
    })
    it('currentUserOrder should return a list of completed user\'orders', async () => {
        const order:Order = {id:2, user_id:1, date:'23-05-2023', status:'active'}
        const result:Order = await store.currentUserOrder(1)
        expect(result).toEqual(order)
    })

})
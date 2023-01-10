import { OrderProductStore, OrderProduct } from "../order-product"


const store = new OrderProductStore()



describe('order-product model methods testing', ()=>{
    it('add product to an order method testing', async ()=>{
        const order_product = {order_id:1, product_id:1, quantity: 7}
        const expected = {id:2, order_id:1, product_id:1, quantity: 7}
        const result :OrderProduct = await store.addProduct(order_product)
        console.log('the result from the moedl is : ', result)
        expect(result).toEqual(expected)
    })
})
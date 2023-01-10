import express, {Request, Response} from 'express'
import { OrderProductStore, OrderProduct } from '../models/order-product'

const store = new OrderProductStore()

const addProduct = async (_req: Request, res: Response) => {
    const orderId: number = parseInt(_req.params.id)
    const orderProduct: OrderProduct = _req.body
    orderProduct.order_id = orderId
    try {
      const addedProduct = await store.addProduct(orderProduct)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  }


const order_product_routes=(app:express.Application)=>{
    app.post('/orders/:id/products', addProduct)
}

export default order_product_routes

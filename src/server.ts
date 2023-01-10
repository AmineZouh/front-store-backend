import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import products_routes from './handlers/product'
import user_routes from './handlers/user'
import order_routes from './handlers/order'

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

products_routes(app)
user_routes(app)
order_routes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app
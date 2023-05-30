import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routeCustomer from './routes/customerRoute.js'
import routeProduct from './routes/productRoute.js'
import routeLocation from './routes/locationRoute.js'
import routeOrder from './routes/orderRoute.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/customers', routeCustomer)
app.use('/api/products', routeProduct)
app.use('/api/locations', routeLocation)
app.use('/api/orders', routeOrder)

try {
    app.listen(process.env.PORT || '8080', () => {
        console.log(`Server is running on http://localhost:8080`)
    })
} catch (error) {
    console.error(`Error occured: ${error.message}`)
}
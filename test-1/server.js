import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routeCustomer from './routes/routeCustomer.js'
import routeProduct from './routes/routeProduct.js'
import routeMain from './routes/routeMain.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/users', routeCustomer)
app.use('/api/products', routeProduct)
app.use('/api/main', routeMain)

try {
  app.listen(process.env.PORT || '8080', () => {
      console.log(`Server is running on http://localhost:8080`)
  })
} catch (error) {
  console.error(`Error occured: ${error.message}`)
}
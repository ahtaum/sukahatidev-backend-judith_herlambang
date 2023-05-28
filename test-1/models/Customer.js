import { model } from "@prisma/client"
import Brand from "./Brand.js"
import Product from "./Product.js"

const Customer = model.Customer

Customer.brands = () => Customer.findUnique({ where: { id: Customer.id } }).brands()
Customer.orders = () => Customer.findUnique({ where: { id: Customer.id } }).orders()

export default Customer
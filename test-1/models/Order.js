import { model } from "@prisma/client"
import Customer from "./Customer.js"
import Product from "./Product.js"

const Order = model.Order
Order.customer = () => Order.findUnique({ where: { id: Order.id } }).customer()
Order.product = () => Order.findUnique({ where: { id: Order.id } }).product()

export default Order
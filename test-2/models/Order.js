import { order, customer, product, location } from "@prisma/client"

const Order = order

Order.customer = () => Order.findUnique({ where: { id: Order.id } }).customer()
Order.product = () => Order.findUnique({ where: { id: Order.id } }).product()
Order.location = () => Order.findUnique({ where: { id: Order.id } }).location()

export default Order

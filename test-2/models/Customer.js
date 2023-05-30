import { customer, orders } from "@prisma/client"

const Customer = customer

Customer.orders = () => Customer.findUnique({ where: { id: Customer.id } }).orders()

export default Customer
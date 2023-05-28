import { model } from "@prisma/client"
import Order from "./Order.js"

const Product = model.Product
Product.orders = () => Product.findUnique({ where: { id: Product.id } }).orders()

export default Product
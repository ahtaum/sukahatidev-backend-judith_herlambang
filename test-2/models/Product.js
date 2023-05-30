import { product, orders } from "@prisma/client"

const Product = product

Product.orders = () => Product.findUnique({ where: { id: Product.id } }).orders()

export default Product

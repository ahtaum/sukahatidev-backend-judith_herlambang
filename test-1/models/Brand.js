import { model } from "@prisma/client"
import Customer from "./Customer.js"

const Brand = model.Brand
Brand.customer = () => Brand.findUnique({ where: { id: Brand.id } }).customer()

export default Brand
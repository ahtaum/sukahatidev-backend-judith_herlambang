import { location, orders } from "@prisma/client"

const Location = location

Location.orders = () => Location.findUnique({ where: { id: Location.id } }).orders()

export default Location

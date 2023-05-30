import express from "express"
import { getOrders, getTopOrderedProducts, getTotalRevenue, addOrder, updateOrder, deleteOrder } from "../controllers/OrderController.js"

const routeOrder = express.Router()

routeOrder.get("/", getOrders)
routeOrder.get("/top/products", getTopOrderedProducts)
routeOrder.get("/total-revenue", getTotalRevenue)
routeOrder.post("/add", addOrder)
routeOrder.put("/update/:id", updateOrder)
routeOrder.delete("/delete/:id", deleteOrder)

export default routeOrder
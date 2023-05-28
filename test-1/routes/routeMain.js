import express from "express"
import { addBrand, createOrder, getOrders, cancelOrder, getOrderCustomer } from "../controllers/MainController.js"

const routeMain = express.Router()

routeMain.get("/orders", getOrders)
routeMain.get("/orders/customer/:customerId", getOrderCustomer)

routeMain.post("/add/brand", addBrand)
routeMain.post("/add/order", createOrder)
routeMain.delete("/cancel/order/:id", cancelOrder)

export default routeMain
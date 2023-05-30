import express from "express"
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer, getCustomerPercentage, getTopCustomersByOrderQuantity, getTopCustomersByAveragePurchase } from "../controllers/CustomerController.js"

const routeCustomer = express.Router()

routeCustomer.get("/", getCustomers)
routeCustomer.get("/top/average-purchase", getTopCustomersByAveragePurchase)
routeCustomer.get("/:id", getCustomer)
routeCustomer.get("/percentage/:id", getCustomerPercentage)
routeCustomer.get("/top/order-quantity", getTopCustomersByOrderQuantity)
routeCustomer.post("/add", addCustomer)
routeCustomer.put("/update/:id", updateCustomer)
routeCustomer.delete("/delete/:id", deleteCustomer)

export default routeCustomer
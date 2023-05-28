import express from "express"
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomerController.js"

const routeCustomer = express.Router()

routeCustomer.get("/", getCustomers)
routeCustomer.get("/:id", getCustomer)
routeCustomer.post("/add", addCustomer)
routeCustomer.put("/edit/:id", updateCustomer)
routeCustomer.delete("/delete/:id", deleteCustomer)

export default routeCustomer
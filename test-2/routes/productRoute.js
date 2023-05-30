import express from "express"
import { getProducts, getProduct, addProduct, deleteProduct } from "../controllers/ProductController.js"

const routeProduct = express.Router()

routeProduct.get("/", getProducts)
routeProduct.get("/:id", getProduct)
routeProduct.post("/add", addProduct)
routeProduct.delete("/delete/:id", deleteProduct)

export default routeProduct
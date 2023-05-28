import express from "express"
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js"

const routeProduct = express.Router()

routeProduct.get("/", getProducts)
routeProduct.get("/:id", getProduct)
routeProduct.post("/add", addProduct)
routeProduct.put("/update/:id", updateProduct)
routeProduct.delete("/delete/:id", deleteProduct)

export default routeProduct
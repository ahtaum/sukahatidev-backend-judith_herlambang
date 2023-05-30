import express from "express"
import { getDataLocations, createLocations } from "../controllers/LocationController.js"

const routeLocation = express.Router()

routeLocation.get("/", getDataLocations)
routeLocation.post("/add", createLocations)

export default routeLocation
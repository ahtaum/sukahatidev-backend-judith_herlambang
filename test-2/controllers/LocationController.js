import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getDataLocations = async (req, res) => {
    try {
        const locations = await prisma.location.findMany({
            include: {
                orders: true
              }
        })

        const locationData = locations.map((location) => {
          const customerCount = location.orders.reduce(
            (count, order) => {
              if (!count.customers.includes(order.customerId)) {
                count.customers.push(order.customerId)
              }
              count.quantity += order.quantity
              return count
            },
            { customers: [], quantity: 0 }
          )
    
          return {
            city: location.cityName,
            customerCount: customerCount.customers.length,
            orderQuantity: customerCount.quantity,
          }
        })

        res.status(200).json({
          code: 200,
          status: 'success',
          data: locationData,
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const createLocations = async (req, res) => {
  try {
    const { city_name } = req.body

    const location = await prisma.location.create({
      data: {
        city_name: city_name,
      },
    })

    res.status(201).json({
      code: 200,
      status: 'success',
      message: 'Location created successfully',
      data: location,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}
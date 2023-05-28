import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
              customer: true,
              product: true,
            },
        })

        res.status(200).json({
            code: 200,
            message: "OK",
            total: orders.length,
            data: orders
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message,
        })
    }
}

export const getOrderCustomer = async (req, res) => {
    try {
        const customerId = parseInt(req.params.customerId)

        const order = await prisma.order.findMany({
            where: {
              customerId: customerId,
            },
            include: {
              customer: true,
              product: true,
            },
        })

        res.status(200).json({ 
            code: 200,
            message: "OK",
            data: order
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message,
        })
    }
} 

export const addBrand = async (req, res) => {
    try {
        await body("name").notEmpty().withMessage("name required").run(req)
        await body("name_customer").notEmpty().withMessage("name customer required").run(req)
    
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, name_customer } = req.body
        
        const customer = await prisma.customer.findFirst({
            where: { name: { equals: name_customer } }
        })

        if (!customer) {
            return res.status(404).json({
              code: 404,
              message: `Customer '${name_customer}' not found`
            })
        }

        const brand = await prisma.brand.create({
            data: {
              name,
              userId: Number(customer.id)
            }
        })

        res.status(200).json({ 
            code: 200,
            message: 'Brand added successfully',
            data: brand
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const createOrder = async (req, res) => {
    try {
      await body('customerId').notEmpty().withMessage('Customer ID required').isInt().withMessage('Customer ID must be an integer').run(req)
      await body('productId').notEmpty().withMessage('Product ID required').isInt().withMessage('Product ID must be an integer').run(req)

      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
  
      const { customerId, productId } = req.body
      const customer = await prisma.customer.findUnique({ where: { id: customerId } })
  
      if (!customer) {
        return res.status(404).json({
          code: 404,
          message: `Customer with ID ${customerId} not found`,
        })
      }
  
      const product = await prisma.product.findUnique({ where: { id: productId } })
  
      if (!product) {
        return res.status(404).json({
          code: 404,
          message: `Product with ID ${productId} not found`,
        })
      }
  
      const order = await prisma.order.create({
        data: {
          customerId,
          productId,
        },
      })
  
      res.status(200).json({ 
        code: 200,
        message: 'Order created successfully',
        data: order,
      })
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error.message,
      })
    }
}

export const cancelOrder = async (req, res) => {
    try {
      const orderId = parseInt(req.params.id)
  
      await prisma.order.delete({
        where: { id: orderId },
      })
  
      res.status(200).json({
        code: 200,
        message: `Order with ID ${orderId} has been canceled`,
      })
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error.message,
      })
    }
}
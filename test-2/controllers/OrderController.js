import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                location: true,
                product: true,
            }
        })

        res.status(200).json({ 
            code: 200,
            message: 'OK',
            total: orders.length,
            data: orders
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const getTopOrderedProducts = async (req, res) => {
  try {
    const topOrderedProducts = await prisma.product.findMany({
      include: {
        orders: true,
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
    })

    res.status(200).json({
      code: 200,
      status: 'success',
      data: topOrderedProducts,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: error.message,
    })
  }
}

export const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        quantity: true,
      },
    })

    const { _sum: { quantity: totalQuantity } } = totalRevenue

    const products = await prisma.product.findMany()

    let totalRevenueAmount = 0
    for (const product of products) {
      const { price } = product
      totalRevenueAmount += price * totalQuantity
    }

    res.status(200).json({
      code: 200,
      status: 'success',
      totalRevenue: totalRevenueAmount,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: error.message,
    })
  }
}

export const addOrder = async (req, res) => {
    try {
      const { customer_id, product_id, location_id, quantity } = req.body
  
      const customer = await prisma.customer.findUnique({
        where: { id: customer_id },
      })
      if (!customer) {
        return res.status(400).json({ message: 'Invalid customer ID' })
      }
  
      const product = await prisma.product.findUnique({
        where: { id: product_id },
      })
      if (!product) {
        return res.status(400).json({ message: 'Invalid product ID' })
      }
  
      const location = await prisma.location.findUnique({
        where: { id: location_id },
      })
      if (!location) {
        return res.status(400).json({ message: 'Invalid location ID' })
      }
  
      const order = await prisma.order.create({
        data: {
          customer: { connect: { id: customer_id } },
          product: { connect: { id: product_id } },
          location: { connect: { id: location_id } },
          quantity,
        },
      })
  
      res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Order added successfully',
        data: order,
      })
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message,
      })
    }
}

export const updateOrder = async (req, res) => {
  try {
    await body("customer_id").isInt().toInt().withMessage("Invalid customer ID").run(req)
    await body("product_id").isInt().toInt().withMessage("Invalid product ID").run(req)
    await body("location_id").isInt().toInt().withMessage("Invalid location ID").run(req)
    await body("quantity").isInt().withMessage("Invalid quantity").run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { customer_id, product_id, location_id, quantity } = req.body

    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
    })
    if (!order) {
      return res.status(400).json({ message: "Invalid order ID" })
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customer_id },
    })
    if (!customer) {
      return res.status(400).json({ message: "Invalid customer ID" })
    }

    const product = await prisma.product.findUnique({
      where: { id: product_id },
    })
    if (!product) {
      return res.status(400).json({ message: "Invalid product ID" })
    }

    const location = await prisma.location.findUnique({
      where: { id: location_id },
    })
    if (!location) {
      return res.status(400).json({ message: "Invalid location ID" })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: {
        customer: { connect: { id: customer_id } },
        product: { connect: { id: product_id } },
        location: { connect: { id: location_id } },
        quantity,
      },
    })

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Order updated successfully",
      data: updatedOrder,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message,
    })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params

    const order = await prisma.order.delete({
      where: { id: parseInt(id) }
    })

    if (!order) {
      return res.status(404).json({
        code: 404,
        message: `Order with ID '${id}' not found`
      })
    }

    res.status(200).json({ 
      code: 200,
      message: 'Order deleted successfully',
      data: order
    })
  } catch (error) {
    res.status(500).json({ 
      code: 500,
      message: error.message
    })
  }
}
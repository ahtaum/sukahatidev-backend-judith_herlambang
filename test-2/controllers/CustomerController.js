import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getCustomers = async (req, res) => {
    try {
        let customers = await prisma.customer.findMany({
            include: {
                orders: true
            }
        })

        res.status(200).json({ 
            code: 200,
            message: "OK",
            total: customers.length,
            data: customers
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const getCustomer = async (req, res) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                orders: true
            }
        })

        res.status(200).json({ 
            code: 200,
            message: "OK",
            data: customer
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const getCustomerPercentage = async (req, res) => {
    try {
      const customerId = parseInt(req.params.id)
  
      const registeredCustomersCount = await prisma.customer.count()
      const orderingCustomersCount = await prisma.customer.count({
        where: {
          orders: {
            some: {},
          },
        },
      })
  
      const registeredPercentage = (registeredCustomersCount / orderingCustomersCount) * 100
      const orderingPercentage = (orderingCustomersCount / registeredCustomersCount) * 100
  
      const customer = await prisma.customer.findUnique({
        where: {
          id: customerId,
        },
        include: {
          orders: true,
        },
      })
  
      res.status(200).json({
        code: 200,
        status: 'success',
        data: {
          registeredPercentage,
          orderingPercentage,
          customer,
        },
      })
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message,
      })
    }
}

export const getTopCustomersByAveragePurchase = async (req, res) => {
  try {
    const topCustomers = await prisma.customer.findMany({
      include: {
        orders: {
          select: {
            quantity: true,
          },
        },
      },
    })

    const customersWithAveragePurchase = topCustomers.map((customer) => {
      const totalOrders = customer.orders.length
      const totalQuantity = customer.orders.reduce((sum, order) => sum + order.quantity, 0)
      const averagePurchase = totalQuantity / totalOrders || 0

      return {
        ...customer,
        averagePurchase,
      }
    })

    const sortedCustomers = customersWithAveragePurchase.sort((a, b) => b.averagePurchase - a.averagePurchase)

    res.status(200).json({
      code: 200,
      status: 'success',
      data: sortedCustomers,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: error.message,
    })
  }
}

export const getTopCustomersByOrderQuantity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5

    const topCustomers = await prisma.customer.findMany({
      include: {
        orders: true,
      },
    })

    const sortedCustomers = topCustomers.sort((a, b) => {
      const avgA = calculateAverageOrderQuantity(a)
      const avgB = calculateAverageOrderQuantity(b)
      return avgB - avgA
    })

    const customerData = sortedCustomers.slice(0, limit).map((customer) => {
      return {
        customerId: customer.id,
        customerName: customer.name,
        averageOrderQuantity: calculateAverageOrderQuantity(customer),
      }
    })

    res.status(200).json({
      code: 200,
      status: 'success',
      data: customerData,
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: error.message,
    })
  }
}
// Helper function to calculate average order quantity
const calculateAverageOrderQuantity = (customer) => {
  const { orders } = customer
  if (orders.length === 0) {
    return 0
  }
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0)
  return totalQuantity / orders.length
}
   
export const addCustomer = async (req, res) => {
    try {
        await body("name").notEmpty().withMessage("name required").run(req)
    
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name } = req.body

        const customer = await prisma.customer.create({
            data: {
                name,
            }
        })

        res.status(200).json({ 
            code: 200,
            message: "Data Customer Added!",
            data: customer
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const updateCustomer = async (req, res) => {
    try {
        await body("name").notEmpty().withMessage("name required").run(req)
    
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { id } = req.params
        const { name } = req.body

        let customer = await prisma.customer.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
            }
        })

        res.status(200).json({ 
            code: 200,
            message: "Data Customer Updated!",
            data: customer
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const idCustomer = parseInt(req.params.id)
        const customer = await prisma.customer.findUnique({
            where: { id: idCustomer }
        })

        if (!customer) {
            return res.status(404).json({
                status: "NOT FOUND",
                code: 404,
                message: `Customer with ID ${idCustomer} not found`,
            })
        }

        await prisma.customer.delete({
            where: { id: idCustomer }
        })

        return res.status(200).json({
            status: "OK",
            code: 200,
            message: "Data Customer Deleted!",
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}
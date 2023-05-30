import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
          include: {
            orders: true
          }
        })

        res.status(200).json({ 
            code: 200,
            message: 'OK',
            total: products.length,
            data: products
        })
    } catch (error) {
        res.status(500).json({ 
            code: 500,
            message: error.message
        })
    }
}

export const getProduct = async (req, res) => {
    try {
      const { id } = req.params
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          orders: true
        }
      })
  
      if (!product) {
        return res.status(404).json({
          code: 404,
          message: `Product with ID '${id}' not found`
        })
      }
  
      res.status(200).json({ 
        code: 200,
        message: 'OK',
        data: product
      })
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error.message
      })
    }
}

export const addProduct = async (req, res) => {
    try {
      await body('name').notEmpty().withMessage('Name required').run(req)
      await body('price').notEmpty().withMessage('Price required').isFloat().withMessage('Price must be a number').run(req)
  
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
  
      const { name, price } = req.body
  
      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
        }
      })
  
      res.status(200).json({ 
        code: 200,
        message: 'Product added successfully',
        data: product
      })
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error.message
      })
    }
}

export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params
  
      const product = await prisma.product.delete({
        where: { id: parseInt(id) }
      })
  
      if (!product) {
        return res.status(404).json({
          code: 404,
          message: `Product with ID '${id}' not found`
        })
      }
  
      res.status(200).json({ 
        code: 200,
        message: 'Product deleted successfully',
        data: product
      })
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error.message
      })
    }
}
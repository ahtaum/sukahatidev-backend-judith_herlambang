import { validationResult, body } from "express-validator"
import pkg from "@prisma/client"

const { PrismaClient } = pkg
const prisma = new PrismaClient()

export const getCustomers = async (req, res) => {
    try {
        let customers = await prisma.customer.findMany({
            include: {
                brands: true
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
                brands: true
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

export const addCustomer = async (req, res) => {
    try {
        await body("name").notEmpty().withMessage("name required").run(req)
        await body("city").notEmpty().withMessage("City required").run(req)
        await body("phone").notEmpty().withMessage("Phone required").isNumeric().withMessage("Phone number must be numeric").run(req)
    
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, city, phone } = req.body

        const customer = await prisma.customer.create({
            data: {
                name,
                city,
                phone
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
        await body("city").notEmpty().withMessage("City required").run(req)
        await body("phone").notEmpty().withMessage("Phone required").isNumeric().withMessage("Phone number must be numeric").run(req)
    
        const errors = validationResult(req)
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { id } = req.params
        const { name, city, phone } = req.body

        let customer = await prisma.customer.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                city,
                phone
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
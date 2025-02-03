import { Request, Response } from 'express'
import { OrderService } from './order.service'
import Product from '../product/product.model'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, products } = req.body

    // Check if user exists
    const userExists = await User.findById(user)
    if (!userExists) {
      throw new AppError(
        404,
        'User not found',
        'User does not exist in our records'
      )
    }

    let totalPrice = 0

    // Validate products and calculate total price
    for (const item of products) {
      const product = await Product.findById(item.product)

      if (!product) {
        throw new AppError(
          404,
          'Product not found',
          `Product with ID ${item.product} does not exist in our records`
        )
      }

      // Validate stock availability
      if (product.quantity < item.quantity) {
        throw new AppError(
          400,
          'Out of stock',
          `Product ${product.name} is out of stock`
        )
      }

      // Calculate total price for this product
      totalPrice += product.price * item.quantity + 2
      item.price = product.price // Save the price at the time of the order
    }

    // Create order
    const orderData = { user, products, totalPrice }
    const result = await OrderService.createOrder(orderData , req.ip!)

    // Update product quantities and inStock status
    for (const item of products) {
      const updatedProduct = await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } },
        { new: true }
      )

      if (updatedProduct?.quantity === 0) {
        await Product.findByIdAndUpdate(
          item.product,
          { inStock: false },
          { new: true }
        )
      }
    }

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Order created successfully.',
      data: result,
    })
  } catch (error: any) {
    // Handle errors
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
      stack: error.stack,
    })
  }
}

const getOrders = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await OrderService.getOrders(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order list retrieved successfully.',
    data: result,
  })
})
const getOrdersById = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await OrderService.getOrdersById(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order list retrieved successfully.',
    data: result,
  })
})
const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order list retrieved successfully.',
    data: result,
  })
})

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.calculateRevenueOrders()

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result[0],
    })
  } catch (error: any) {
    // Handle errors
    res.status(404).json({
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error,
      stack: error.stack,
    })
  }
}

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Payment info retrieved successfully.',
    data: order,
  })
})

export const OrderController = {
  createOrder,
  getOrders,
  getOrdersById,
  getAllOrders,
  calculateRevenue,
  verifyPayment,
}

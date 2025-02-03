import { Request, Response } from 'express'
import { ProductService } from './product.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { log } from 'console'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.file, req.body)

  sendResponse(res, {
    success: true,
    message: 'Product created successfully',
    statusCode: 201,
    data: result,
  })
})

// Get all products
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product list retrieved successfully.',
    data: result,
  })
})

// Get a single product by ID
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId
  const result = await ProductService.getSingleProduct(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully.',
    data: result,
  })
})

// Update an existing product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId
  const body = req.body

  const result = await ProductService.updateProduct(id, req.file, body)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Product updated successfully.',
    data: result,
  })
})

// Delete a product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId
  await ProductService.deleteProduct(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully.',
    data: {},
  })
})

// Export all the controller methods for use in routes
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}

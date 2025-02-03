import { NextFunction, Request, Response, Router } from 'express'
import { ProductController } from './product.controller'
import { upload } from '../../utils/hostImage'

const productRoute = Router()
// product all routes
productRoute.post(
  '/create-product',

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },

  ProductController.createProduct
)
productRoute.get('/', ProductController.getAllProducts)
productRoute.get('/:productId', ProductController.getSingleProduct)
productRoute.put(
  '/:productId',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  ProductController.updateProduct
)
productRoute.delete('/:productId', ProductController.deleteProduct)

export default productRoute

import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()


router.get('/verify', OrderController.verifyPayment)
router.post('/create-order', OrderController.createOrder)
router.get('/', OrderController.getAllOrders)
router.get('/:id', OrderController.getOrders)
router.get('/order/:id', OrderController.getOrdersById)
router.delete('/:id', OrderController.deleteOrder)


export const orderRoutes  = router;

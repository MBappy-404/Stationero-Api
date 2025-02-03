import express, { Request, Response } from 'express'
import { authRoutes } from './module/Auth/auth.route'
import { AdminRoutes } from './module/Admin/admin.route'
import globalErrorHandler from './middleware/globalError'
import { UserRoutes } from './module/User/user.route'
import productRoute from './module/product/product.route'
import { orderRoutes } from './module/order/order.route'
import cors from 'cors'

const app = express()

// middleware
app.use(express.json())
app.use(
  cors({
    origin: ['https://stationero-shop.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
)

//  api routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoute)
app.use('/api/admin', AdminRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Stationery Shop Api is running')
})

app.use(globalErrorHandler)

export default app

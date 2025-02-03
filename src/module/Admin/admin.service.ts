import AppError from '../../errors/AppError'
import Order from '../order/order.model'
import { IProduct } from '../product/product.interface'

import { User } from '../User/user.model'

const blockUserByAdmin = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(
      404,
      'User not found',
      'User does not exist in our records'
    )
  }

  const setStatus = user?.status === 'active' ? 'deactive' : 'active'

  const result = await User.findByIdAndUpdate(
    id,
    { status: setStatus },
    { new: true }
  )
  return result
}
const shippingProduct = async (id: string, payload: Partial<IProduct>) => {
  const order = await Order.findById(id)

  if (!order) {
    throw new AppError(
      404,
      'Order not found',
      'Order does not exist in our records'
    )
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { status: payload  },
    { new: true }
  )
  return result
}

// const deleteBlogByAdmin = async (id: string) => {
//   const result = await Blog.findByIdAndDelete(id)
//   return result
// }

export const AdminService = {
  blockUserByAdmin,
  shippingProduct
  // deleteBlogByAdmin,
}

import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminService } from './admin.service'

const blockUserByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params

  await AdminService.blockUserByAdmin(userId)

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  })
})
const shippingProduct = catchAsync(async (req, res) => {
  const { orderId } = req.params

  await AdminService.shippingProduct(orderId, req?.body?.status)

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  })
})

// const deleteBlogByAdmin = catchAsync(async (req, res) => {
//   const { id } = req.params
//   await AdminService.deleteBlogByAdmin(id)

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Blog deleted successfully',
//   })
// })

export const AdminController = {
  blockUserByAdmin,
  shippingProduct,
  // deleteBlogByAdmin,
}

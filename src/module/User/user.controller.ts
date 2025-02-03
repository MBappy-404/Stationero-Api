import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body)

  sendResponse(res, {
    success: true,
    message: 'User registered  successfully',
    statusCode: 201,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      status: result.status
    },
  })
})

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers()

  sendResponse(res, {
    success: true,
    message: 'Users fetched successfully',
    statusCode: 200,
    data: result,
  })
})
const getUser = catchAsync(async (req, res) => {
  const result = await UserService.getUser(req.params.id)

  sendResponse(res, {
    success: true,
    message: 'Users fetched successfully',
    statusCode: 200,
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
  })
})

export const UserController = {
  createUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser
}

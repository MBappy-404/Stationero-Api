import AppError from '../../errors/AppError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload?.email })

  if (isUserExist) {
    throw new AppError(
      400,
      'User already exist',
      'User already exist in our records'
    )
  }

  const result = await User.create(payload)
  return result
}
const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

const getUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, payload: IUser) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(
      404,
      'User not found',
      'User does not exist in our records'
    )
  }

  if (user?.status === 'deactive') {
    throw new AppError(401, 'Failed to update', 'This user is already deactive')
  }

  const result = await User.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
}

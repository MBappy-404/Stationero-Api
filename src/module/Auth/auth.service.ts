import config from '../../config'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new AppError(
      401,
      'Invalid credentials',
      'The email you entered does not match our records.',
    )
  }

  const isUserBlocked = user.status === 'deactive'

  if (isUserBlocked) {
    throw new AppError(401, 'Unauthorized','This user is deactive')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new AppError(
      401,
      'Invalid credentials',
      'The password you entered does not match our records.',
    )
  }

  //create token and sent to the  client
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '1d',
  })

  return {
    token,
  }
}

export const AuthService = {
  login,
}

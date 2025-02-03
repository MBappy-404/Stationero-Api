import mongoose from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone:{
      type: String,
      default: ""
    },
    shippingAddress: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'deactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, 10)
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const User = mongoose.model<IUser>('User', userSchema)

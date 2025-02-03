import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthController.login
)

export const authRoutes = router

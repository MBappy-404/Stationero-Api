import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
 

const router = express.Router()

router.post('/create-user', validateRequest(UserValidation.createUserValidation), UserController.createUser) 
router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getUser)
router.put('/:id', UserController.updateUser) 
router.delete('/:id', UserController.deleteUser)

export const UserRoutes = router

import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'



const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Login successful',
    data: result,
  })
})

export const AuthController = {
 
  login,
}

import { auth } from '../firebase/firebase-admin'
import { AuthController } from '~/server/interfaces/controllers/auth.controller'
import { LoginUsecase } from '~/server/application/usecases/auth/login.usecase'
import { AuthRepository } from '../firebase/firebase-auth/auth.repository'

const taskRepository = new AuthRepository(auth)
const loginUsecase = new LoginUsecase(taskRepository)
const authController = new AuthController(loginUsecase)

export default authController
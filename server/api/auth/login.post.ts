import { AuthRepository } from '~/server/repositories/auth/auth.repository'
import { LoginUseCase } from '~/server/usecases/auth/login.usecase'
import { auth } from '~/server/libs/firebase-admin'

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  const authRepo = new AuthRepository(auth)
  const usecase = new LoginUseCase(authRepo)
  const result = await usecase.do(body.idToken)
  setCookie(event, 'idToken', body.idToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,  // 1日間有効
    path: '/',
  })
})

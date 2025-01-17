import { AuthRepository } from '~/server/infrastructure/firebase-auth/auth.repository'
import { LoginUsecase } from '~/server/application/usecases/auth/login.usecase'
import { auth } from '~/server/infrastructure/firebase-auth/firebase-admin'

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  const authRepo = new AuthRepository(auth)
  const usecase = new LoginUsecase(authRepo)
  await usecase.execute(body.idToken)
  setCookie(event, 'idToken', body.idToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
})

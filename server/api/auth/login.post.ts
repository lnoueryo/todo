import { AuthRepository } from '~/server/infrastructure/auth/auth.repository'
import { LoginInteractor } from '~/server/usecases/interactors/auth/login.interactor'
import { auth } from '~/server/libs/firebase-admin'

export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  const authRepo = new AuthRepository(auth)
  const interactor = new LoginInteractor(authRepo)
  const result = await interactor.execute(body.idToken)
  setCookie(event, 'idToken', body.idToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,  // 1日間有効
    path: '/',
  })
})

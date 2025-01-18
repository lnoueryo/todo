import { getCookie, createError, H3Event } from 'h3'
import type { User } from '~/server/domain/entities/user'
import { auth } from '~/server/infrastructure/firebase/firebase-admin'
import { AuthRepository } from '~/server/infrastructure/firebase/firebase-auth/auth.repository'
import { httpErrorHandler } from '~/server/interfaces/shared/http-error-handler'

export const httpAuth = <T>(handler: (event: H3Event, user: User) => Promise<T>) => {
  return (event: H3Event) => {
    const idToken = getCookie(event, 'idToken')
    if (!idToken) {
      throw createError({
        statusCode: 401,
        message: 'id token is required',
      })
    }
    return httpErrorHandler(async () => {
      const authRepo = new AuthRepository(auth)
      const decodedToken = await authRepo.verifyIdToken(idToken)
      return handler(event, decodedToken)
    })
  }
}

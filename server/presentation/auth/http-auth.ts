import { getCookie, createError, H3Event } from 'h3'
import { User } from '~/server/types/user'
import { auth } from '~/server/libs/firebase-admin'
import { AuthRepository } from '~/server/infrastructure/auth/auth.repository'
import { ServiceError } from '~/server/infrastructure/shared/error-code'
import { getHttpStatus } from '../shared/http-status-mapper'

export const httpAuth = (handler: (event: H3Event, user: User) => any) => {
  return async (event: H3Event) => {
    const idToken = getCookie(event, 'idToken')
    if (!idToken) {
      throw createError({
        statusCode: 401,
        message: 'error',
      })
    }
    try {
      const authRepo = new AuthRepository(auth)
      const decodedToken = await authRepo.verifyIdToken(idToken)
      return await handler(event, decodedToken)
    } catch (error) {
      if (error instanceof ServiceError) {
        throw createError({
          statusCode: getHttpStatus(error.getCommonErrorCode()),
          message: error.message,
        })
      }
      throw error
    }
  }
}

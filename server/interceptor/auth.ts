import type { H3Event } from 'h3'
import { auth } from '~/server/libs/firebase-admin'
import { AuthRepository } from '~/server/domain/repositories/auth/auth.repository'
import type { User } from '~/server/types/user'

export const AuthDecorator = (handler: (event: H3Event, user: User) => any) => {
  return async (event: H3Event) => {
    const idToken = getCookie(event, 'idToken')
    if (!idToken) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: No ID token provided' })
    }
    let decodedToken
    try {
      const authRepo = new AuthRepository(auth)
      decodedToken = await authRepo.verifyIdToken(idToken)
    } catch (error) {
      console.log(error)
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid or expired token' })
    }
    return await handler(event, decodedToken)
  }
}

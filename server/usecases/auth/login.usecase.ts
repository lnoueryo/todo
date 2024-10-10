import { AuthRepository } from '~/server/repositories/auth/auth.repository'

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}
  public async do(idToken: string): Promise<{
    id: string
    email: string
  }> {
    try {
      return await this.authRepo.verifyIdToken(idToken)
    } catch (error) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid or expired token' })
    }
  }
}

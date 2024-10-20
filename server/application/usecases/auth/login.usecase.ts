import { AuthRepository } from '~/server/infrastructure/auth/auth.repository'

export class LoginUsecase {
  constructor(private authRepo: AuthRepository) {}
  public async execute(idToken: string): Promise<{
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

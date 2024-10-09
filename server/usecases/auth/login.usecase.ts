import { AuthRepository } from '~/server/repositories/auth/auth.repository'

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}
  public async do(idToken: string): Promise<{
    id: string
    email: string
  }> {
    return await this.authRepo.verifyIdToken(idToken)
  }
}

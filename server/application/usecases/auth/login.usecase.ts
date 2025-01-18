import { CommonErrorCode, DomainError } from '~/server/domain/exceptions/domain-error.interface'
import { AuthRepository } from '~/server/infrastructure/firebase/firebase-auth/auth.repository'
import { UsecaseResult } from '../../shared/usecase-result'

export class LoginUsecase {
  constructor(private authRepo: AuthRepository) {}
  public async execute(idToken: string): Promise<
    UsecaseResult<
      {
        user: {
          id: string
          email: string
        }
      },
      CommonErrorCode
    >
  > {
    try {
      const user = await this.authRepo.verifyIdToken(idToken)
      return {
        success: {
          user
        }
      }
    } catch (error) {
      console.error(error)
      if (error instanceof DomainError) {
        throw {
          error: {
            type: error.getCommonErrorCode(),
            message: error.message,
          }
        }
      }
      return {
        error: {
          type: 'internal',
          message: 'An unexpected error occurred',
        }
      }
    }
  }
}

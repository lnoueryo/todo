import { CommonErrorCode, DomainError } from '~/server/domain/exceptions/domain-error.interface'
import { AuthRepository } from '~/server/infrastructure/firebase-auth/auth.repository'
import { UsecaseResult } from '../../shared/usecase-result'

export class LoginUsecase {
  constructor(private authRepo: AuthRepository) {}
  public async execute(idToken: string): Promise<
    UsecaseResult<
      {
        id: string
        email: string
      },
      CommonErrorCode
    >
  > {
    try {
      const result = await this.authRepo.verifyIdToken(idToken)
      return {
        success: result
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

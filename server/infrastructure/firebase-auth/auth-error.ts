import { CommonErrorCode, DomainError } from '~/server/domain/exceptions/domain-error.interface'

export class FirebaseAuthError extends DomainError {
  constructor(public code: string, public message: string) {
    super(message)
  }

  getCommonErrorCode() {
    const firebaseAuthCommonErrorMapper: Record<string, CommonErrorCode> = {
      'auth/email-already-exists': 'validation',
      'auth/id-token-expired': 'unauthorized',
      'auth/id-token-revoked': 'permission-denied',
      'auth/insufficient-permission': 'forbidden',
      'auth/internal-error': 'internal',
      'auth/invalid-argument': 'validation',
      'auth/invalid-email': 'validation',
      'auth/invalid-password': 'validation',
      'auth/user-not-found': 'not-found',
      'auth/too-many-requests': 'too-many-requests',
    }
    return firebaseAuthCommonErrorMapper[this.code]
  }
}
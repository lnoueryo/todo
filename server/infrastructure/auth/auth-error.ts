import { CommonErrorCode, ServiceError } from "../shared/error-code"

export const firebaseAuthErrorCodeToHttpStatus = {
  'auth/email-already-exists': 409,
  'auth/id-token-expired': 401,
  'auth/id-token-revoked': 401,
  'auth/insufficient-permission': 403,
  'auth/internal-error': 500,
  'auth/invalid-argument': 400,
  'auth/invalid-email': 400,
  'auth/invalid-password': 400,
  'auth/user-not-found': 404,
  'auth/too-many-requests': 429,
}

export class FirebaseAuthError extends ServiceError {
  constructor(public code: string, public message: string) {
    super(message)
  }

  getCommonErrorCode() {
    const firebaseAuthCommonErrorMapper: Record<string, CommonErrorCode> = {
      'auth/email-already-exists': 'validation',
      'auth/id-token-expired': 'unauthorize',
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
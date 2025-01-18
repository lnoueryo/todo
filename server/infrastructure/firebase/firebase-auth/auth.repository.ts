import type { IAuthRepository } from '../../../domain/repositories/auth.repository'
import admin from 'firebase-admin'
import * as auth from 'firebase-admin/auth'
import { FirebaseAuthError } from './auth-error'

export class AuthRepository implements IAuthRepository  {
  constructor(private auth: admin.auth.Auth) {}
  async verifyIdToken(idToken: string): Promise<{
    id: string,
    email: string,
  }> {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken)
      return {
        id: decodedToken.uid,
        email: decodedToken.email as string
      }
    } catch (error) {
      if (error instanceof auth.FirebaseAuthError) {
        throw new FirebaseAuthError(error.code, error.message)
      }
      throw error
    }
  }
}

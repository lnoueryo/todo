import type { IAuthRepository } from './interface'
import admin from 'firebase-admin'

export class AuthRepository implements IAuthRepository  {
  constructor(private auth: admin.auth.Auth) {}
  async verifyIdToken(idToken: string): Promise<{
    id: string,
    email: string,
  }> {
    const decodedToken = await this.auth.verifyIdToken(idToken)
    return {
      id: decodedToken.uid,
      email: decodedToken.email as string
    }
  }
}

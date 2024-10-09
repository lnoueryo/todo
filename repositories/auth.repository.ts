import type { Auth } from 'firebase/auth'
import type { ApiClient } from '~/plugins/api/api-client'
import { signInWithEmailAndPassword } from 'firebase/auth'

type IAuthRepository = {
  login: (params: {
    email: string
    password: string
  }) => Promise<string>
}

export default class AuthRepository implements IAuthRepository {
  constructor(private api: ApiClient, private firebase: Auth) {}
  async login(params: {
    email: string
    password: string
  }): Promise<string> {
    const userCredential = await signInWithEmailAndPassword(
      this.firebase,
      params.email,
      params.password,
    )
    const user = userCredential.user
    return await user.getIdToken()
  }
  async setCookie(params: { idToken: string }): Promise<void> {
    return await this.api.post('/api/auth/login', params)
  }
}

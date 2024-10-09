export type IAuthRepository = {
  verifyIdToken(idToken: string): Promise<{
    id: string,
    email: string,
  }>
}
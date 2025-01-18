import { LoginUsecase } from '~/server/application/usecases/auth/login.usecase'
import { H3Event } from 'h3'
import { getHttpStatus } from '../shared/http-status-mapper'

export class AuthController {
  constructor(private loginUsecase: LoginUsecase) {}
  async login(event: H3Event) {
    const body = await readBody(event)
    const result = await this.loginUsecase.execute(body.idToken)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    return setCookie(event, 'idToken', body.idToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: '/',
    })
  }
}
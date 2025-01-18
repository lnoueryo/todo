import authController from '~/server/infrastructure/http/auth.http'

export default defineEventHandler<void>(authController.login.bind(authController))

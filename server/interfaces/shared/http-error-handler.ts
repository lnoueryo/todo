import { ValidationError } from "~/server/application/shared/validation-error"
import { getHttpStatus } from "./http-status-mapper"
import { DomainError } from "~/server/domain/exceptions/domain-error.interface"

export const httpErrorHandler = async (handler: any) => {
  try {
    return await handler()
  } catch (error) {
    if (error instanceof ValidationError) {
      throw createError({
        statusCode: getHttpStatus(error.code),
        message: error.message
      })
    }
    if (error instanceof DomainError) {
      throw createError({
        statusCode: getHttpStatus(error.getCommonErrorCode()),
        message: error.message
      })
    }
    throw error
  }
}
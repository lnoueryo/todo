import { CommonErrorCode } from "~/server/domain/exceptions/domain-error.interface"

export type UsecaseResult<T, U extends CommonErrorCode> =
  | {
      error: {
        type: U
        message: string
      }
    }
  | { success: T }
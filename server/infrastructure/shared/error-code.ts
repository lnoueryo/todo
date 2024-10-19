import type { CommonErrorCode } from '~/server/types'

export abstract class ServiceError extends Error {
  abstract getCommonErrorCode(): CommonErrorCode
}
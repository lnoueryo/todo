import { CommonErrorCode } from '~/server/types'


export class ValidationError extends Error {
  public code: Extract<CommonErrorCode, 'validation'> = 'validation'
  constructor(public message: string) {
    super(message)
  }
}
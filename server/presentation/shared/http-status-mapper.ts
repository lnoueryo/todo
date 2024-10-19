import { CommonErrorCode } from '~/server/types'


export function getHttpStatus(code: CommonErrorCode): number {
  const commonErrorCodeToHttpStatusMap: Record<CommonErrorCode, number> = {
    'validation': 400,
    'unauthorize': 401,
    'permission-denied': 403,
    'forbidden': 403,
    'not-found': 404,
    'too-many-requests': 429,
    'internal': 500,
  }
  return commonErrorCodeToHttpStatusMap[code] || 500
}
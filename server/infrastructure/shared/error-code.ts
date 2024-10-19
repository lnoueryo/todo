export type CommonErrorCode = 'validation' | 'unauthorize' | 'permission-denied' | 'forbidden' | 'internal' | 'not-found' | 'too-many-requests'

export abstract class ServiceError extends Error {
  abstract getCommonErrorCode(): CommonErrorCode
}
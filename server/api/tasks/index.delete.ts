import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase/firebase-admin'
import { DeleteTaskRequest } from '~/server/interfaces/dto/task/request/delete-task-request'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskResponse } from '~/server/interfaces/dto/task/response/task-response.dto'
import { getHttpStatus } from '~/server/interfaces/shared/http-status-mapper'
import { FireStoreTransactionManager } from '~/server/infrastructure/firebase/firestore/transaction-manager.repository'

export default defineEventHandler<
  Promise<
  {
    tasks: {
      id: string
      content: string
      active: boolean
      order: number
    }[]
  }
  >
>(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskRequest = new DeleteTaskRequest(body)
    const transactionManager = new FireStoreTransactionManager(fireStore)
    const usecase = new DeleteTaskUsecase(transactionManager)
    const result = await usecase.execute(deleteTaskRequest.ids, user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 202)
    return new TaskResponse(result.success.tasks).responseUserTasks()
  })
)

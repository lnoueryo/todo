import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase-auth/firebase-admin'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { GetTaskResponse } from '~/server/interfaces/dto/task/response/get-task-response.dto'
import { getHttpStatus } from '~/server/interfaces/shared/http-status-mapper'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new GetTaskUsecase(taskRepository)
    const result = await usecase.execute(user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 201)
    return new GetTaskResponse(result.success.tasks)
  })
)

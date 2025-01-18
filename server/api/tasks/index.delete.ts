import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase-auth/firebase-admin'
import { DeleteTaskRequest } from '~/server/interfaces/dto/task/request/delete-task-request'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { GetTaskResponse } from '~/server/interfaces/dto/task/response/get-task-response.dto'
import { getHttpStatus } from '~/server/interfaces/shared/http-status-mapper'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskRequest = new DeleteTaskRequest(body)
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new DeleteTaskUsecase(taskRepository)
    const result = await usecase.execute(deleteTaskRequest.ids, user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 202)
    return new GetTaskResponse(result.success.tasks)
  })
)

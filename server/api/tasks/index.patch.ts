import { TaskRepository } from '~/server/infrastructure/firebase/firestore/task.repository'
import { fireStore } from '~/server/infrastructure/firebase/firebase-admin'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { UpdateTaskRequest } from '~/server/interfaces/dto/task/request/update-task-request.dto'
import { UpdateTaskUsecase } from '~/server/application/usecases/task/update-task.usecase'
import { GetTaskResponse } from '~/server/interfaces/dto/task/response/get-task-response.dto'
import { getHttpStatus } from '~/server/interfaces/shared/http-status-mapper'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const updateTaskRequest = new UpdateTaskRequest(body)
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new UpdateTaskUsecase(taskRepository)
    const result = await usecase.execute(updateTaskRequest.tasks, user)
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

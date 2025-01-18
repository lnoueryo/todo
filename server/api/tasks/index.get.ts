import { TaskRepository } from '~/server/infrastructure/firebase/firestore/task.repository'
import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase/firebase-admin'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskResponse } from '~/server/interfaces/dto/task/response/task-response.dto'
import { getHttpStatus } from '~/server/interfaces/shared/http-status-mapper'

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
    return new TaskResponse(result.success.tasks).responseUserTasks()
  })
)

import { TaskRepository } from '~/server/infrastructure/firebase/firestore/task.repository'
import { CreateTaskUsecase } from '~/server/application/usecases/task/create-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase/firebase-admin'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
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
    const body = await readBody(event)
    const createTaskInput = new CreateTaskRequest(body)
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new CreateTaskUsecase(taskRepository)
    const result = await usecase.execute(createTaskInput.task, user)
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

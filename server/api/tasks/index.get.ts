import { TaskRepository } from '~/server/repositories/task/task.repository'
import { GetTaskUseCase } from '~/server/usecases/task/get-task.usecase'
import { GetTaskResponse } from '~/server/dto/task/response/get-task.response'
import { fireStore } from '~/server/libs/firebase-admin'
import { AuthDecorator } from '~/server/interceptor/auth'

export default defineEventHandler(
  AuthDecorator(async(event, user) => {
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new GetTaskUseCase(taskRepository)
    const result = await usecase.do(user)
    return new GetTaskResponse(result)
  })
)

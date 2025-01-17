import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase-auth/firebase-admin'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskService } from '~/server/domain/services/task.service'
import { GetTaskResponse } from '~/server/interfaces/dto/task/response/get-task-response.dto'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    console.log(user)
    const taskRepository = new TaskRepository(fireStore)
    const taskService = new TaskService(taskRepository)
    const usecase = new GetTaskUsecase(taskService)
    const result = await usecase.execute(user)
    return new GetTaskResponse(result)
  })
)

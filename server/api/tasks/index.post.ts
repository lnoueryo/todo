import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { CreateTaskUsecase } from '~/server/application/usecases/task/create-task.usecase'
import { fireStore } from '~/server/infrastructure/firebase-auth/firebase-admin'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskService } from '~/server/domain/services/task.service'
import { GetTaskResponse } from '~/server/interfaces/dto/task/response/get-task-response.dto'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const createTaskInput = new CreateTaskRequest(body)
    const taskRepository = new TaskRepository(fireStore)
    const taskService = new TaskService(taskRepository)
    const usecase = new CreateTaskUsecase(taskService)
    const result = await usecase.execute(createTaskInput, user)
    setResponseStatus(event, 201)
    return new GetTaskResponse(result)
  })
)

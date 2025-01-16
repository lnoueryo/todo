import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { CreateTaskUsecase } from '~/server/application/usecases/task/create-task.usecase'
import { fireStore } from '~/server/infrastructure/auth/firebase-admin'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskService } from '~/server/domain/services/task.service'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const createTaskInput = new CreateTaskRequest(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const taskService = new TaskService(taskRepository)
    const usecase = new CreateTaskUsecase(taskService)
    const result = await usecase.execute(createTaskInput)
    setResponseStatus(event, 201)
    return { tasks: result }
  })
)

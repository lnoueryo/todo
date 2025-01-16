import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { fireStore } from '~/server/infrastructure/auth/firebase-admin'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { UpdateTaskRequest } from '~/server/interfaces/dto/task/request/update-task-request.dto'
import { UpdateTaskUsecase } from '~/server/application/usecases/task/update-task.usecase'
import { TaskService } from '~/server/domain/services/task.service'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const updateTaskRequest = UpdateTaskRequest.fromRequestArray(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const taskService = new TaskService(taskRepository)
    const usecase = new UpdateTaskUsecase(taskService)
    const result = await usecase.execute(updateTaskRequest)
    setResponseStatus(event, 202)
    return { tasks: result }
  })
)

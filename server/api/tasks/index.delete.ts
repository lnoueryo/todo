import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'
import { fireStore } from '~/server/infrastructure/auth/firebase-admin'
import { DeleteTaskRequest } from '~/server/interfaces/dto/task/request/delete-task-request'
import { httpAuth } from '~/server/interfaces/auth/http-auth'
import { TaskService } from '~/server/domain/services/task.service'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskRequest = new DeleteTaskRequest(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const taskService = new TaskService(taskRepository)
    const usecase = new DeleteTaskUsecase(taskService)
    const result = await usecase.execute(deleteTaskRequest)
    setResponseStatus(event, 202)
    return { tasks: result }
  })
)

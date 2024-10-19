import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'
import { fireStore } from '~/server/libs/firebase-admin'
import { DeleteTaskInputDTO } from '~/server/application/dto/task/input/delete-task-input'
import { httpAuth } from '~/server/presentation/auth/http-auth'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskInput = new DeleteTaskInputDTO(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new DeleteTaskUsecase(taskRepository)
    const result = await usecase.execute(deleteTaskInput)
    setResponseStatus(event, 202)
    return { tasks: result }
  })
)

import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { fireStore } from '~/server/libs/firebase-admin'
import { httpAuth } from '~/server/presentation/auth/http-auth'
import { UpdateTaskInputDTO } from '~/server/application/dto/task/input/update-task-input.dto'
import { UpdateTaskUsecase } from '~/server/application/usecases/task/update-task.usecase'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const updateTaskInput = UpdateTaskInputDTO.fromRequestArray(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new UpdateTaskUsecase(taskRepository)
    const result = await usecase.execute(updateTaskInput)
    setResponseStatus(event, 202)
    return { tasks: result}
  })
)

import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { fireStore } from '~/server/libs/firebase-admin'
import { httpAuth } from '~/server/presentation/auth/http-auth'
import { UpdateTaskInputDTO } from '~/server/usecases/dto/task/input/update-task-input.dto'
import { UpdateTaskInteractor } from '~/server/usecases/interactors/task/update-task.interactor'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const updateTaskInput = UpdateTaskInputDTO.fromRequestArray(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new UpdateTaskInteractor(taskRepository)
    const result = await interactor.execute(updateTaskInput)
    setResponseStatus(event, 202)
    return { tasks: result}
  })
)

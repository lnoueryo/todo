import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { DeleteTaskInteractor } from '~/server/usecases/interactors/task/delete-task.interactor'
import { fireStore } from '~/server/libs/firebase-admin'
import { DeleteTaskInputDTO } from '~/server/usecases/dto/task/input/delete-task-input'
import { httpAuth } from '~/server/presentation/auth/http-auth'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskInput = new DeleteTaskInputDTO(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new DeleteTaskInteractor(taskRepository)
    const result = await interactor.execute(deleteTaskInput)
    setResponseStatus(event, 202)
    return { tasks: result}
  })
)

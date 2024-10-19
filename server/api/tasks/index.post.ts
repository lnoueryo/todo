import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { CreateTaskInteractor } from '~/server/usecases/interactors/task/create-task.interactor'
import { fireStore } from '~/server/libs/firebase-admin'
import { CreateTaskInputDTO } from '~/server/usecases/dto/task/input/create-task-input.dto'
import { httpAuth } from '~/server/presentation/auth/http-auth'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const body = await readBody(event)
    const createTaskInput = new CreateTaskInputDTO(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new CreateTaskInteractor(taskRepository)
    const result = await interactor.execute(createTaskInput)
    setResponseStatus(event, 201)
    return { tasks: result}
  })
)

import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { CreateTaskInteractor } from '~/server/usecases/interactors/task/create-task.interactor'
import { GetTaskPresenter } from '~/server/interfaces/presenters/task/get-task.presenter'
import { fireStore } from '~/server/libs/firebase-admin'
import { AuthDecorator } from '~/server/interceptor/auth'
import { CreateTaskInputDTO } from '~/server/usecases/dto/task/input/create-task-input.dto'

export default defineEventHandler(
  AuthDecorator(async(event, user) => {
    const body = await readBody(event)
    const createTaskInput = new CreateTaskInputDTO(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new CreateTaskInteractor(taskRepository)
    const result = await interactor.execute(createTaskInput)
    setResponseStatus(event, 201)
    return GetTaskPresenter.present(result)
  })
)

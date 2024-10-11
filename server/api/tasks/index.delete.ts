import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { DeleteTaskInteractor } from '~/server/usecases/interactors/task/delete-task.interactor'
import { GetTaskPresenter } from '~/server/interfaces/presenters/task/get-task.presenter'
import { fireStore } from '~/server/libs/firebase-admin'
import { AuthDecorator } from '~/server/interceptor/auth'
import { DeleteTaskInputDTO } from '~/server/usecases/dto/task/input/delete-task-input'

export default defineEventHandler(
  AuthDecorator(async(event, user) => {
    const body = await readBody(event)
    const deleteTaskInput = new DeleteTaskInputDTO(body.id, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new DeleteTaskInteractor(taskRepository)
    const result = await interactor.execute(deleteTaskInput)
    setResponseStatus(event, 202)
    return GetTaskPresenter.present(result)
  })
)

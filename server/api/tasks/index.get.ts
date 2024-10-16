import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { GetTaskInteractor } from '~/server/usecases/interactors/task/get-task.interactor'
import { GetTaskPresenter } from '~/server/interfaces/presenters/task/get-task.presenter'
import { fireStore } from '~/server/libs/firebase-admin'
import { AuthDecorator } from '~/server/interceptor/auth'

export default defineEventHandler(
  AuthDecorator(async(event, user) => {
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new GetTaskInteractor(taskRepository)
    const result = await interactor.execute(user)
    return GetTaskPresenter.present(result)
  })
)

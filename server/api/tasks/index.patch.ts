import { TaskRepository } from '~/server/domain/repositories/task/task.repository'
import { GetTaskPresenter } from '~/server/interfaces/presenters/task/get-task.presenter'
import { fireStore } from '~/server/libs/firebase-admin'
import { AuthDecorator } from '~/server/interceptor/auth'
import { UpdateTaskInputDTO } from '~/server/usecases/dto/task/input/update-task-input.dto'
import { UpdateTaskInteractor } from '~/server/usecases/interactors/task/update-task.interactor'

export default defineEventHandler(
  AuthDecorator(async(event, user) => {
    const body = await readBody(event)
    const updateTaskInput = UpdateTaskInputDTO.fromRequestArray(body, user)
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new UpdateTaskInteractor(taskRepository)
    const result = await interactor.execute(updateTaskInput)
    return GetTaskPresenter.present(result)
  })
)

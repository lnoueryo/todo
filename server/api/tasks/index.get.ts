import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { GetTaskInteractor } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '~/server/libs/firebase-admin'
import { httpAuth } from '~/server/presentation/auth/http-auth'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const taskRepository = new TaskRepository(fireStore)
    const interactor = new GetTaskInteractor(taskRepository)
    const result = await interactor.execute(user)
    return { tasks: result}
  })
)

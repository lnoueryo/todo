import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '~/server/libs/firebase-admin'
import { httpAuth } from '~/server/presentation/auth/http-auth'

export default defineEventHandler(
  httpAuth(async(event, user) => {
    const taskRepository = new TaskRepository(fireStore)
    const usecase = new GetTaskUsecase(taskRepository)
    const result = await usecase.execute(user)
    return { tasks: result }
  })
)

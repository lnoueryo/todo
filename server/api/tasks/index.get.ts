import { TaskRepository } from '~/server/repositories/task/task.repository'
import { GetTaskUseCase } from '~/server/usecases/task/get-task.usecase'
import { GetTaskResponse } from '~/server/dto/task/response/get-task.response'
import { fireStore } from '~/server/plugins/firebase-admin'

export default defineEventHandler(async(event) => {
  const taskRepository = new TaskRepository(fireStore)
  const usecase = new GetTaskUseCase(taskRepository)
  const result = await usecase.do()
  return new GetTaskResponse(result)
})
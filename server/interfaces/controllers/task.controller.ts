import { H3Event } from 'h3'
import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { getHttpStatus } from '../shared/http-status-mapper'
import { TaskResponse } from '../dto/task/response/task-response.dto'
import { User } from '~/server/domain/entities/user'
import { CreateTaskRequest } from '../dto/task/request/create-task-request.dto'
import { UpdateTaskRequest } from '../dto/task/request/update-task-request.dto'
import { CreateTaskUsecase } from '~/server/application/usecases/task/create-task.usecase'
import { UpdateTaskUsecase } from '~/server/application/usecases/task/update-task.usecase'
import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'
import { DeleteTaskRequest } from '../dto/task/request/delete-task-request'
export class TaskController {
  constructor(
    private getTaskUsecase: GetTaskUsecase,
    private createTaskUsecase: CreateTaskUsecase,
    private updateTaskUsecase: UpdateTaskUsecase,
    private deleteTaskUsecase: DeleteTaskUsecase,
  ) {}

  async getTasks(event: H3Event, user: User) {
    const result = await this.getTaskUsecase.execute(user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 201)
    return new TaskResponse(result.success.tasks).responseUserTasks()
  }
  async createTask(event: H3Event, user: User) {
    const body = await readBody(event)
    const createTaskInput = new CreateTaskRequest(body)
    const result = await this.createTaskUsecase.execute(createTaskInput.task, user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 201)
    return new TaskResponse(result.success.tasks).responseUserTasks()
  }
  async updateTasks(event: H3Event, user: User) {
    const body = await readBody(event)
    const updateTaskRequest = new UpdateTaskRequest(body)
    const result = await this.updateTaskUsecase.execute(updateTaskRequest.tasks, user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 202)
    return new TaskResponse(result.success.tasks).responseUserTasks()
  }
  async deleteTasks(event: H3Event, user: User) {
    const body = await readBody(event)
    const deleteTaskRequest = new DeleteTaskRequest(body)
    const result = await this.deleteTaskUsecase.execute(deleteTaskRequest.ids, user)
    if ('error' in result) {
      throw createError({
        statusCode: getHttpStatus(result.error.type),
        message: result.error.message,
      })
    }
    setResponseStatus(event, 202)
    return new TaskResponse(result.success.tasks).responseUserTasks()
  }
}
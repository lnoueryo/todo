import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto'
import { User } from '../entities/user'
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskRequest: CreateTaskRequest, user: User): Promise<Task> {
    const task = new Task(createTaskRequest.task)
    task.userId = user.id
    task.createdAt = new Date()
    task.updatedAt = new Date()
    return await this.taskRepository.save(task)
  }

  async getTasksByUserId(id: string): Promise<Task[]> {
    return await this.taskRepository.getByUserId(id)
  }

  async updateBatch(tasks: (Required<Omit<Task, 'createdAt' | 'updatedAt'>>)[]) {
    const updateTasks = tasks.map((taskData) => {
      const task = new Task(taskData)
      task.updatedAt = new Date()
      return this.taskRepository.updateTask(taskData.id, task)
    })
    await Promise.all(updateTasks)
  }

  async deleteBatch(taskIds: string[]) {
    const deleteTasks = taskIds.map((id) => {
      return this.taskRepository.deleteTask(id)
    })
    await Promise.all(deleteTasks)
  }

  async areTasksCurrentUsers(
    taskIds: string[],
    user: User
  ) {
    const targetTasks = await this.taskRepository.getTasksByIds(taskIds)
    return targetTasks.every((task) => task.isCurrentUserTask(user))
  }
}

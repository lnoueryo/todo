import { TaskRepository } from '~/server/infrastructure/firestore/task.repository'
import { ITask, Task } from '~/server/domain/entities/task'
import { CreateTaskRequest } from '~/server/interfaces/dto/task/request/create-task-request.dto';
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskRequest: CreateTaskRequest): Promise<Task> {
    const task = new Task(createTaskRequest.task);
    return await this.taskRepository.save(task);
  }

  async getTasksByUserId(id: string): Promise<Task[]> {
    return await this.taskRepository.getByUserId(id);
  }

  async updateBatch(tasks: (Omit<ITask, 'createdAt' | 'updatedAt'> & { id: string, updatedAt: Date })[]) {
    const updateTasks = tasks.map((taskData) => {
      const task = new Task(taskData)
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
    user: {
      id: string
      name: string
      email: string
    }
  ) {
    const targetTasks = await this.taskRepository.getTasksByIds(taskIds)
    return targetTasks.every((task) => task.isCurrentUserTask(user))
  }

  transformTaskEntities(tasks: {
    id?: string
    userId: string
    content: string
    active: boolean
    order: number
    createdAt?: Date
    updatedAt?: Date
  }[]) {
    return tasks.map((task) => this.transformTaskEntity(task))
  }

  transformTaskEntity(task: {
    id?: string
    userId: string
    content: string
    active: boolean
    order: number
    createdAt?: Date
    updatedAt?: Date
  }) {
    return new Task(task)
  }
}

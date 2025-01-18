import { Task } from '~/server/domain/entities/task'
export type ITaskRepository = {
  getByUserId(id: string): Promise<Task[]>
  getByIds(ids: string[]): Promise<Task[]>
  getTaskByUserId(id: string): Promise<Task | null>
  save(task: Task): Promise<Task>
  updateTask(id: string, task: Task): Promise<void>
  deleteTask(id: string): Promise<void>
}

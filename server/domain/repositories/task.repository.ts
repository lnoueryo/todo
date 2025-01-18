import { Task } from '~/server/domain/entities/task'
import admin from 'firebase-admin'
export type ITaskRepository = {
  getByUserId(id: string): Promise<Task[]>
  getByIds(ids: string[]): Promise<Task[]>
  getTaskByUserId(id: string): Promise<Task | null>
  save(task: Task): Promise<Task>
  updateTask(id: string, task: Task): Promise<admin.firestore.WriteResult>
  deleteTask(id: string): Promise<void>
}

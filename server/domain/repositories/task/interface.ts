import Task from '~/server/entities/task'
import admin from 'firebase-admin'
export type ITaskRepository = {
  getTasksByUserId(id: string): Promise<Task[]>
  getTaskByUserId(id: string): Promise<Task | null>
  createTask(task: Task): Promise<Task>
  updateTask(task: Task): Promise<admin.firestore.WriteResult>
  deleteTask(id: string): Promise<void>
}

import type { ITaskRepository } from './interface'
import admin from 'firebase-admin'
import { TaskData } from '~/server/types/task'

export class TaskRepository implements ITaskRepository  {
  constructor(private fireStore: admin.firestore.Firestore) {}
  async getTasks(): Promise<TaskData[]> {
    const tasksRef = this.fireStore.collection('tasks')
    const snapshot = await tasksRef.get()
    return  snapshot.docs.map(doc => {
      const {
        active,
        id,
        content,
        order,
      } = doc.data()
      return {
        active,
        id,
        content,
        order,
      }
    })
  }
}
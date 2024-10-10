import type { ITaskRepository } from './interface'
import admin from 'firebase-admin'
import { TaskData } from '~/server/types/task'

export class TaskRepository implements ITaskRepository  {
  constructor(private fireStore: admin.firestore.Firestore) {}
  async getTasksByUserId(id: string): Promise<TaskData[]> {
    const tasksRef = this.fireStore.collection('tasks')
    const snapshot = await tasksRef.where('userId', '==', id).get()
    return snapshot.docs.map(doc => {
      const {
        active,
        content,
        order,
      } = doc.data()
      return {
        id: doc.id,
        active,
        content,
        order,
      }
    })
  }
}
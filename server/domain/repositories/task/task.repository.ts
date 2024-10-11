import type { ITaskRepository } from './interface'
import admin from 'firebase-admin'
import { Task } from '~/server/domain/entities/task'

export class TaskRepository implements ITaskRepository  {
  constructor(private fireStore: admin.firestore.Firestore) {}
  async getTasksByUserId(id: string): Promise<Task[]> {
    const tasksRef = this.fireStore.collection('tasks').orderBy('order')
    const snapshot = await tasksRef.where('userId', '==', id).get()
    return snapshot.docs.map(doc => {
      const {
        active,
        content,
        order,
        userId,
        createdAt,
        updatedAt,
      } = doc.data()
      return new Task({
        id: doc.id,
        active,
        content,
        order,
        userId,
        createdAt,
        updatedAt,
      })
    })
  }
  async createTask(task: Task): Promise<Task> {
    const {
      userId,
      active,
      content,
      order,
      createdAt,
      updatedAt,
    } = task
    const newTask = await this.fireStore.collection('tasks').add({
      userId,
      active,
      content,
      order,
      createdAt,
      updatedAt,
    })
    task.id = newTask.id
    return task
  }
  async updateTask(task: Task): Promise<admin.firestore.WriteResult> {
    return this.fireStore.collection('tasks').doc(task.id).update({
      content: task.content,
      active: task.active,
      order: task.order,
      updatedAt: task.updatedAt,
    })
  }
}

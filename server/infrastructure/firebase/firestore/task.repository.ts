import type { ITaskRepository } from '../../../domain/repositories/task.repository'
import admin from 'firebase-admin'
import { Task } from '~/server/domain/entities/task'

export class TaskRepository implements ITaskRepository  {
  constructor(private fireStore: admin.firestore.Firestore) {}
  async getByUserId(id: string): Promise<Task[]> {
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
  async getByIds(ids: string[]): Promise<Task[]> {
    const tasksRef = this.fireStore.collection('tasks').orderBy('order')
    const snapshot = await tasksRef.where(admin.firestore.FieldPath.documentId(), 'in', ids).get()
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
  async getTaskByUserId(id: string): Promise<Task | null> {
    const taskRef = this.fireStore.collection('tasks').doc(id)
    const taskDoc = await taskRef.get()
    if (!taskDoc.exists) {
      return null
    }
    const taskData = taskDoc.data()
    if (!taskData) {
      return null
    }
    const {
      active,
      content,
      order,
      userId,
      createdAt,
      updatedAt,
    } = taskData
    return new Task({
      id: taskDoc.id,
      active,
      content,
      order,
      userId,
      createdAt,
      updatedAt,
    })
  }
  async save(task: Task): Promise<Task> {
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
  async updateTask(id: string, task: Task): Promise<admin.firestore.WriteResult> {
    return this.fireStore.collection('tasks').doc(id).update({
      content: task.content,
      order: task.order,
      active: task.active,
      updatedAt: task.active,
    })
  }
  async deleteTask(id: string): Promise<void> {
    const taskRef = this.fireStore.collection('tasks').doc(id)
    await taskRef.delete()
  }
}

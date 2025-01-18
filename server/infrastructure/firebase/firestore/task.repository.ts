import type { ITaskRepository } from '../../../domain/repositories/task.repository'
import admin from 'firebase-admin'
import { Task } from '~/server/domain/entities/task'
import { BaseRepository } from './base.repository'

export class TaskRepository extends BaseRepository implements ITaskRepository  {
  protected collectionName = 'tasks'

  async getByUserId(id: string): Promise<Task[]> {
    const tasksRef = this.getCollection().orderBy('order')
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
    const tasksRef = this.getCollection().orderBy('order')
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
    const taskRef = this.getCollection().doc(id)
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
    const newTask = await this.getCollection().add({
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
  async updateTask(id: string, task: Task): Promise<void> {
    await this.getCollection().doc(id).update({
      content: task.content,
      order: task.order,
      active: task.active,
      updatedAt: task.active,
    })
  }
  async deleteTask(id: string): Promise<void> {
    const taskRef = this.getCollection().doc(id)
    await taskRef.delete()
  }
}

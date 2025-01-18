import { GetTaskUsecase } from '~/server/application/usecases/task/get-task.usecase'
import { fireStore } from '../firebase/firebase-admin'
import { TaskRepository } from '../firebase/firestore/task.repository'
import { TaskController } from '~/server/interfaces/controllers/task.controller'
import { CreateTaskUsecase } from '~/server/application/usecases/task/create-task.usecase'
import { UpdateTaskUsecase } from '~/server/application/usecases/task/update-task.usecase'
import { FireStoreTransactionManager } from '../firebase/firestore/transaction-manager.repository'
import { DeleteTaskUsecase } from '~/server/application/usecases/task/delete-task.usecase'

const taskRepository = new TaskRepository(fireStore)
const transactionManager = new FireStoreTransactionManager(fireStore)
const getTaskUsecase = new GetTaskUsecase(taskRepository)
const createTaskUsecase = new CreateTaskUsecase(taskRepository)
const updateTaskUsecase = new UpdateTaskUsecase(transactionManager, taskRepository)
const deleteTaskUsecase = new DeleteTaskUsecase(transactionManager)
const taskController = new TaskController(
  getTaskUsecase,
  createTaskUsecase,
  updateTaskUsecase,
  deleteTaskUsecase,
)

export default taskController
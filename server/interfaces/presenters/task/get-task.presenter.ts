import { GetTaskOutputDTO } from '~/server/usecases/dto/task/output/get-task-output.dto'

export class GetTaskPresenter {
  static present(output: GetTaskOutputDTO[]) {
    return {
      tasks: output
    }
  }
}

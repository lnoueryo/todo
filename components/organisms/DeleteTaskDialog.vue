<template>
  <BasicDialog v-model="taskStore.isDeleteTaskDialogOpen" persistent headerColor="error">
    <template #title>
      <h3>Delete Task</h3>
    </template>
    <template #text>
      <p>Is it ok to delete task?</p>
      <ul class="px-4">
        <li v-for="deleteTask in taskStore.deleteTasksCache">{{ deleteTask.content }}</li>
      </ul>
    </template>
    <template #actions>
      <Spacer />
      <Button
        elevation="0"
        color="gray"
        variant="flat"
        @click="onClickCancelDelete"
      >close</
        Button
      >
      <Button
        elevation="0"
        color="error"
        variant="flat"
        @click="onClickDeleteTask"
      >Yes</
        Button
      >
    </template>
  </BasicDialog>
</template>

<script setup lang="ts">
import Spacer from '~/components/atoms/Spacer.vue'
import BasicDialog from '~/components/molecules/BasicDialog.vue'
import Button from '~/components/atoms/Button.vue'
import { useTaskStore } from '~/store/task'
const taskStore = useTaskStore()

const onClickDeleteTask = async () => {
  await taskStore.deleteTasks(taskStore.deleteTasksCache)
  taskStore.closeDeleteTaskDialog()
}

const onClickCancelDelete = () => {
  taskStore.closeDeleteTaskDialog()
}

</script>

<style scoped>

</style>
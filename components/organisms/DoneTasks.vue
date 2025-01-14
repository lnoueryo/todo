<template>
  <BasicDialog v-model="isOpen" textClass="px-0">
    <template #activator="{ props }">
      <Button
        v-bind="props"
        color="success"
      >Done Tasks</Button>
    </template>
    <template #title>
      <h3>Done Tasks</h3>
    </template>
    <template #text>
      <template v-if="taskStore.doneTasks.length === 0">
        <p class="px-4">No Done Task Now</p>
      </template>
      <template v-else>
        <Col class="d-flex">
          <Spacer />
          <Button
            color="error"
            variant="flat"
            @click="onClickOpenDeleteDialog"
          >delete all</Button>
        </Col>
        <Col class="d-flex align-center" v-for="(task, i) in taskStore.doneTasks" :key="i">
          <Task
            ref="taskRef"
            v-bind="task"
            :items="tasksMenu"
            :check="false"
            readonly
          />
        </Col>
      </template>
    </template>
    <template #actions="{ isActive }">
      <Spacer />
      <Button
        elevation="0"
        color="gray"
        @click="isActive.value = false"
      >close</Button>
    </template>
  </BasicDialog>
</template>

<script setup lang="ts">
import Col from '~/components/atoms/Col.vue'
import Spacer from '~/components/atoms/Spacer.vue'
import Button from '~/components/atoms/Button.vue'
import BasicDialog from '~/components/molecules/BasicDialog.vue'
import Task from '~/components/molecules/Task.vue'
import type { Task as TaskType } from '~/repositories/task.repository'
import { useTaskStore } from '~/store/task'

const taskStore = useTaskStore()
const { $toast } = useNuxtApp()
const isOpen = ref(false)
const tasksMenu = computed(() => [
  { title: 'Back to Todo', handler: changeToActiveTask },
  { title: 'Delete', handler: deleteTask },
])
const deleteTask = async (task: TaskType) => {
  try {
    await taskStore.deleteTasks([task])
  } catch (error) {
    $toast.error('failed to update task')
  }
}

const changeToActiveTask = async (task: TaskType) => {
  try {
    const order = taskStore.todoTasks[taskStore.todoTasks.length - 1].order + 1
    const newTask = reactive({ ...task, active: true, order })
    await taskStore.updateTasks([newTask])
  } catch (error) {
    $toast.error('failed to update task')
  }
}

const onClickOpenDeleteDialog = () => {
  taskStore.openDeleteTaskDialog(taskStore.doneTasks)
}

</script>

<style scoped>

</style>
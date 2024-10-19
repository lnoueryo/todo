<template>
  <div class="pa-4 flex-container">
    <div>
      <Col class="d-flex justify-space-between fix-top">
        <h2 class="mb-4">Tasks</h2>
        <Button icon="mdi-plus" @click="onClickAddTask" />
      </Col>
      <TodoTasks
        ref="tasksRef"
        class="tasks"
      />
      <div class="button-container">
        <DoneTasks
          :tasks="taskStore.tasks"
        />
      </div>
    </div>
    <DeleteTaskDialog />
  </div>
</template>

<script setup lang="ts">
import Col from '~/components/atoms/Col.vue'
import Button from '~/components/atoms/Button.vue'
import TodoTasks from '~/components/organisms/TodoTasks.vue'
import DoneTasks from '~/components/organisms/DoneTasks.vue'
import DeleteTaskDialog from '~/components/organisms/DeleteTaskDialog.vue'
import { useTaskStore } from '~/store/task'

const taskStore = useTaskStore()
const { $loading, $toast } = useNuxtApp()

try {
  $loading.show()
  await taskStore.getTasks()
} catch (error) {
  $toast.error('failed to fetch tasks')
} finally {
  $loading.hide()
}
const tasksRef = ref<typeof TodoTasks | null>(null)

const onClickAddTask = async () => {
  await taskStore.addTask()
  if (tasksRef.value) {
    tasksRef.value.focusTask()
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);
}

.fix-top {
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #ccc;
  z-index: 1;
}

.tasks {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 306px);
}

.button-container {
  padding-top: 16px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  position: sticky;
  bottom: 0;
  background-color: white;
}
</style>
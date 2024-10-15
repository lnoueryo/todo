<template>
  <BasicDialog v-model="isOpen" textClass="px-0">
    <template #activator="{ props }">
      <Button
        v-bind="props"
        color="success"
      >Done Task</Button>
    </template>
    <template #title>
      Done Tasks
    </template>
    <template #text>
      <template v-if="doneTasks.length === 0">
        <p class="px-4">No Done Task Now</p>
      </template>
      <template v-else>
        <Col class="d-flex">
          <Spacer />
          <Button
            color="error"
            variant="flat"
            @click="emits('click:delete', doneTasks)"
          >delete all</Button>
        </Col>
        <Tasks
          :tasks="doneTasks"
          :check="false"
          :items="tasksMenu"
          readonly
        />
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
import Tasks from '~/components/organisms/Tasks.vue'
import type { Task as TaskType } from '~/repositories/task.repository'
const props = defineProps({
  tasks: {
    type: Array as () => TaskType[],
    default: []
  }
})
const emits = defineEmits([
  'change:tasks',
  'blur:task',
  'click:delete',
])
const todoTasks = computed(() => props.tasks.filter(task => task.active))
const doneTasks = computed(() => props.tasks.filter(task => !task.active))
const isOpen = ref(false)

const deleteTask = (task: TaskType) => {
  emits('click:delete', [task])
}

const changeToActiveTask = (task: TaskType) => {
  const order = todoTasks.value[todoTasks.value.length - 1].order + 1
  const newTask = reactive({ ...task, active: true, order })
  emits('blur:task', newTask)
}

const tasksMenu = computed(() => [
  { title: 'Back to Todo', handler: changeToActiveTask },
  { title: 'Delete', handler: deleteTask },
])

</script>

<style scoped>

</style>
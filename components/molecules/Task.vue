<template>
  <Checkbox
    v-model="internalActive"
    class="d-flex justify-center"
    hoverIconColor="#1967c0"
    hoverIcon="$checkboxOn"
    hover
    :trueValue="false"
    :falseValue="true"
    v-if="props.check"
  />
  <div class="d-flex justify-center pl-4" style="width: 100%;">
    <TextArea
      ref="textFieldRef"
      v-model="internalContent"
      variant="filled"
      density="comfortable"
      :clearable="!props.readonly"
      :readonly="props.readonly"
      @blur="emits('blur:task', task)"
      @click="emits('click:task', task)"
      rows="1"
      auto-grow
    />
  </div>
  <div class="px-1">
    <Menu icon="mdi-dots-vertical" v-if="items.length !== 0">
      <List>
        <ListItem
          v-for="(item, index) in items"
          :value="index"
          @click="item.handler(task)"
        >
          {{ item.title }}
        </ListItem>
      </List>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import TextField from '~/components/atoms/TextField.vue'
import Checkbox from '~/components/atoms/Checkbox.vue'
import Menu from '~/components/atoms/Menu.vue'
import List from '~/components/atoms/List.vue'
import ListItem from '~/components/atoms/ListItem.vue'
import TextArea from '~/components/atoms/TextArea.vue'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  items: {
    type: Array as () => {
      title: string,
      handler: (e: any) => void
    }[],
    default: []
  },
  check: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
})

const emits = defineEmits([
  'click:task',
  'change:task',
  'blur:task',
]);
const internalActive = computed({
  get() {
    return props.active
  },
  set(active) {
    const newTask = reactive({ ...task.value, active, order: -1 })
    emits('blur:task', newTask)
  }
})
const internalContent = computed({
  get() {
    return props.content
  },
  set(content) {
    const newTask = reactive({ ...task.value, content })
    emits('change:task', newTask)
  }
})
const task = computed(() => {
  const {
    items,
    check,
    readonly,
    ...rest
  } = props
  return rest
})
const textFieldRef = ref<typeof TextField | null>(null)
const focusTextField = () => {
  if (textFieldRef.value) {
    textFieldRef.value.focus()
  }
}
defineExpose({
  focusTextField
})
</script>

<style scoped>

</style>
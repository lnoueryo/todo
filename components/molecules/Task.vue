<template>
  <Col class="d-flex justify-center" md="1" sm="1">
    <Checkbox
      v-model="internalActive"
      hoverIconColor="#1967c0"
      hoverIcon="$checkboxOn"
      hover
      :trueValue="false"
      :falseValue="true"
    />
  </Col>
  <Col class="d-flex justify-center" md="10" sm="10">
    <TextField
      ref="textFieldRef"
      v-model="internalContent"
      clearable
      @blur="emits('blur:task', $event)"
    />
  </Col>
  <Menu icon="mdi-dots-vertical">
    <List>
      <ListItem
        v-for="(item, index) in items"
        :value="index"
        @click="item.handler"
      >
        {{ item.title }}
      </ListItem>
    </List>
  </Menu>
</template>

<script setup lang="ts">
import TextField from '~/components/atoms/TextField.vue'
import Col from '~/components/atoms/Col.vue'
import Checkbox from '~/components/atoms/Checkbox.vue'
import Menu from '~/components/atoms/Menu.vue'
import List from '~/components/atoms/List.vue'
import ListItem from '~/components/atoms/ListItem.vue'
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
})
const emits = defineEmits([
  'change:task',
  'update:content',
  'blur:task',
  'click:delete',
]);
const internalActive = computed({
  get() {
    return props.active
  },
  set(active) {
    const task = reactive({ ...props, active })
    emits('change:task', task)
  }
})
const internalContent = computed({
  get() {
    return props.content
  },
  set(content) {
    const task = reactive({ ...props, content })
    emits('change:task', task)
  }
})

const deleteTask = (e: Event) => {
  emits('click:delete', e)
}
const items = ref([
  { title: '削除', handler: deleteTask }
])
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
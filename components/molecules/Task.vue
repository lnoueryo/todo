<template>
  <Col class="d-flex justify-center" md="1" sm="1">
    <Checkbox v-model="internalActive" hoverIconColor="#1967c0" hoverIcon="$checkboxOn" hover :trueValue="false" :falseValue="true" />
  </Col>
  <Col class="d-flex justify-center" md="11" sm="11">
    <TextField v-model="internalContent" clearable />
  </Col>
</template>

<script setup lang="ts">
import TextField from '~/components/atoms/TextField.vue'
import Col from '~/components/atoms/Col.vue'
import Checkbox from '~/components/atoms/Checkbox.vue'
const props = defineProps({
  id: {
    type: Number,
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
const emits = defineEmits(['change:task', 'update:content']);
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
</script>

<style scoped>

</style>
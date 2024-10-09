<template>
  <TextField
    v-model="password"
    :type="textBoxType"
    class="mb-2"
    :rules="rules"
    label="Password"
    :hide-details="false"
    :append-inner-icon="textBoxIcon"
    @click:appendInner="isHidden = !isHidden"
  />
</template>

<script setup lang="ts">
type Rule = (v: string) => boolean | string
import { isRequired } from '~/utils'
import TextField from '~/components/atoms/TextField.vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as () => Rule[],
    default: [
      isRequired
    ]
  },
})
const emits = defineEmits([
  'update:modelValue',
])
const password = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
const isHidden = ref(true)
const textBoxType = computed(() => isHidden.value ? 'password' : 'text')
const textBoxIcon = computed(() => isHidden.value ? 'mdi-eye-off' : 'mdi-eye')
</script>

<style scoped>

</style>
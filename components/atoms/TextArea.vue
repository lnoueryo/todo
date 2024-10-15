<template>
  <v-textarea
    ref="textFieldRef"
    v-model="text"
    :type="props.type"
    :label="props.label"
    :color="props.color"
    :variant="props.variant"
    :clearable="props.clearable"
    :error="props.error"
    :readonly="props.readonly"
    :error-messages="props.errorMessages"
    :rules="props.rules"
    :hide-details="props.hideDetails"
    :density="props.density"
    :append-inner-icon="props.appendInnerIcon"
    @click:appendInner="emits('click:appendInner', $event)"
    @blur="emits('blur', $event)"
  />
</template>

<script setup lang="ts">
type Variant = 'outlined' | 'filled' | 'underlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled'
type Density = 'default' | 'comfortable' | 'compact'
type Rule = (v: string) => boolean | string
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  color: {
    type: String,
    default: 'primary'
  },
  density: {
    type: String as () => Density || undefined,
    default: 'default'
  },
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => Variant | undefined,
    default: 'outlined'
  },
  clearable: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  hideDetails: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array as () => Rule[],
    default: []
  },
  errorMessages: {
    type: Array as () => string[],
    default: []
  },
  appendInnerIcon: {
    type: String || undefined,
    default: undefined
  },
})
const emits = defineEmits([
  'update:modelValue',
  'click:appendInner',
  'blur',
])
const text = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
const textFieldRef = ref<HTMLInputElement | null>(null)
const focus = () => {
  if (textFieldRef.value) {
    textFieldRef.value.focus()
  }
}
defineExpose({
  focus
})
</script>

<style scoped>

</style>
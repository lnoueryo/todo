<template>
  <v-dialog v-model="isOpen" :max-width="props.maxWidth">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>
    <template #default="{ isActive }">
      <slot name="default" :isActive="isActive" />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '600px'
  }
})
const emits = defineEmits([
  'update:modelValue'
])
const isOpen = computed({
  get() {
    return props.value
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
</script>

<style scoped>

</style>
<template>
  <v-text-field
    :label="props.label"
    :color="props.color"
    :variant="props.variant"
    :clearable="props.clearable"
    hide-details
  />
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'outlined'
  },
  clearable: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped>

</style>
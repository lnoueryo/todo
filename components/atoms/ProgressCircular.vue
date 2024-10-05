<template>
  <v-progress-circular
    :size="props.size"
    :width="props.width"
    :color="props.color"
    :indeterminate="props.indeterminate"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 40
  },
  width: {
    type: Number,
    default: 4
  },
  color: {
    type: String,
    default: 'primary'
  },
  indeterminate: {
    type: Boolean,
    default: true
  },
})
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
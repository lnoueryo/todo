<template>
  <v-col
    :cols="props.cols"
    :md="props.md"
    :sm="props.sm"
  >
    <slot />
  </v-col>
</template>

<script setup lang="ts">
const props = defineProps({
  cols: {
    type: String,
    default: '12'
  },
  md: {
    type: String,
    default: '12'
  },
  sm: {
    type: String,
    default: '12'
  },
})
</script>

<style scoped>

</style>
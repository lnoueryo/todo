<template>
  <v-card :width="props.width" :max-width="props.maxWidth">
    <slot />
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  maxWidth: {
    type: String,
    default: '800px',
  },
})
</script>

<style scoped>

</style>
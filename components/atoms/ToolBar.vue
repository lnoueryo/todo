<template>
  <v-toolbar :color="props.color">
    <slot />
  </v-toolbar>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>

</style>
<template>
  <v-app-bar :color="props.color" :density="props.density">
    <v-app-bar-title>{{ props.title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  density: {
    type: String,
    default: 'compact'
  },
  title: {
    type: String,
    default: ''
  },
})
</script>

<style scoped>

</style>
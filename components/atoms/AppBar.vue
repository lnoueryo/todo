<template>
  <v-app-bar :color="props.color" :density="props.density">
    <slot />
  </v-app-bar>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  density: {
    type: String as () => 'default' | 'comfortable' | 'compact' || undefined,
    default: 'compact'
  },
})
</script>

<style scoped>

</style>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <Button
        :icon="_props.icon"
        :elevation="_props.elevation"
        variant="text"
        :color="_props.color"
        v-bind="props"
      />
    </template>
    <slot />
  </v-menu>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'
const _props = defineProps({
  icon: {
    type: String,
    default: 'mdi-dots-vertical'
  },
  elevation: {
    type: String,
    default: '0'
  },
  color: {
    type: String,
    default: 'gray'
  },
})
</script>

<style scoped>

</style>
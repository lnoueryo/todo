<template>
  <v-list-item :value="props.value" @click="emits('click', $event)">
    <v-list-item-title>
      <slot />
    </v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number
  }
})
const emits = defineEmits([
  'click'
])
</script>

<style scoped>

</style>
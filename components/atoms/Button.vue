<template>
  <v-btn
    :type="props.type"
    :variant="props.variant"
    :elevation="props.elevation"
    :color="props.color"
    :loading="props.loading"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
type Variant = 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
const props = defineProps({
  type: {
    type: String,
    default: undefined
  },
  variant: {
    type: String as () => Variant || undefined,
    default: undefined
  },
  elevation: {
    type: String,
    default: '3'
  },
  color: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped>

</style>
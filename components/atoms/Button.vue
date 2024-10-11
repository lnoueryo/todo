<template>
  <v-btn
    :type="props.type"
    :variant="props.variant"
    :elevation="props.elevation"
    :color="props.color"
    :icon="!!props.icon"
    :loading="props.loading"
  >
    <Icon v-if="props.icon">{{ props.icon }}</Icon>
    <slot v-if="!props.icon" />
  </v-btn>
</template>

<script setup lang="ts">
import Icon from '~/components/atoms/Icon.vue'
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
  icon: {
    type: String || undefined,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped>

</style>
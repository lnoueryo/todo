<template>
  <v-snackbar
    v-model="props.value"
    :class="{'justify-center': props.textCenter}"
    :color="props.color"
    :timeout="props.timeout"
    :multi-line="props.multiLine"
  >
    <div
      :class="{'justify-center': props.textCenter, 'd-flex': props.textCenter}"
    >
      {{ props.text }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  timeout: {
    type: Number,
    default: 2500
  },
  color: {
    type: String,
    default: 'primary'
  },
  text: {
    type: String,
    default: ''
  },
  multiLine: {
    type: Boolean,
    default: true
  },
  textCenter: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped>

</style>
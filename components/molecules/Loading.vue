<template>
  <div v-if="visible" class="overlay">
    <div class="loading">
      <ProgressCircular
        :size="40"
        :width="4"
        color="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressCircular from '~/components/atoms/ProgressCircular.vue'
const { $loading } = useNuxtApp()
const visible = $loading.visible
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
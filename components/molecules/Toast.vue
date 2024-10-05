<template>
  <SnackBar
    v-model="visible"
    :text="text"
    :color="color"
    text-center
  />
</template>

<script setup lang="ts">
import SnackBar from '~/components/atoms/SnackBar.vue'
const { $toast } = useNuxtApp()
const visible = $toast.visible
const text = $toast.text
const color = $toast.color
</script>

<style scoped>

</style>
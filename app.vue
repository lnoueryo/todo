<template>
  <VApp>
    <NuxtLayout />
    <Loading />
    <Toast />
  </VApp>
</template>

<script setup lang="ts">
import Loading from '~/components/molecules/Loading.vue'
import Toast from '~/components/molecules/Toast.vue'
</script>
<template>
  <ClientOnly>
    <VApp>
      <NuxtLayout />
      <Loading />
      <Toast />
    </VApp>
  </ClientOnly>
</template>

<script setup lang="ts">
import Loading from '~/components/molecules/Loading.vue'
import Toast from '~/components/molecules/Toast.vue'
</script>
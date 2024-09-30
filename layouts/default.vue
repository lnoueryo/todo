<template>
  <header>
    <AppBar title="Todo" />
  </header>
  <main>
    <Card>
      <NuxtPage />
    </Card>
  </main>
</template>

<script setup lang="ts">
import AppBar from '~/components/atoms/AppBar.vue'
import Card from '~/components/atoms/Card.vue'
</script>

<style scoped>
  header {
    margin-bottom: 48px;
  }
  main {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 48px 0;
  }

  .page-container {
    display: flex;
    flex: 1;
  }
</style>
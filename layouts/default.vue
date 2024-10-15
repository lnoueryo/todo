<template>
  <header>
    <Header title="ToDo" :items="menuItems" />
  </header>
  <main>
    <Card>
      <NuxtPage />
    </Card>
  </main>
</template>

<script setup lang="ts">
import Card from '~/components/atoms/Card.vue'
import Header from '~/components/molecules/Header.vue'
import { signOut } from 'firebase/auth';
const { $auth, $toast, $loading } = useNuxtApp()
const router = useRouter()
const logout = async () => {
  $loading.show()
  try {
    await signOut($auth)
    router.push('/login')
    $toast.success('logged out successfully')
  } catch (error) {
    $toast.error('failed to log out')
  } finally {
    $loading.hide()
  }

}
const menuItems = computed(() => {
  return [
    { title: 'logout', handler: logout }
  ]
})
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
</style>
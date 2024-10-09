<template>
  <Card class="login-form pa-8" max-width="400px">
    <Form ref="formRef" @submit.prevent="submit">
      <TextField
        v-model="form.email"
        type="email"
        class="mb-2"
        :rules="emailRules"
        label="Email"
        :hide-details="false"
      />
      <Password
        v-model="form.password"
        class="mb-2"
        label="Password"
      />
      <div class="d-flex justify-end">
        <Button :loading="loading">
          login
        </Button>
      </div>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import { isRequired, isInvalidEmailFormat } from '~/utils'
import Card from '~/components/atoms/Card.vue'
import Form from '~/components/atoms/Form.vue'
import TextField from '~/components/atoms/TextField.vue'
import Password from '~/components/molecules/Password.vue'
import Button from '~/components/atoms/Button.vue'

definePageMeta({
  layout: 'login'
})
const { $authRepository, $api } = useNuxtApp()
const router = useRouter()
const form = ref({
  email: '',
  password: ''
})
const formRef = ref<InstanceType<typeof Form> | null>(null)
const emailRules = computed(() => [
  isRequired,
  isInvalidEmailFormat
])
const loading = ref(false)
const submit = async() => {
  if (!formRef.value) {
    return
  }
  const { valid } = await formRef.value.validate()
  if (!valid) {
    return
  }
  try {
    loading.value = true
    const idToken = await $authRepository.login(form.value)
    await $authRepository.setCookie({ idToken })
    await router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
}
</style>
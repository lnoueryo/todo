<template>
  <v-form ref="formRef" @submit.prevent="emits('submit', $event)">
    <slot />
  </v-form>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components'
const emits = defineEmits([
  'submit'
])
const formRef = ref<InstanceType<typeof VForm> | null>(null)
const validate = async () => {
  return formRef.value ? await formRef.value.validate() : { valid: false }
}
defineExpose({
  validate
})
</script>

<style scoped>

</style>
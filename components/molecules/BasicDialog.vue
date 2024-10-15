<template>
  <Dialog v-model="isOpen" :max-width="props.maxWidth" :persistent="props.persistent">
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>
    <template #default="{ isActive }">
      <Card>
        <ToolBar :color="props.headerColor">
          <CardTitle>
            <slot name="title" />
          </CardTitle>
        </ToolBar>
        <CardText>
          <slot name="text" />
        </CardText>
        <CardActions>
          <slot name="actions" :isActive="isActive" />
        </CardActions>
      </Card>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Card from '~/components/atoms/Card.vue'
import CardTitle from '~/components/atoms/CardTitle.vue'
import CardText from '~/components/atoms/CardText.vue'
import CardActions from '~/components/atoms/CardActions.vue'
import Dialog from '~/components/atoms/Dialog.vue'
import ToolBar from '~/components/atoms/ToolBar.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '600px'
  },
  persistent: {
    type: Boolean,
    default: false
  },
  headerColor: {
    type: String,
    default: 'primary'
  }
})
const emits = defineEmits([
  'update:modelValue'
])
const isOpen = computed({
  get() {
    return props.value
  },
  set(v) {
    emits('update:modelValue', v)
  }
})

</script>

<style scoped>

</style>
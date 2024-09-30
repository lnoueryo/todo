<template>
  <v-checkbox
    :class="{ 'hover': props.hover && isHover }"
    :model-value="props.modelValue"
    :density="props.density"
    :color="props.color"
    :true-value="props.trueValue"
    :false-value="props.falseValue"
    :false-icon="falseIcon"
    :style="{ color: isHover ? props.hoverIconColor : '' }"
    hide-details
    @update:modelValue="onUpdateModelValue"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  density: {
    type: String,
    default: 'compact'
  },
  trueValue: {
    type: Boolean || String,
    default: true
  },
  falseValue: {
    type: Boolean || String,
    default: false
  },
  falseIcon: {
    type: String,
    default: '$checkboxOff'
  },
  color: {
    type: String,
    default: 'primary'
  },
  hover: {
    type: Boolean,
    default: false
  },
  hoverIcon: {
    type: String,
    default: ''
  },
  hoverIconColor: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['update:modelValue'])
const isHover = ref(false)
const falseIcon = computed(() => props.hover ? isHover.value ? props.hoverIcon : '$checkboxOff' : props.falseIcon)
const onUpdateModelValue = (newValue) => {
  emit('update:modelValue', newValue)
}
</script>

<style>
.hover .v-selection-control__input > i.v-icon {
  opacity: 1;
}
</style>
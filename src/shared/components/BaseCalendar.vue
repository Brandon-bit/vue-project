<script setup lang="ts">
import 'v-calendar/style.css'
import { Calendar as VCalendar } from 'v-calendar'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// 1. metodo directo
const props = defineProps<{
  modelValue: Date | null
}>()
const emit = defineEmits(['update:modelValue'])


const handleDateUpdate = (val: Date | null) => {

  if (val) {
    emit('update:modelValue', val)
  }
}
</script>

<template>
  <VCalendar
    :model-value="props.modelValue"
    @update:model-value="handleDateUpdate"
    mode="single"
    :is-dark="false"
    expanded
    borderless
    :attributes="[{ key: 'today', dot: true, dates: [new Date()] }]"
  >
    <template #header-left-button>
      <ChevronLeft class="h-6 w-6 cursor-pointer" />
    </template>
    <template #header-right-button>
      <ChevronRight class="h-6 w-6 cursor-pointer" />
    </template>
  </VCalendar>
</template>

<style>
/* Tus estilos se quedan igual */
.vc-container {
  width: 100%;
}
</style>
<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  label: string;
  name: string;
}>();

const { value, errorMessage, meta } = useField(props.name);
</script>

<template>
  <div class="flex flex-col space-y-2">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <textarea
      :id="name"
      v-model="value"
      class="textarea w-full"
      :class="{ 'textarea-error': meta.touched && errorMessage }"
      placeholder="Ingrese valor"
      @blur="meta.touched = true"
    >
    </textarea>
    <div v-if="meta.touched && errorMessage" class="text-error">{{ errorMessage }}</div>
  </div>
</template>

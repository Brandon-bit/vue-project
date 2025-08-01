<template>
  <div
    class="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors"
    :class="active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'"
  >
    <div class="flex items-center gap-3">
      <span class="text-lg">{{ icon }}</span>
      <span>{{ label }}</span>
    </div>
    <span v-if="badge" class="bg-red-600 text-xs px-2 py-0.5 rounded-full">{{ badge }}</span>
  </div>
</template>

<script setup>
    defineProps({
    icon: String,
    label: String,
    active: Boolean,
    badge: String
    })
</script>

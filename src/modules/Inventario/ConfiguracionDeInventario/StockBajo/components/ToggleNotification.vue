<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const notification = ref(false)
const isChecked = computed(() => notification.value)

watch(isChecked, (newValue) => {
    if (newValue) {
    }
})
</script>
<template>
    <div class="mb-10 text-right">
        <input
            type="checkbox"
            v-model="notification"
            class="toggle"
            :class="isChecked ? 'toggle-success' : 'toggle-gray-400'"
        />
        <span class="ms-4"> Notificarme </span>
    </div>
</template>

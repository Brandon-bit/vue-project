<script setup lang="ts">
import type { CategoryType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'

defineProps<{
    category: CategoryType
}>()
</script>

<template>
    <div class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:border-primary transition-all">
        <div class="card-body text-center pb-4">
            <span :class="['material-symbols-outlined text-5xl mb-2', category.color]">folder_open</span>
            <h3 class="card-title text-sm justify-center">{{ category.name }}</h3>
            <p class="text-xs text-base-content/70">{{ category.count }} documentos</p>
        </div>
    </div>
</template>

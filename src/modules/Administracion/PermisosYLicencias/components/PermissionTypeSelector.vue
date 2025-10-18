<script setup lang="ts">
import type { PermissionTypeInfo } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

defineProps<{
    types: PermissionTypeInfo[]
}>()

const emit = defineEmits<{
    select: [typeId: string]
}>()
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <div 
            v-for="type in types" 
            :key="type.id"
            class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:border-primary transition-all border-2 border-transparent"
            @click="emit('select', type.id)"
        >
            <div class="card-body items-center text-center">
                <span :class="['material-symbols-outlined text-6xl mb-2', type.color]">{{ type.icon }}</span>
                <h3 class="card-title text-lg">{{ type.name }}</h3>
                <p class="text-xs text-base-content/70">{{ type.description }}</p>
            </div>
        </div>
    </div>
</template>

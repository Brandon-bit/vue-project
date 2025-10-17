<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    totalAssets: number
    totalValue: number
    areasCount: number
    inactiveAssets: number
}>()

const formattedValue = computed(() => {
    return `$${props.totalValue.toLocaleString('es-MX')}`
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Total Activos -->
        <div class="card bg-base-100 shadow-md">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Total Activos</h3>
                    <span class="material-symbols-outlined text-primary">business</span>
                </div>
                <div class="text-3xl font-bold mt-2">{{ totalAssets }}</div>
                <p class="text-xs opacity-60 mt-1">{{ inactiveAssets }} dados de baja</p>
            </div>
        </div>

        <!-- Valor Total -->
        <div class="card bg-base-100 shadow-md">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Valor Total</h3>
                    <span class="material-symbols-outlined text-success">payments</span>
                </div>
                <div class="text-3xl font-bold mt-2">{{ formattedValue }}</div>
                <p class="text-xs opacity-60 mt-1">Valor original de activos</p>
            </div>
        </div>

        <!-- Por Área -->
        <div class="card bg-base-100 shadow-md">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Por Área</h3>
                    <span class="material-symbols-outlined text-info">search</span>
                </div>
                <div class="text-3xl font-bold mt-2">{{ areasCount }}</div>
                <p class="text-xs opacity-60 mt-1">Áreas con activos asignados</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { columns, data } from '../data/tableData'
</script>

<template>
    <h2 class="text-center mb-8">Productos</h2>
    <div class="mb-10 text-right">
        <router-link to="/compras/productos/crear">
            <button class="btn btn-primary">
                <span class="material-symbols-outlined"> add_circle </span>
                Crear producto
            </button>
        </router-link>
    </div>
    <BaseTable :data="data" :headers="columns"> </BaseTable>
</template>

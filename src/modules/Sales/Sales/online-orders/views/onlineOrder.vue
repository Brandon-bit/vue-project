<script setup lang="ts">
import { onMounted } from 'vue';

// --- Importaciones de Componentes Visuales ---
import BaseTable from '@/shared/components/BaseTable.vue';
import BaseButton from '@/shared/components/BaseButton.vue';

// --- Importaciones de Lógica ---
import { useSale } from '../composables/useSale';

// 1. Activa el composable para obtener sus herramientas
const { sales, isLoading, fetchSales, getSalesTableColumns } = useSale();

// 2. Llama a la función para buscar los datos cuando el componente se monte
onMounted(() => {
    fetchSales();
});

// --- Funciones para los modales (placeholders por ahora) ---
const openCreateModal = () => {
    console.log('Abrir modal para crear venta...');
    // Aquí irá la lógica para llamar a modalStore.open()
};
</script>

<template>
    <div>
        <h2 class="text-center mb-8">Ventas</h2>

        <div class="mb-10 text-right">
            <BaseButton text="Nueva Venta" @click="openCreateModal" icon="add" />
        </div>

        <p v-if="isLoading">Cargando ventas...</p>

        <BaseTable
            v-else-if="sales.length > 0"
            :data="sales"
            :headers="getSalesTableColumns()"
        />

        <p v-else>No hay ventas para mostrar.</p>
        
        </div>
</template>
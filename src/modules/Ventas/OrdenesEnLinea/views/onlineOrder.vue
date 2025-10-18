<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'

// --- Importaciones de Componentes Visuales ---
import BaseTable from '@/shared/components/BaseTable.vue';
import BaseButton from '@/shared/components/BaseButton.vue';
import UseModal from '../components/UseModal.vue';

// --- Importaciones de Lógica ---
import { useSale } from '../../../OnlineOrders/composables/useSale';
import useSaleStore from '@/modules/Sales/Sales/online-orders/store/saleStore'
import { useModalStore } from '@/shared/stores/modal.store';
import BaseTitle from '@/shared/components/BaseTitle.vue';

// 1. Activa el composable para obtener sus herramientas
const { getSales, getSalesTableColumns } = useSale();
const tablaRef = ref()
const saleStore = useSaleStore()
const modalStore = useModalStore()

// 2. Llama a la función para buscar los datos cuando el componente se monte
onMounted(() => {
    getSales();
 
});

// --- Funciones para los modales (placeholders por ahora) ---
const openCreateModal = () => {
    console.log('Abrir modal para crear venta...');
    saleStore.setData()
    modalStore.open(saleStore.modalId, { type: 'CREATE', title: 'Crear venta' })
   
};
</script>

<template>
    <div>
        <BaseTitle title="Ventas" subtitle="Gestión de Ventas" />

        <div class="mb-10 text-right">
            <BaseButton text="Nueva Venta" @click="openCreateModal" icon="add" />
        </div>

      

        <BaseTable
           
           
            :headers="getSalesTableColumns()"
            :fetch-callback="getSales"

        />

        <UseModal :onRefresh="tablaRef?.fetchData"/>
            <!-- Se pasa getSales para refrescar la tabla tras acciones en el modal -->

      

    </div>
</template>
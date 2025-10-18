<script setup lang="ts">
import { onMounted } from 'vue'
//import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import BaseTable from '@/shared/components/BaseTable.vue'
import InventoryAuditModal from '@inventario/Operacion/AuditoriaDeInventarios/components/InventoryAuditModal.vue'
import CreateOrderManagementButton from '@inventario/Operacion/GestionDePedidos/components/CreateOrderManagementButton.vue'
import { useOrderManagementTableHeaders } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementTableHeaders'
import { useOrderManagementActions } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementActions'
import OrderManagementModal from '@inventario/Operacion/GestionDePedidos/components/OrderManagementModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getOrderManagementRecords } = useOrderManagementActions()
</script>
<template>
    <BaseTitle 
        title="Gestión de pedidos" 
        subtitle="Gestión de gestión de pedidos"
    />
    <div class="mb-10 text-right">
        <CreateOrderManagementButton />
    </div>
    <BaseTable
        :headers="useOrderManagementTableHeaders()"
        :fetch-callback="getOrderManagementRecords"
    />
    <OrderManagementModal />
</template>

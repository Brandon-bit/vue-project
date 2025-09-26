<script setup lang="ts">
import { onMounted } from 'vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import BaseTable from '@/shared/components/BaseTable.vue'
import InventoryAuditModal from '@inventario/Operacion/AuditoriaDeInventarios/components/InventoryAuditModal.vue'
import CreateOrderManagementButton from '@inventario/Operacion/GestionDePedidos/components/CreateOrderManagementButton.vue'
import { useOrderManagementTableHeaders } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementTableHeaders'
import { useOrderManagementActions } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementActions'
import OrderManagementModal from '@inventario/Operacion/GestionDePedidos/components/OrderManagementModal.vue'

const { getOrderManagementRecords } = useOrderManagementActions()
</script>
<template>
    <h2 class="text-center mb-10">Gestión de pedidos</h2>
    <div class="mb-10 text-right">
        <CreateOrderManagementButton />
    </div>
    <BaseTable
        :headers="useOrderManagementTableHeaders()"
        :fetch-callback="getOrderManagementRecords"
    />
    <OrderManagementModal />
</template>

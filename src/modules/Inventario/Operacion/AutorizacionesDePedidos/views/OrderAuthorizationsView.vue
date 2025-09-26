<script setup lang="ts">
import { useOrderAuthorizationsTableHeaders } from '@inventario/Operacion/AutorizacionesDePedidos/composables/useOrderAuthorizationsTableHeaders'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useOrderAuthorizationsActions } from '@inventario/Operacion/AutorizacionesDePedidos/composables/useOrderAuthorizationsActions'
import OrderAuthoizationModal from '@inventario/Operacion/AutorizacionesDePedidos/components/OrderAuthoizationModal.vue'

const { getOrderAuthorizationsRecords } = useOrderAuthorizationsActions()
</script>
<template>
    <h2 class="text-center mb-10 pb-10">Autorizaciones de Pedidos</h2>
    <BaseTable
        :headers="useOrderAuthorizationsTableHeaders()"
        :fetch-callback="getOrderAuthorizationsRecords"
    />
    <OrderAuthoizationModal />
</template>

<script setup lang="ts">
import { useOrderAuthorizationsTableHeaders } from '@inventario/Operacion/AutorizacionesDePedidos/composables/useOrderAuthorizationsTableHeaders'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useOrderAuthorizationsActions } from '@inventario/Operacion/AutorizacionesDePedidos/composables/useOrderAuthorizationsActions'
import OrderAuthoizationModal from '@inventario/Operacion/AutorizacionesDePedidos/components/OrderAuthoizationModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getOrderAuthorizationsRecords } = useOrderAuthorizationsActions()
</script>
<template>
    <BaseTitle 
        title="Autorizaciones de Pedidos" 
        subtitle="Gestión de autorizaciones de pedidos"
    />
    <BaseTable
        :headers="useOrderAuthorizationsTableHeaders()"
        :fetch-callback="getOrderAuthorizationsRecords"
    />
    <OrderAuthoizationModal />
</template>

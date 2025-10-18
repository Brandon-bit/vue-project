<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useInventoryWithdrawalsActions } from '../composables/useInventoryWithdrawalsActions'
import { useTableHeaders } from '@inventario/Operacion/SalidasDeInventario/composables/useTableHeaders'
import CreateInventoryWithdrawalButtton from '../components/CreateInventoryWithdrawalButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getInventoryWithdrawals } = useInventoryWithdrawalsActions()
</script>
<template>
    <BaseTitle 
        title="Salidas de inventario" 
        subtitle="Gestión de salidas de inventario"
    />
    <div class="mb-10 text-right">
        <CreateInventoryWithdrawalButtton />
    </div>
    <BaseTable :headers="useTableHeaders()" :fetch-callback="getInventoryWithdrawals" />
</template>

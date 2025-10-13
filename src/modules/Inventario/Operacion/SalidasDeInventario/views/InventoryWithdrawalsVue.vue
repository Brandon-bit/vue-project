<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useInventoryWithdrawalsActions } from '../composables/useInventoryWithdrawalsActions'
import { useTableHeaders } from '@inventario/Operacion/SalidasDeInventario/composables/useTableHeaders'
import CreateInventoryWithdrawalButtton from '../components/CreateInventoryWithdrawalButton.vue'

const { getInventoryWithdrawals } = useInventoryWithdrawalsActions()
</script>
<template>
    <h2 class="text-center mb-10">Salidas de inventario</h2>
    <div class="mb-10 text-right">
        <CreateInventoryWithdrawalButtton />
    </div>
    <BaseTable :headers="useTableHeaders()" :fetch-callback="getInventoryWithdrawals" />
</template>

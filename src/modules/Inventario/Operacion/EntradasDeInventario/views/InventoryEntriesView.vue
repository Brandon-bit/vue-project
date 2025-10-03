<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useInventoryEntriesActions } from '@inventario/Operacion/EntradasDeInventario/composables/useInventoryEntriesActions'
import { useTableHeaders } from '@inventario/Operacion/EntradasDeInventario/composables/useTableHeaders'
import CreateInventoryEntryButtton from '../components/CreateInventoryEntryButton.vue'

const { getInventoryEntries } = useInventoryEntriesActions()
</script>
<template>
    <h2 class="text-center mb-10">Entradas de inventario</h2>
    <div class="mb-10 text-right">
        <CreateInventoryEntryButtton />
    </div>
    <BaseTable :headers="useTableHeaders()" :fetch-callback="getInventoryEntries" />
</template>

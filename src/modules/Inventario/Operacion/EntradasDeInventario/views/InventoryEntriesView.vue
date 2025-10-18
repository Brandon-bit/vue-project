<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useInventoryEntriesActions } from '@inventario/Operacion/EntradasDeInventario/composables/useInventoryEntriesActions'
import { useTableHeaders } from '@inventario/Operacion/EntradasDeInventario/composables/useTableHeaders'
import CreateInventoryEntryButton from '../components/CreateInventoryEntryButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getInventoryEntries } = useInventoryEntriesActions()
</script>
<template>
    <BaseTitle 
        title="Entradas de inventario" 
        subtitle="Gestión de entradas de inventario"
    />
    <div class="mb-10 text-right">
        <CreateInventoryEntryButton />
    </div>
    <BaseTable :headers="useTableHeaders()" :fetch-callback="getInventoryEntries" />
</template>

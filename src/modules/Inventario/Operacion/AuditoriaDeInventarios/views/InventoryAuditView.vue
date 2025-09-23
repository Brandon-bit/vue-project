<script setup lang="ts">
import { onMounted } from 'vue'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useInventoryAuditTableHeaders } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditTableHeaders'
import BaseTable from '@/shared/components/BaseTable.vue'
import CreateButton from '@inventario/Operacion/AuditoriaDeInventarios/components/CreateButton.vue'
import InventoryAuditModal from '@inventario/Operacion/AuditoriaDeInventarios/components/InventoryAuditModal.vue'

const { getInventoryAuditSummary, getInventoryAuditRecords } = useInventoryAuditActions()
const inventoryAuditStore = useInventoryAuditStore()

onMounted(async () => {
    await getInventoryAuditSummary()
})
</script>
<template>
    <h2 class="text-center mb-10">Auditoría de inventarios</h2>
    <div class="secondary-cards-container grid grid-cols-12 gap-4 md:gap-6 mb-10">
        <div
            v-for="data in inventoryAuditStore.summary"
            class="card bg-base-100 shadow-sm col-span-12 md:col-span-6"
        >
            <div class="card-body">
                <div class="grid grid-rows-2 items-center h-full">
                    <h3 class="card-title row-span-1 !font-semibold mb-5">{{ data.title }}</h3>
                    <p class="text-2xl !font-semibold my-3 row-span-1">{{ data.quantity }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable
        :headers="useInventoryAuditTableHeaders()"
        :fetch-callback="getInventoryAuditRecords"
    />
    <InventoryAuditModal />
</template>

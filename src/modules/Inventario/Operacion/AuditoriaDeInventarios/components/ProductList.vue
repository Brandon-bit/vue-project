<script setup lang="ts">
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import BaseActionButtonTable from '@/shared/components/BaseActionButtonTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()

const showEditProductModal = (index: number) => {
    inventoryAuditStore.setIndexProduct(index)
    inventoryAuditStore.setCurrentProductByIndex(index)
    modalStore.open(inventoryAuditStore.modalId, {
        type: 'UPDATE',
        title: 'Editar producto'
    })
}

const showDeleteProductModal = (index: number) => {
    inventoryAuditStore.setIndexProduct(index)
    modalStore.open(inventoryAuditStore.modalId, {
        type: 'DELETE',
        title: 'Eliminar producto'
    })
}
</script>

<template>
    <div v-if="inventoryAuditStore.addedProducts.length">
        <h3 class="text-center text-lg !font-semibold mb-5">Productos añadidos</h3>
        <div
            tabindex="0"
            class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
        >
            <div class="!block overflow-auto w-full max-w-full">
                <div class="overflow-x-auto">
                    <div class="max-h-[300px] overflow-y-auto">
                        <table class="table text-center w-full min-w-[600px]">
                            <thead class="bg-base-200">
                                <tr>
                                    <th class="sticky top-0 z-10 bg-base-200">Producto Id</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Nombre</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Conteo real</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Conteo esperado</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Diferencia</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Nota</th>
                                    <th class="sticky top-0 z-10 bg-base-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(value, index) in inventoryAuditStore.addedProducts"
                                    :key="index"
                                >
                                    <td>{{ value.productId }}</td>
                                    <td>{{ value.productName }}</td>
                                    <td>{{ value.realCount }}</td>
                                    <td>{{ value.expectedCount }}</td>
                                    <td>{{ value.difference }}</td>
                                    <td>{{ value.note }}</td>
                                    <td>
                                        <div class="flex justify-center gap-4">
                                            <BaseActionButtonTable
                                                icon="edit_square"
                                                variant="info"
                                                tooltipText="Editar"
                                                :onClick="() => showEditProductModal(index)"
                                            />
                                            <BaseActionButtonTable
                                                icon="delete"
                                                variant="error"
                                                tooltipText="Eliminar"
                                                :onClick="() => showDeleteProductModal(index)"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

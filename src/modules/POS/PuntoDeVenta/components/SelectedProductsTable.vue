<script setup lang="ts">
import usePosStore from '@pos/PuntoDeVenta/store/posStore'
import { usePos } from '@pos/PuntoDeVenta/composables/usePos'

const posStore = usePosStore()
const { formatNumber} = usePos()
const updateTotalQuantity = (id: number, type: boolean) => {
    posStore.updateTotalQuantity(id, type)
}

const deletedSelectedProduct = (id: number) => {
    posStore.deletedSelectedProduct(id)
}
</script>
<template>
    <div
        v-if="posStore.selectedProducts.length"
        tabindex="0"
        class="collapse collapse-arrow border border-base-300 rounded-box"
    >
        <div class="!block overflow-auto w-full">
            <div class="overflow-x-auto">
                <table class="table table-fixed text-center w-full">
                    <thead>
                        <tr>
                            <th class="w-30">Producto</th>
                            <th class="w-30">Cantidad</th>
                            <th class="w-20">Base</th>
                            <th class="w-20">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in posStore.selectedProducts" :key="product.id">
                            <td class="text-center">
                                <div class="grid gap-2 grid-cols-2 justify-center items-center">
                                    <span
                                        @click="() => deletedSelectedProduct(product.id)"
                                        class="col-span-1 material-symbols-outlined text-error icon-buy-order cursor-pointer"
                                    >
                                        delete
                                    </span>
                                    <p class="col-span-1">
                                        {{ product.title }}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="flex items-center justify-center gap-2">
                                    <span
                                        @click="() => updateTotalQuantity(product.id, false)"
                                        class="material-symbols-outlined icon-buy-order cursor-pointer"
                                    >
                                        remove_circle
                                    </span>
                                    {{ product.quantity }}
                                    <span
                                        @click="() => updateTotalQuantity(product.id, true)"
                                        class="material-symbols-outlined icon-buy-order cursor-pointer"
                                    >
                                        add_circle
                                    </span>
                                </div>
                            </td>
                            <td class="text-center text-gray-500">
                                {{ formatNumber(product.basePrice) }}
                            </td>
                            <td class="text-center">{{ formatNumber(product.totalPrice) }}</td>
                        </tr>
                        <tr>
                            <td colspan="2">Total:</td>
                            <td colspan="2" class="text-end">
                                $ {{ formatNumber(posStore.totalQuantity) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

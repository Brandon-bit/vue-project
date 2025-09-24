<script setup lang="ts">
import BaseFormRadio from '@/shared/components/BaseFormRadio.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'
import { useForm } from 'vee-validate'
import { usePos } from '@pos/PuntoDeVenta/composables/usePos'

const posStore = usePosStore()
const { handleSubmit, isSubmitting } = useForm()

const onSubmit = handleSubmit(async () => {
    console.log('Registra el pedido')
})

const { formatNumber } = usePos()

const labelOption = (icon: string, text: string, color: string = '') => {
    return `
        <p class="flex items-center">
            <span class="material-symbols-outlined ${color} me-2">
                ${icon}
            </span>
            ${text}
        </p>
    `
}
const paymentOptions = [
    { value: '1', label: labelOption('local_atm', 'Efectivo', 'text-success') },
    { value: '2', label: labelOption('credit_card', 'Tarjeta', 'text-warning') },
    { value: '3', label: labelOption('compare_arrows', 'Transferencia', 'text-info') }
]

const onClose = () => {}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="posStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <BaseFormRadio
                name="paymentType"
                label="Tipo de pago"
                :options="paymentOptions"
                type="flex-row"
            />
            <div class="collapse collapse-arrow bg-base-100 border-base-300 border mt-8">
                <input type="checkbox" />
                <div class="collapse-title font-semibold">Resumen de compra</div>
                <div class="collapse-content text-sm">
                    <div tabindex="0" class="collapse collapse-arrow">
                        <div class="!block overflow-auto w-full">
                            <div class="overflow-x-auto">
                                <table class="table table-fixed text-center w-full">
                                    <thead>
                                        <tr>
                                            <th class="w-40">Producto</th>
                                            <th class="w-20">Cantidad</th>
                                            <th class="w-20">Base</th>
                                            <th class="w-20">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="product in posStore.selectedProducts"
                                            :key="product.id"
                                        >
                                            <td class="text-center">
                                                <div class="text-center">
                                                    {{ product.title }}
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex items-center justify-center gap-2">
                                                    {{ product.quantity }}
                                                </div>
                                            </td>
                                            <td class="text-center text-gray-500">
                                                {{ formatNumber(product.basePrice) }}
                                            </td>
                                            <td class="text-center">
                                                {{ formatNumber(product.totalPrice) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-center">
                Total de compra:
                <span class="!font-semibold text-lg">
                    $ {{ formatNumber(posStore.totalQuantity) }}
                </span>
            </p>
        </template>
    </BaseModal>
</template>

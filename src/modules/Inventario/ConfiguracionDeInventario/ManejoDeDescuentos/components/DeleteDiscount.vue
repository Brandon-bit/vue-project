<template>
    <div class="text-center space-y-4">
        <div class="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
                <h3 class="font-bold">¿Está seguro de eliminar este descuento?</h3>
                <div class="text-xs">Esta acción no se puede deshacer.</div>
            </div>
        </div>

        <div class="bg-base-200 p-4 rounded-lg">
            <h4 class="font-semibold text-lg">{{ discountStore.selectedDiscount.name }}</h4>
            <div class="text-sm text-gray-600 space-y-1 mt-2">
                <p><strong>Tipo:</strong> {{ getDiscountTypeLabel(discountStore.selectedDiscount.type) }}</p>
                <p><strong>Valor:</strong> {{ getDiscountValueDisplay(discountStore.selectedDiscount) }}</p>
                <p><strong>Estado:</strong> {{ getDiscountStatusLabel(discountStore.selectedDiscount.status) }}</p>
                <p v-if="discountStore.selectedDiscount.description">
                    <strong>Descripción:</strong> {{ discountStore.selectedDiscount.description }}
                </p>
            </div>
        </div>

        <div class="text-sm text-gray-500">
            Se eliminará permanentemente este descuento del sistema.
        </div>
    </div>
</template>

<script setup lang="ts">
import useDiscountStore from '../store/discount.store'
import { DiscountType, DiscountStatus, type Discount } from '../types/discountTypes'

const discountStore = useDiscountStore()

const getDiscountTypeLabel = (type: DiscountType) => {
    const labels = {
        'PERCENTAGE': 'Porcentaje',
        'FIXED_AMOUNT': 'Monto Fijo',
        'VOLUME': 'Por Volumen',
        'MIN_QUANTITY': 'Cantidad Mínima',
        'MIN_AMOUNT': 'Monto Mínimo'
    }
    return labels[type] || type
}

const getDiscountStatusLabel = (status: DiscountStatus) => {
    const labels = {
        'ACTIVE': 'Activo',
        'INACTIVE': 'Inactivo',
        'EXPIRED': 'Expirado'
    }
    return labels[status] || status
}

const getDiscountValueDisplay = (discount: Discount) => {
    if (discount.type === 'PERCENTAGE') {
        return `${discount.value}%`
    }
    return `$${discount.value}`
}
</script>

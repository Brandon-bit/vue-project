<script setup lang="ts">
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'

const payrollDetailStore = usePayrollDetailStore()
</script>

<template>
    <div class="text-center">
        <p class="text-lg mb-4">
            ¿Está seguro que desea eliminar este concepto?
        </p>
        <div class="bg-gray-100 p-4 rounded-lg mb-4">
            <p class="text-sm">
                <strong>Concepto:</strong> {{ payrollDetailStore.selectedPayrollDetail?.conceptName }}
            </p>
            <p class="text-sm">
                <strong>Monto:</strong> ${{ payrollDetailStore.selectedPayrollDetail?.amount?.toFixed(2) }}
            </p>
            <p class="text-sm">
                <strong>Tipo:</strong> {{ payrollDetailStore.selectedPayrollDetail?.type === 'percepcion' ? 'Percepción' : 'Deducción' }}
            </p>
        </div>
        <p class="text-sm text-red-500">Esta acción no se puede deshacer.</p>
    </div>
</template>

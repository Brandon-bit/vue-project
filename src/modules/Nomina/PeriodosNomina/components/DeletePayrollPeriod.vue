<script setup lang="ts">
import usePayrollPeriodStore from '@/modules/Nomina/PeriodosNomina/store/payrollPeriodStore'

const payrollPeriodStore = usePayrollPeriodStore()
</script>

<template>
    <div class="text-center">
        <p class="text-lg mb-4">
            ¿Está seguro que desea eliminar el período
            <strong>{{ payrollPeriodStore.selectedPayrollPeriod?.name }}</strong>?
        </p>
        <p class="text-sm text-gray-500 mb-2">
            Período: {{ payrollPeriodStore.selectedPayrollPeriod?.startDate }} al 
            {{ payrollPeriodStore.selectedPayrollPeriod?.endDate }}
        </p>
        <p class="text-sm text-red-500 font-semibold">
            Esta acción no se puede deshacer y eliminará todos los datos asociados.
        </p>
    </div>
</template>

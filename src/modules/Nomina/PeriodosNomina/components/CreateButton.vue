<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import usePayrollPeriodStore from '@/modules/Nomina/PeriodosNomina/store/payrollPeriodStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const payrollPeriodStore = usePayrollPeriodStore()

const openCreateModal = () => {
    payrollPeriodStore.setData()
    modalStore.open(payrollPeriodStore.modalId, { type: 'CREATE', title: 'Nuevo período de nómina' })
}
</script>

<template>
    <BaseButton text="Nuevo período" @click="openCreateModal" icon="add" />
</template>

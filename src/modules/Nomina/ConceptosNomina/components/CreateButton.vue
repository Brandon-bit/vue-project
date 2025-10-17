<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import usePayrollConceptStore from '@/modules/Nomina/ConceptosNomina/store/payrollConceptStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const payrollConceptStore = usePayrollConceptStore()

const openCreateModal = () => {
    payrollConceptStore.setData()
    modalStore.open(payrollConceptStore.modalId, { type: 'CREATE', title: 'Nuevo concepto de nómina' })
}
</script>

<template>
    <BaseButton text="Nuevo concepto" @click="openCreateModal" icon="add" />
</template>

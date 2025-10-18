<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ExpensePolicyModal from '@/modules/Contabilidad/PolizasDeGastos/components/ExpensePolicyModal.vue'
import useExpensePolicies from '@/modules/Contabilidad/PolizasDeGastos/composables/useExpensePolicies'
import useExpensePoliciesStore from '@/modules/Contabilidad/PolizasDeGastos/store/expensePoliciesStore'
import { useExpensePoliciesActions } from '@/modules/Contabilidad/PolizasDeGastos/composables/useExpensePoliciesActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useExpensePolicies()
const { getExpensePolicies } = useExpensePoliciesActions()

const expensePoliciesStore = useExpensePoliciesStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    expensePoliciesStore.setData()
    modalStore.open(expensePoliciesStore.modalId, { type: 'CREATE', title: 'Nueva póliza de gasto' })
}
</script>

<template>
    <BaseTitle title="Pólizas de Gastos" subtitle="Gestión y control de pólizas contables" />

    <div class="mb-10 text-right">
        <BaseButton text="Nueva póliza de gasto" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getExpensePolicies"
    />
    <ExpensePolicyModal :onRefresh="tablaRef?.fetchData"/>
</template>

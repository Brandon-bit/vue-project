<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import IncomePolicyModal from '@/modules/Contabilidad/PolizasDeIngresos/components/IncomePolicyModal.vue'
import useIncomePolicies from '@/modules/Contabilidad/PolizasDeIngresos/composables/useIncomePolicies'
import useIncomePoliciesStore from '@/modules/Contabilidad/PolizasDeIngresos/store/incomePoliciesStore'
import { useIncomePoliciesActions } from '@/modules/Contabilidad/PolizasDeIngresos/composables/useIncomePoliciesActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useIncomePolicies()
const { getIncomePolicies } = useIncomePoliciesActions()

const incomePoliciesStore = useIncomePoliciesStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    incomePoliciesStore.setData()
    modalStore.open(incomePoliciesStore.modalId, { type: 'CREATE', title: 'Nueva póliza de ingreso' })
}
</script>

<template>
    <BaseTitle title="Pólizas de Ingresos" subtitle="Gestión y control de pólizas contables" />

    <div class="mb-10 text-right">
        <BaseButton text="Nueva póliza de ingreso" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getIncomePolicies"
    />
    <IncomePolicyModal :onRefresh="tablaRef?.fetchData"/>
</template>

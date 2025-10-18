<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import JournalPolicyModal from '@/modules/Contabilidad/PolizasDeDiario/components/JournalPolicyModal.vue'
import useJournalPolicies from '@/modules/Contabilidad/PolizasDeDiario/composables/useJournalPolicies'
import useJournalPoliciesStore from '@/modules/Contabilidad/PolizasDeDiario/store/journalPoliciesStore'
import { useJournalPoliciesActions } from '@/modules/Contabilidad/PolizasDeDiario/composables/useJournalPoliciesActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useJournalPolicies()
const { getJournalPolicies } = useJournalPoliciesActions()

const journalPoliciesStore = useJournalPoliciesStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    journalPoliciesStore.setData()
    modalStore.open(journalPoliciesStore.modalId, { type: 'CREATE', title: 'Crear póliza de diario' })
}
</script>

<template>
    <BaseTitle title="Pólizas de Diario" subtitle="Gestión y control de pólizas contables" />

    <div class="mb-10 text-right">
        <BaseButton text="Crear póliza de diario" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getJournalPolicies"
    />
    <JournalPolicyModal :onRefresh="tablaRef?.fetchData"/>
</template>

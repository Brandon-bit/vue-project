<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import AccountingPolicyModal from '@/modules/Contabilidad/PolizasContables/components/AccountingPolicyModal.vue'
import useAccountingPolicies from '@/modules/Contabilidad/PolizasContables/composables/useAccountingPolicies'
import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'

const { getTableColumns } = useAccountingPolicies()
const { getAccountingPolicies } = useAccountingPoliciesActions()

const accountingPoliciesStore = useAccountingPoliciesStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    accountingPoliciesStore.setData()
    accountingPoliciesStore.setEditMode(false)
    modalStore.open(accountingPoliciesStore.modalId, { type: 'CREATE', title: 'Nueva Póliza Contable' })
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold">Pólizas Contables</h2>
                <p class="text-gray-500 mt-1">
                    Registro y gestión de movimientos contables
                </p>
            </div>
            <BaseButton text="Nueva Póliza" @click="openCreateModal" icon="add" />
        </div>

        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="getAccountingPolicies"
        />
        <AccountingPolicyModal :onRefresh="tablaRef?.fetchData"/>
    </div>
</template>

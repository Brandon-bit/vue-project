<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteExpense from '@/modules/Administracion/CajaChica/components/DeleteExpense.vue'
import ApproveExpense from '@/modules/Administracion/CajaChica/components/ApproveExpense.vue'
import ExpenseForm from '@/modules/Administracion/CajaChica/components/ExpenseForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { expenseSchema } from '@/modules/Administracion/CajaChica/validations/pettycashValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePettyCashActions } from '@/modules/Administracion/CajaChica/composables/usePettyCashActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const pettyCashStore = usePettyCashStore()
const modalStore = useModalStore()
const { createExpense, editExpense, deleteExpense, approveExpense, rejectExpense } = usePettyCashActions()

const initialValues = {
    pettyBoxId: pettyCashStore.selectedExpense?.pettyBoxId || 0,
    date: pettyCashStore.selectedExpense?.date ? new Date(pettyCashStore.selectedExpense.date).toISOString().split('T')[0] : '',
    concept: pettyCashStore.selectedExpense?.concept || '',
    amount: pettyCashStore.selectedExpense?.amount || 0,
    costCenter: pettyCashStore.selectedExpense?.costCenter || '',
    description: pettyCashStore.selectedExpense?.description || '',
    removeReceipt: false
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(expenseSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => pettyCashStore.selectedExpense,
    (expense) => {
        if (expense) {
            setValues({
                pettyBoxId: expense?.pettyBoxId || 0,
                date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : '',
                concept: expense?.concept || '',
                amount: expense?.amount || 0,
                costCenter: expense?.costCenter || '',
                description: expense?.description || '',
                removeReceipt: false
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: ExpenseForm,
        action: createExpense,
        showFooter: true
    },
    EDIT: {
        component: ExpenseForm,
        action: editExpense,
        showFooter: true
    },
    DELETE: {
        component: DeleteExpense,
        action: deleteExpense,
        showFooter: true
    },
    APPROVE: {
        component: ApproveExpense,
        action: null,
        showFooter: false
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[pettyCashStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const showFooter = computed(() => {
    const modalType = modalStore.modals[pettyCashStore.modalId]?.type as keyof typeof modalMap
    return modalType ? (modalMap[modalType]?.showFooter ?? true) : true
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[pettyCashStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : null
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(pettyCashStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const handleApprove = async () => {
    try {
        const { message, status } = await approveExpense()
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(pettyCashStore.modalId)
    } catch (error) {
        console.error(error)
    }
}

const handleReject = async () => {
    try {
        const { message, status } = await rejectExpense()
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(pettyCashStore.modalId)
    } catch (error) {
        console.error(error)
    }
}

const onClose = () => {
    resetForm()
    pettyCashStore.setData()
}

const isApprovalModal = computed(() => {
    return modalStore.modals[pettyCashStore.modalId]?.type === 'APPROVE'
})

</script>
<template>
    <BaseModal
        :onSubmit="showFooter ? onSubmit : undefined"
        :modalId="pettyCashStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
        
        <template v-if="isApprovalModal" v-slot:modalFooter>
            <div class="flex gap-2 justify-end">
                <button @click="handleReject" class="btn btn-error">
                    <span class="material-symbols-outlined">cancel</span>
                    Rechazar
                </button>
                <button @click="handleApprove" class="btn btn-success">
                    <span class="material-symbols-outlined">check_circle</span>
                    Aprobar
                </button>
            </div>
        </template>
    </BaseModal>
</template>

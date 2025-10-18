<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useExpenseStore from '@/modules/Administracion/ViaticosYReembolsos/store/expenseStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteExpense from '@/modules/Administracion/ViaticosYReembolsos/components/DeleteExpense.vue'
import ExpenseForm from '@/modules/Administracion/ViaticosYReembolsos/components/ExpenseForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { expenseSchema } from '@/modules/Administracion/ViaticosYReembolsos/validations/expenseValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useExpenseActions } from '@/modules/Administracion/ViaticosYReembolsos/composables/useExpenseActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const expenseStore = useExpenseStore()
const modalStore = useModalStore()
const { createExpense, editExpense, deleteExpense } = useExpenseActions()

const initialValues = {
    concept: expenseStore.selectedExpense?.concept || '',
    date: expenseStore.selectedExpense?.date ? new Date(expenseStore.selectedExpense.date).toISOString().split('T')[0] : '',
    amount: expenseStore.selectedExpense?.amount || 0,
    category: expenseStore.selectedExpense?.category || '',
    description: expenseStore.selectedExpense?.description || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(expenseSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => expenseStore.selectedExpense,
    (expense) => {
        if (expense) {
            setValues({
                concept: expense?.concept || '',
                date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : '',
                amount: expense?.amount || 0,
                category: expense?.category || '',
                description: expense?.description || ''
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
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[expenseStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const showFooter = computed(() => {
    const modalType = modalStore.modals[expenseStore.modalId]?.type as keyof typeof modalMap
    return modalType ? (modalMap[modalType]?.showFooter ?? true) : true
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[expenseStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : null
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(expenseStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    expenseStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="showFooter ? onSubmit : undefined"
        :modalId="expenseStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :showFooter="showFooter"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

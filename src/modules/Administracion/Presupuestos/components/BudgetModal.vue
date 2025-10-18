<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBudgetStore from '@/modules/Administracion/Presupuestos/store/budgetStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteBudget from '@/modules/Administracion/Presupuestos/components/DeleteBudget.vue'
import BudgetForm from '@/modules/Administracion/Presupuestos/components/BudgetForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { budgetSchema } from '@/modules/Administracion/Presupuestos/validations/budgetValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBudgetActions } from '@/modules/Administracion/Presupuestos/composables/useBudgetActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const budgetStore = useBudgetStore()
const modalStore = useModalStore()
const { createBudget, editBudget, deleteBudget } = useBudgetActions()

const initialValues = {
    area: budgetStore.selectedBudget?.area || '',
    budgeted: budgetStore.selectedBudget?.budgeted || 0,
    fiscalYear: budgetStore.selectedBudget?.fiscalYear || new Date().getFullYear(),
    description: ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(budgetSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => budgetStore.selectedBudget,
    (budget) => {
        if (budget) {
            setValues({
                area: budget?.area || '',
                budgeted: budget?.budgeted || 0,
                fiscalYear: budget?.fiscalYear || new Date().getFullYear(),
                description: ''
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: BudgetForm,
        action: createBudget
    },
    EDIT: {
        component: BudgetForm,
        action: editBudget
    },
    DELETE: {
        component: DeleteBudget,
        action: deleteBudget
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[budgetStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[budgetStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : null
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(budgetStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    budgetStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="budgetStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

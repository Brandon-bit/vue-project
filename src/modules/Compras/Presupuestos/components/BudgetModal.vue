<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBudgetStore from '@/modules/Compras/Presupuestos/store/budgetStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BudgetForm from '@/modules/Compras/Presupuestos/components/BudgetForm.vue'
import BudgetDetail from '@/modules/Compras/Presupuestos/components/BudgetDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { budgetSchema } from '@/modules/Compras/Presupuestos/validations/budgetValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBudgetActions } from '@/modules/Compras/Presupuestos/composables/useBudgetActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const budgetStore = useBudgetStore()
const modalStore = useModalStore()
const { createBudget } = useBudgetActions()

const initialValues = {
    area: '',
    proyecto: '',
    periodo: '',
    asignado: 0
}

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(budgetSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => modalStore.modals[budgetStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
        }
    }
)

const modalMap = {
    CREATE: {
        component: BudgetForm,
        action: createBudget
    },
    DETAIL: {
        component: BudgetDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[budgetStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[budgetStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    
    if (!action) {
        // Si es DETAIL, solo cerrar el modal
        modalStore.close(budgetStore.modalId)
        return
    }
    
    try {
        const result = await action(formValues)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(budgetStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al crear el presupuesto', 'error')
    }
})

const onClose = () => {
    resetForm()
    budgetStore.reset()
    budgetStore.setSelectedBudget(null)
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

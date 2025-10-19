<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useStrategyStore from '../store/strategyStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteObjective from './DeleteObjective.vue'
import AddEditObjectiveForm from './AddEditObjectiveForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { objectiveSchema } from '../validations/strategyValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const strategyStore = useStrategyStore()
const modalStore = useModalStore()

const initialValues = {
    name: strategyStore.selectedObjective?.name || '',
    description: strategyStore.selectedObjective?.description || '',
    specific: strategyStore.selectedObjective?.specific || false,
    measurable: strategyStore.selectedObjective?.measurable || false,
    achievable: strategyStore.selectedObjective?.achievable || false,
    relevant: strategyStore.selectedObjective?.relevant || false,
    timeBound: strategyStore.selectedObjective?.timeBound || false,
    perspective: strategyStore.selectedObjective?.perspective || '0',
    kpi: strategyStore.selectedObjective?.kpi || '',
    target: strategyStore.selectedObjective?.target || '',
    deadline: strategyStore.selectedObjective?.deadline || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(objectiveSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => strategyStore.selectedObjective,
    (item) => {
        if (item) {
            setValues({
                name: item.name,
                description: item.description,
                specific: item.specific,
                measurable: item.measurable,
                achievable: item.achievable,
                relevant: item.relevant,
                timeBound: item.timeBound,
                perspective: item.perspective,
                kpi: item.kpi,
                target: item.target,
                deadline: item.deadline
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditObjectiveForm,
        action: async (values: any) => {
            console.log('Create Objective:', values)
            return { message: 'Objetivo creado exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditObjectiveForm,
        action: async (values: any) => {
            console.log('Edit Objective:', values)
            return { message: 'Objetivo actualizado exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteObjective,
        action: async () => {
            console.log('Delete Objective')
            return { message: 'Objetivo eliminado exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[strategyStore.objectiveModalId]?.type
    if (!modalType) return AddEditObjectiveForm
    return modalMap[modalType]?.component || AddEditObjectiveForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[strategyStore.objectiveModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(strategyStore.objectiveModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    strategyStore.setObjectiveData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="strategyStore.objectiveModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

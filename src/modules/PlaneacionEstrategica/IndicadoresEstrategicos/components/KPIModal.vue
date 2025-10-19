<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useKPIStore from '../store/kpiStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteKPI from './DeleteKPI.vue'
import AddEditKPIForm from './AddEditKPIForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { kpiSchema } from '../validations/kpiValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const kpiStore = useKPIStore()
const modalStore = useModalStore()

const initialValues = {
    name: kpiStore.selectedKPI?.name || '',
    description: kpiStore.selectedKPI?.description || '',
    type: kpiStore.selectedKPI?.type || '0',
    perspective: kpiStore.selectedKPI?.perspective || '0',
    objective: kpiStore.selectedKPI?.objective || '',
    target: kpiStore.selectedKPI?.target || 0,
    unit: kpiStore.selectedKPI?.unit || '%',
    frequency: kpiStore.selectedKPI?.frequency || '0',
    dataSource: kpiStore.selectedKPI?.dataSource || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(kpiSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => kpiStore.selectedKPI,
    (item) => {
        if (item) {
            setValues({
                name: item.name,
                description: item.description,
                type: item.type,
                perspective: item.perspective,
                objective: item.objective,
                target: item.target,
                unit: item.unit,
                frequency: item.frequency,
                dataSource: item.dataSource
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditKPIForm,
        action: async (values: any) => {
            console.log('Create KPI:', values)
            return { message: 'Indicador creado exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditKPIForm,
        action: async (values: any) => {
            console.log('Edit KPI:', values)
            return { message: 'Indicador actualizado exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteKPI,
        action: async () => {
            console.log('Delete KPI')
            return { message: 'Indicador eliminado exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[kpiStore.kpiModalId]?.type
    if (!modalType) return AddEditKPIForm
    return modalMap[modalType]?.component || AddEditKPIForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[kpiStore.kpiModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(kpiStore.kpiModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    kpiStore.setKPIData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="kpiStore.kpiModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

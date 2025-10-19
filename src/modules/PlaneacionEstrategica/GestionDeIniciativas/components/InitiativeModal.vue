<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useInitiativeStore from '../store/initiativeStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteInitiative from './DeleteInitiative.vue'
import AddEditInitiativeForm from './AddEditInitiativeForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { initiativeSchema } from '../validations/initiativeValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const initiativeStore = useInitiativeStore()
const modalStore = useModalStore()

const initialValues = {
    name: initiativeStore.selectedInitiative?.name || '',
    description: initiativeStore.selectedInitiative?.description || '',
    objective: initiativeStore.selectedInitiative?.objective || '',
    leader: initiativeStore.selectedInitiative?.leader || '',
    startDate: initiativeStore.selectedInitiative?.startDate || '',
    endDate: initiativeStore.selectedInitiative?.endDate || '',
    budget: initiativeStore.selectedInitiative?.budget || '',
    status: initiativeStore.selectedInitiative?.status || '0'
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(initiativeSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => initiativeStore.selectedInitiative,
    (item) => {
        if (item) {
            setValues({
                name: item.name,
                description: item.description,
                objective: item.objective,
                leader: item.leader,
                startDate: item.startDate,
                endDate: item.endDate,
                budget: item.budget,
                status: item.status
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditInitiativeForm,
        action: async (values: any) => {
            console.log('Create Initiative:', values)
            return { message: 'Iniciativa creada exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditInitiativeForm,
        action: async (values: any) => {
            console.log('Edit Initiative:', values)
            return { message: 'Iniciativa actualizada exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteInitiative,
        action: async () => {
            console.log('Delete Initiative')
            return { message: 'Iniciativa eliminada exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[initiativeStore.initiativeModalId]?.type
    if (!modalType) return AddEditInitiativeForm
    return modalMap[modalType]?.component || AddEditInitiativeForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[initiativeStore.initiativeModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(initiativeStore.initiativeModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    initiativeStore.setInitiativeData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="initiativeStore.initiativeModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

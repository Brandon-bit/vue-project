<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useInitiativeStore from '../store/initiativeStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import ConvertToProjectForm from './ConvertToProjectForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { projectSchema } from '../validations/initiativeValidation'
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
    budget: initiativeStore.selectedInitiative?.budget || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(projectSchema),
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
                budget: item.budget
            })
        }
    },
    { immediate: true }
)

const currentModalComponent = computed(() => ConvertToProjectForm)

const onSubmit = handleSubmit(async (formValues) => {
    try {
        console.log('Convert to Project:', formValues)
        showNotification('Proyecto creado exitosamente', 'success')
        if (props.onRefresh) props.onRefresh()
        modalStore.close(initiativeStore.convertModalId)
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
        :modalId="initiativeStore.convertModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

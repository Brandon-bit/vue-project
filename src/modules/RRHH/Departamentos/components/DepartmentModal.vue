<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDepartmentStore from '@/modules/RRHH/Departamentos/store/departmentStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DepartmentForm from '@/modules/RRHH/Departamentos/components/DepartmentForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateDepartmentSchema } from '@/modules/RRHH/Departamentos/validations/departmentValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useDepartmentActions } from '@/modules/RRHH/Departamentos/composables/useDepartmentActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const departmentStore = useDepartmentStore()
const modalStore = useModalStore()
const { createDepartment, updateDepartment } = useDepartmentActions()
const mode = computed(() => modalStore.modals[departmentStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: DepartmentForm,
        action: createDepartment,
        schemaValidation: createUpdateDepartmentSchema
    },
    UPDATE: {
        component: DepartmentForm,
        action: updateDepartment,
        schemaValidation: createUpdateDepartmentSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: departmentStore.selectedDepartment?.name || '',
    description: departmentStore.selectedDepartment?.description || '',
    active: departmentStore.selectedDepartment?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => departmentStore.selectedDepartment,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ name: '', description: '', active: true })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[departmentStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[departmentStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(departmentStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    departmentStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="departmentStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

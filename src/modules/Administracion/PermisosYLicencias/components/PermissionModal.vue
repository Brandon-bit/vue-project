<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeletePermission from '@/modules/Administracion/PermisosYLicencias/components/DeletePermission.vue'
import PermissionForm from '@/modules/Administracion/PermisosYLicencias/components/PermissionForm.vue'
import PermissionTypeSelector from '@/modules/Administracion/PermisosYLicencias/components/PermissionTypeSelector.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { permissionSchema } from '@/modules/Administracion/PermisosYLicencias/validations/permissionValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePermissionActions } from '@/modules/Administracion/PermisosYLicencias/composables/usePermissionActions'
import { showNotification } from '@/utils/toastNotifications'
import type { PermissionTypeInfo } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

const props = defineProps<{
    onRefresh?: () => void
    permissionTypes: PermissionTypeInfo[]
}>()

const permissionStore = usePermissionStore()
const modalStore = useModalStore()
const { createPermission, editPermission, deletePermission } = usePermissionActions()

const initialValues = {
    permissionType: permissionStore.selectedPermissionType || '',
    resource: permissionStore.selectedPermission?.resource || '',
    startDate: permissionStore.selectedPermission?.startDate ? new Date(permissionStore.selectedPermission.startDate).toISOString().split('T')[0] : '',
    endDate: permissionStore.selectedPermission?.endDate ? new Date(permissionStore.selectedPermission.endDate).toISOString().split('T')[0] : '',
    reason: permissionStore.selectedPermission?.reason || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(permissionSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => permissionStore.selectedPermission,
    (permission) => {
        if (permission) {
            setValues({
                permissionType: permissionStore.selectedPermissionType || '',
                resource: permission?.resource || '',
                startDate: permission?.startDate ? new Date(permission.startDate).toISOString().split('T')[0] : '',
                endDate: permission?.endDate ? new Date(permission.endDate).toISOString().split('T')[0] : '',
                reason: permission?.reason || ''
            })
        }
    },
    { immediate: true }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[permissionStore.modalId]?.type as 'CREATE' | 'EDIT' | 'DELETE'
    
    if (modalType === 'CREATE') {
        return permissionStore.selectedPermissionType ? PermissionForm : PermissionTypeSelector
    }
    if (modalType === 'EDIT') {
        return PermissionForm
    }
    if (modalType === 'DELETE') {
        return DeletePermission
    }
    return undefined
})

const showFooter = computed(() => {
    const modalType = modalStore.modals[permissionStore.modalId]?.type as 'CREATE' | 'EDIT' | 'DELETE'
    
    if (modalType === 'CREATE') {
        return !!permissionStore.selectedPermissionType
    }
    return true
})

const modalAction = computed(() => {
    const modalType = modalStore.modals[permissionStore.modalId]?.type as 'CREATE' | 'EDIT' | 'DELETE'
    
    if (modalType === 'CREATE') return createPermission
    if (modalType === 'EDIT') return editPermission
    if (modalType === 'DELETE') return deletePermission
    return null
})

const onSubmit = handleSubmit(async (formValues) => {
    const action = modalAction.value
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(permissionStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    permissionStore.setData()
    permissionStore.setSelectedPermissionType('')
}

const handleTypeSelect = (typeId: string) => {
    permissionStore.setSelectedPermissionType(typeId as any)
}

</script>
<template>
    <BaseModal
        :onSubmit="showFooter ? onSubmit : undefined"
        :modalId="permissionStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :showFooter="showFooter"
    >
        <template v-slot:modalBody>
            <component 
                :is="currentModalComponent" 
                :types="permissionTypes"
                :permissionTypes="permissionTypes"
                @select="handleTypeSelect"
            />
        </template>
    </BaseModal>
</template>

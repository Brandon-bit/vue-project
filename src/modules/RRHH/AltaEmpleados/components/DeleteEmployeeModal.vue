<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useEmployeeActions } from '@/modules/RRHH/AltaEmpleados/composables/useEmployeeActions'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { deleteEmployee } = useEmployeeActions()

const isSubmitting = computed(() => false)

const employeeData = computed(() => {
    return modalStore.modals[props.modalId]?.data || {}
})

const handleDelete = async () => {
    try {
        const result = await deleteEmployee(employeeData.value.id)
        console.log('Delete result:', result)
        
        if (result.success) {
            // Close modal
            modalStore.close(props.modalId)
            
            // Refresh table
            if (props.onRefresh) {
                props.onRefresh()
            }
        }
    } catch (error) {
        console.error('Error deleting employee:', error)
    }
}

const handleClose = () => {
    modalStore.close(props.modalId)
}
</script>

<template>
    <BaseModal
        :modal-id="modalId"
        :on-submit="handleDelete"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
    >
        <template #modalBody>
            <div class="space-y-4">
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">warning</span>
                    <span>Esta acción no se puede deshacer</span>
                </div>
                
                <div class="text-center">
                    <p class="text-lg mb-4">
                        ¿Estás seguro de que deseas eliminar al empleado?
                    </p>
                    <div class="bg-base-200 p-4 rounded-lg">
                        <p class="font-bold text-xl">
                            {{ employeeData.fullName }}
                        </p>
                        <p class="text-sm text-base-content/70">
                            {{ employeeData.employeeNumber }} - {{ employeeData.position }}
                        </p>
                        <p class="text-sm text-base-content/70">
                            {{ employeeData.email }}
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

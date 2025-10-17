<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import DeleteCommunicationContent from '@/modules/RRHH/ComunicacionesOrganizacionales/components/DeleteCommunicationContent.vue'
import DetailCommunicationContent from '@/modules/RRHH/ComunicacionesOrganizacionales/components/DetailCommunicationContent.vue'
import { useCommunicationActions } from '@/modules/RRHH/ComunicacionesOrganizacionales/composables/useCommunicationActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { deleteCommunication } = useCommunicationActions()

const isSubmitting = computed(() => false)

const modalMap: Record<string, any> = {
    DELETE: {
        component: DeleteCommunicationContent,
        action: async () => {
            const data = modalStore.modals[props.modalId]?.data
            const result = await deleteCommunication(data.id)
            if (result.success) {
                showNotification('Comunicado eliminado exitosamente', 'success')
                props.onRefresh?.()
            }
            return result
        }
    },
    DETAIL: {
        component: DetailCommunicationContent,
        action: async () => {
            // No action needed for detail view
            return { success: true }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[props.modalId]?.type || 'DETAIL'
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[props.modalId]?.type || 'DETAIL'
    const action = modalMap[modalType]?.action

    if (action) {
        try {
            await action()
            modalStore.close(props.modalId)
        } catch (error) {
            console.error('Error in modal action:', error)
        }
    } else {
        modalStore.close(props.modalId)
    }
}

const onClose = () => {
    modalStore.close(props.modalId)
}
</script>

<template>
    <BaseModal
        :modal-id="modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="isSubmitting"
    >
        <template #modalBody>
            <component :is="currentModalComponent" :modal-id="modalId" />
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteDocument from '@/modules/Administracion/GestionDocumental/components/DeleteDocument.vue'
import DocumentForm from '@/modules/Administracion/GestionDocumental/components/DocumentForm.vue'
import ViewDocument from '@/modules/Administracion/GestionDocumental/components/ViewDocument.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { documentSchema } from '@/modules/Administracion/GestionDocumental/validations/documentValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useDocumentActions } from '@/modules/Administracion/GestionDocumental/composables/useDocumentActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const documentStore = useDocumentStore()
const modalStore = useModalStore()
const { uploadDocument, editDocument, deleteDocument } = useDocumentActions()

const initialValues = {
    name: documentStore.selectedDocument?.name || '',
    category: documentStore.selectedDocument?.category || '',
    documentType: '',
    tags: documentStore.selectedDocument?.tags?.join(', ') || '',
    description: documentStore.selectedDocument?.description || '',
    confidential: documentStore.selectedDocument?.confidential || false
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(documentSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => documentStore.selectedDocument,
    (document) => {
        if (document) {
            setValues({
                name: document?.name || '',
                category: document?.category || '',
                documentType: '',
                tags: document?.tags?.join(', ') || '',
                description: document?.description || '',
                confidential: document?.confidential || false
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: DocumentForm,
        action: uploadDocument,
        showFooter: true
    },
    EDIT: {
        component: DocumentForm,
        action: editDocument,
        showFooter: true
    },
    DELETE: {
        component: DeleteDocument,
        action: deleteDocument,
        showFooter: true
    },
    VIEW: {
        component: ViewDocument,
        action: null,
        showFooter: false
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[documentStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const showFooter = computed(() => {
    const modalType = modalStore.modals[documentStore.modalId]?.type as keyof typeof modalMap
    return modalType ? (modalMap[modalType]?.showFooter ?? true) : true
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[documentStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : null
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(documentStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    documentStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="showFooter ? onSubmit : undefined"
        :modalId="documentStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :showFooter="showFooter"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

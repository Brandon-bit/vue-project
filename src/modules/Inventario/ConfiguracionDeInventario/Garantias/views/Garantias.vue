<script setup lang="ts">
// #region Imports
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useWarranty } from '../composables/useWarranty'
import { useWarrantyActions } from '../composables/useWarrantyActions'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useWarrantyStore from '../store/warranty.store'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditWarrantyForm from '../components/AddEditWarrantyForm.vue'
import DeleteWarranty from '../components/DeleteWarranty.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createWarrantySchema } from '../validation/warrantyValidation'
import { WarrantyType } from '../types/warrantyType'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getWarranties, getWarrantiesTableColumns } = useWarranty()
const { createWarranty, editWarranty, deleteWarranty } = useWarrantyActions()
const modalStore = useModalStore()
const warrantyStore = useWarrantyStore()

const initialValues : WarrantyType = {
    name: warrantyStore.selectedWarranty.name,
    duration: warrantyStore.selectedWarranty.duration,
    period: warrantyStore.selectedWarranty.period,
    description: warrantyStore.selectedWarranty.description,
    active: warrantyStore.selectedWarranty.active,
}

const modalMap = {
    CREATE: {
        component: AddEditWarrantyForm,
        action: createWarranty
    },
    EDIT: {
        component: AddEditWarrantyForm,
        action: editWarranty
    },
    DELETE: {
        component: DeleteWarranty,
        action: deleteWarranty
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(createWarrantySchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded 
    loading.value = true
    await getWarranties()
    loading.value = false
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[warrantyStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => warrantyStore.selectedWarranty,
    (warranty) => {
        if (warranty) {
            setValues({
                name: warranty.name,
                duration: warranty.duration,
                period: warranty.period,
                description: warranty.description,
                active: warranty.active
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[warrantyStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, status, data } = await action(formValues)
        console.log(message)
        console.log(status)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    warrantyStore.setData()
}

const openCreateModal = () => {
    warrantyStore.setData()
    modalStore.open(warrantyStore.modalId, { type: 'CREATE', title: 'Crear Garantía' })
}
// #endregion
</script>

<template>
    <!-- MAIN VIEW -->
    <h2>Grantías</h2>
    <BaseButton text="Nueva Grantía" @click="openCreateModal()" icon="add" className="mb-3"/>
    
    <p v-if="loading">Cargando...</p>
    <BaseTable v-else :data="warrantyStore.warranties" :headers="getWarrantiesTableColumns()"/>

    <!-- MODAL -->
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="warrantyStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>


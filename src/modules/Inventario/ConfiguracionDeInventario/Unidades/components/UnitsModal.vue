<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useUnitActions } from '../composables/useUnitActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useUnitStore from '../store/unit.store'
import { UnitType } from '../types/unitType'
import AddEditUnitForm from '../components/AddEditUnitForm.vue'
import DeleteUnit from '../components/DeleteUnit.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { createUnitSchema } from '../validations/unitValidation'
import BaseModal from '@/shared/components/BaseModal.vue'
import { showNotification } from '@/utils/toastNotifications'
// #endregion

const props = defineProps<{
  onRefresh?: () => void
}>()

// #region Data
const { createUnit, editUnit, deleteUnit } = useUnitActions()
const modalStore = useModalStore()
const unitStore = useUnitStore()

const initialValues : UnitType = {
    name: unitStore.selectedUnit.name,
    shortName: unitStore.selectedUnit.shortName,
    productsCount: unitStore.selectedUnit.productsCount,
    active: unitStore.selectedUnit.active,
    creationDate:  unitStore.selectedUnit.creationDate
}

const modalMap = {
    CREATE: {
        component: AddEditUnitForm,
        action: createUnit
    },
    EDIT: {
        component: AddEditUnitForm,
        action: editUnit
    },
    DELETE: {
        component: DeleteUnit,
        action: deleteUnit
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(createUnitSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion


// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[unitStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => unitStore.selectedUnit,
    (unit) => {
        if (unit) {
            setValues({
                name: unit.name,
                shortName: unit.shortName,
                active: unit.active
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[unitStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        onClose()
        modalStore.close(unitStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    unitStore.setData()
}

// #endregion
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="unitStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

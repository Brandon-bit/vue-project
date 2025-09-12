<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useVariantAttributeActions } from '@inventario/ConfiguracionDeInventario/AtributosVariantes//composables/useVariantAttributeActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useVariantAttributeStore from '@inventario/ConfiguracionDeInventario/AtributosVariantes//store/variantAttribute.store'
import { VariantAttributeType } from '@inventario/ConfiguracionDeInventario/AtributosVariantes//types/variantAttributeType'
import AddEditVariantAttributeForm from '@inventario/ConfiguracionDeInventario/AtributosVariantes//components/AddEditVariantAttributeForm.vue'
import DeleteVariantAttribute from '@inventario/ConfiguracionDeInventario/AtributosVariantes//components/DeleteVariantAttribute.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { createVariantAttributeSchema } from '@inventario/ConfiguracionDeInventario/AtributosVariantes//validations/variantAttributeValidation'
import BaseModal from '@/shared/components/BaseModal.vue'
// #endregion

// #region Data
const { createVariantAttribute, editVariantAttribute, deleteVariantAttribute } =
    useVariantAttributeActions()
const modalStore = useModalStore()
const variantAttributeStore = useVariantAttributeStore()

const initialValues: VariantAttributeType = {
    name: variantAttributeStore.selectedVariantAttribute.name,
    values: variantAttributeStore.selectedVariantAttribute.values,
    active: variantAttributeStore.selectedVariantAttribute.active,
    creationDate: variantAttributeStore.selectedVariantAttribute.creationDate
}

const modalMap = {
    CREATE: {
        component: AddEditVariantAttributeForm,
        action: createVariantAttribute
    },
    EDIT: {
        component: AddEditVariantAttributeForm,
        action: editVariantAttribute
    },
    DELETE: {
        component: DeleteVariantAttribute,
        action: deleteVariantAttribute
    }
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createVariantAttributeSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[variantAttributeStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => variantAttributeStore.selectedVariantAttribute,
    (variantAttribute) => {
        if (variantAttribute) {
            setValues({
                name: variantAttribute.name,
                active: variantAttribute.active
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[variantAttributeStore.modalId].type
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
    variantAttributeStore.valuesCopy = []
    resetForm()
    variantAttributeStore.setData()
}
// #endregion
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="variantAttributeStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

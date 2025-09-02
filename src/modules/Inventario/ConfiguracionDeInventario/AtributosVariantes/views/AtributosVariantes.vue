<script setup lang="ts">
// #region Imports
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useVariantAttribute } from '../composables/useVariantAttribute'
import { useVariantAttributeActions } from '../composables/useVariantAttributeActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useVariantAttributeStore from '../store/variantAttribute.store'
import { VariantAttributeType } from '../types/variantAttributeType'
import AddEditVariantAttributeForm from '../components/AddEditVariantAttributeForm.vue'
import DeleteVariantAttribute from '../components/DeleteVariantAttribute.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseTable from '@/shared/components/BaseTable.vue'
import { createVariantAttributeSchema } from '../validations/variantAttributeValidation'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getVariantAttributes, getVariantAttributesTableColumns } = useVariantAttribute()
const { createVariantAttribute, editVariantAttribute, deleteVariantAttribute } = useVariantAttributeActions()
const modalStore = useModalStore()
const variantAttributeStore = useVariantAttributeStore()

const initialValues : VariantAttributeType = {
    name: variantAttributeStore.selectedVariantAttribute.name,
    values: variantAttributeStore.selectedVariantAttribute.values,
    active: variantAttributeStore.selectedVariantAttribute.active,
    creationDate:  variantAttributeStore.selectedVariantAttribute.creationDate
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

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(createVariantAttributeSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded 
    loading.value = true
    await getVariantAttributes()
    loading.value = false
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
    variantAttributeStore.valuesCopy = [];
    resetForm()
    variantAttributeStore.setData()
}

const openCreateModal = () => {
    variantAttributeStore.setData()
    modalStore.open(variantAttributeStore.modalId, { type: 'CREATE', title: 'Agregar Atributo Variante' })
}
// #endregion
</script>

<template>
    <h2>Atributos Variantes</h2>
    <BaseButton text="Nuevo Atributo" @click="openCreateModal()" icon="add" className="mb-3"/>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="variantAttributeStore.variantAttributes" :headers="getVariantAttributesTableColumns()"/>

    <!-- MODAL -->
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


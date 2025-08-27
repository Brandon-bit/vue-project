<script setup lang="ts">
// #region Imports
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useUnit } from '../composables/useUnit'
import { useUnitActions } from '../composables/useUnitActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useUnitStore from '../store/unit.store'
import { UnitType } from '../types/unitType'
import AddEditUnitForm from '../components/AddEditUnitForm.vue'
import DeleteUnit from '../components/DeleteUnit.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseTable from '@/shared/components/BaseTable.vue'
import { createUnitSchema } from '../validations/unitValidation'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getUnits, getUnitsTableColumns } = useUnit()
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

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded 
    loading.value = true
    await getUnits()
    loading.value = false
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
    unitStore.setData()
}

const openCreateModal = () => {
    console.log("ds")
    unitStore.setData()
    modalStore.open(unitStore.modalId, { type: 'CREATE', title: 'Agregar Unidad' })
}
// #endregion
</script>

<template>
    <h2>Unidades</h2>
    <BaseButton text="Nueva Unidad" @click="openCreateModal()" icon="add" className="mb-3"/>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="unitStore.units" :headers="getUnitsTableColumns()"/>

    <!-- MODAL -->
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

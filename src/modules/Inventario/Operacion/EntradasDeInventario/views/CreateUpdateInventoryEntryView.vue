<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'
import { useInventoryEntriesActions } from '@inventario/Operacion/EntradasDeInventario/composables/useInventoryEntriesActions'
import { createUpdateInventoryEntrySchema } from '@inventario/Operacion/EntradasDeInventario/validations/inventoryEntrySchema'
import ProductModal from '@inventario/Operacion/EntradasDeInventario/components/ProductModal.vue'
import ProductList from '@inventario/Operacion/EntradasDeInventario/components/ProductList.vue'
import AddProductButton from '@inventario/Operacion/EntradasDeInventario/components/AddProductButton.vue'

const route = useRoute()
const isEditMode = computed(() => route.name === 'Actualizar entrada de inventario')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar entrada de inventario' : 'Crear entrada de inventario'
)

interface SelectOptionsType {
    id: number
    label: string
}

const inventoryEntriesStore = useInventoryEntriesStore()

const {
    getSuppliers,
    getWarehouses,
    createInventoryEntry,
    updateInventoryEntry,
    getInventoryEntryById
} = useInventoryEntriesActions()
const warehouses = ref<SelectOptionsType[]>([])
const suppliers = ref<SelectOptionsType[]>([])
const states: SelectOptionsType[] = [
    { id: 1, label: 'Recibido' },
    { id: 2, label: 'Parcial' },
    { id: 3, label: 'Pendiente' },
    { id: 4, label: 'Cancelado' }
]

interface StateTransitions {
    [key: number]: number[]
}

const stateTransitions: StateTransitions = {
    0: [1, 2, 3, 4],
    3: [1, 2, 4],
    2: [1, 4],
    1: [4],
    4: []
}

const getStateTransitions = (currentStateId: number): number[] => {
    return stateTransitions[currentStateId] || []
}

const availableStates = computed((): SelectOptionsType[] => {
    const currentStateId = inventoryEntriesStore.selectedInventoryEntry.stateId
    const allowedStateIds = getStateTransitions(currentStateId)
    const currentState = states.find((state) => state.id === currentStateId)

    const available = states.filter((state) => allowedStateIds.includes(state.id))

    if (currentState && !available.some((state) => state.id === currentStateId)) {
        available.unshift(currentState)
    }

    return available
})

const movements: SelectOptionsType[] = [
    { id: 1, label: 'Compra' },
    { id: 2, label: 'Ajuste positivo' },
    { id: 3, label: 'Traslado recibido' },
    { id: 4, label: 'Devolución de cliente' },
    { id: 5, label: 'Donación recibida' }
]

onMounted(async () => {
    if (!warehouses.value.length) {
        const data = await getWarehouses()
        warehouses.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }

    if (!suppliers.value.length) {
        const data = await getSuppliers()
        suppliers.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }

    const inventoryEntryId = parseInt(route.params.id as string)
    if (inventoryEntryId) {
        await getInventoryEntryById()
    }
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(createUpdateInventoryEntrySchema),
    initialValues: {
        warehouseId: inventoryEntriesStore.selectedInventoryEntry.warehouseId,
        supplierId: inventoryEntriesStore.selectedInventoryEntry.supplierId,
        date: inventoryEntriesStore.selectedInventoryEntry.date,
        referenceDocument: inventoryEntriesStore.selectedInventoryEntry.referenceDocument,
        observations: inventoryEntriesStore.selectedInventoryEntry.observations,
        movementTypeId: inventoryEntriesStore.selectedInventoryEntry.movementTypeId,
        stateId: inventoryEntriesStore.selectedInventoryEntry.stateId
    },
    validateOnMount: false
})

watch(
    () => inventoryEntriesStore.selectedInventoryEntry,
    (newValues) => {
        resetForm({ values: { ...newValues } })
    }
)

const editable = computed(() => {
    const stateId = inventoryEntriesStore.selectedInventoryEntry.stateId
    const isCreating = stateId === 0
    const isPending = stateId === 3

    return {
        date: isCreating || isPending,
        warehouseId: isCreating || isPending,
        supplierId: isCreating || isPending,
        movementType: isCreating || isPending, // Solo creación y pendiente
        observations: stateId !== 4, // Editable en todos excepto cancelado
        referenceDocument: isCreating, // Solo en creación
        productos: getProductsEditableState(stateId),
        state: getStateTransitions(stateId).length > 0
    }
})

const getProductsEditableState = (stateId: number): boolean => {
    if (stateId === 0) return true // Creación
    if (stateId === 3) return true // Pendiente
    if (stateId === 2) return true // Parcial - asumiendo que se pueden ajustar cantidades
    if (stateId === 1) return false // Recibido - no editable
    if (stateId === 4) return false // Cancelado - no editable
    return false
}

const onSubmit = handleSubmit(async (formValues) => {
    // console.log(formValues)
    let result
    if (isEditMode.value) {
        result = await updateInventoryEntry(formValues)
    } else {
        result = await createInventoryEntry(formValues)
    }
    // const modalType = modalStore.modals[inventoryEntriesStore.modalId]?.type
    // console.log(isEditMode.value)
    console.log(result)
})
</script>

<template>
    <div class="xl:max-w-[70%] mx-auto">
        <h2 class="text-center mb-10">{{ pageTitle }}</h2>
        <div class="mb-10 pt-10 text-right">
            <AddProductButton />
        </div>
        <form @submit="onSubmit">
            <div class="grid grid-cols-12 gap-4">
                <BaseFormInput
                    name="date"
                    label="Fecha"
                    type="date"
                    :readonly="!editable.date"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseFormSelect
                    name="warehouseId"
                    label="Almacén"
                    :options="warehouses"
                    :required="true"
                    :disabled="!editable.warehouseId"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseFormSelect
                    name="supplierId"
                    label="Proveedor"
                    :options="suppliers"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                    :disabled="!editable.supplierId"
                />
                <BaseFormSelect
                    name="movementTypeId"
                    label="Tipo de moviento"
                    :options="movements"
                    :required="true"
                    :disabled="!editable.movementType"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseTextArea
                    name="observations"
                    label="Observaciones"
                    :readonly="!editable.observations"
                    class="col-span-12 md:col-span-4"
                />
                <BaseFormInput
                    name="referenceDocument"
                    label="Documento de referencia"
                    class="col-span-12 md:col-span-4"
                    :readonly="!editable.referenceDocument"
                />
                <BaseFormSelect
                    name="stateId"
                    label="Estado"
                    :options="availableStates"
                    :required="true"
                    :disabled="!editable.state"
                    class="col-span-12 md:col-span-4"
                />
                <div class="col-span-12">
                    <ProductList />
                </div>
                <div class="col-span-12">
                    <BaseFormActionButtons
                        :is-submitting="isSubmitting"
                        :is-edit-mode="isEditMode"
                        submit-text="entrada de inventario"
                        cancel-text="Regresar"
                        :on-cancel="() => { inventoryEntriesStore.clearAddedProducts(); $router.push('/inventario/operacion/entradas-de-inventario'); }"
                    />
                </div>
            </div>
        </form>
        <ProductModal />
    </div>
</template>

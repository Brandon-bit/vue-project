<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
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

const movements: SelectOptionsType[] = [
    { id: 1, label: 'Compra' },
    { id: 2, label: 'Ajuste positivo' },
    { id: 3, label: 'Traslado reicibido' },
    { id: 4, label: 'Devolución de cliente' },
    { id: 5, label: 'Donaión recibida' }
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

const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
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
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseFormSelect
                    name="warehouseId"
                    label="Almacén"
                    :options="warehouses"
                    :required="true"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseFormSelect
                    name="supplierId"
                    label="Proveedor"
                    :options="suppliers"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseFormSelect
                    name="movementTypeId"
                    label="Tipo de moviento"
                    :options="movements"
                    :required="true"
                    class="col-span-12 md:col-span-4 lg:col-span-3"
                />
                <BaseTextArea
                    name="observations"
                    label="Observaciones"
                    class="col-span-12 md:col-span-4"
                />
                <BaseFormInput
                    name="referenceDocument"
                    label="Documento de referencia"
                    class="col-span-12 md:col-span-4"
                />
                <BaseFormSelect
                    name="stateId"
                    label="Estado"
                    :options="states"
                    :required="true"
                    class="col-span-12 md:col-span-4"
                />
                <div class="col-span-12">
                    <ProductList />
                </div>
                <div class="col-span-12 grid grid-cols-12 justify-end gap-4 mt-10">
                    <router-link
                        to="/inventario/operacion/entradas-de-inventario"
                        class="btn col-span-6"
                        @click="() => inventoryEntriesStore.clearAddedProducts()"
                    >
                        <button>Regresar</button>
                    </router-link>
                    <button
                        type="submit"
                        class="btn btn-primary col-span-6"
                        :disabled="isSubmitting"
                    >
                        <template v-if="isSubmitting">
                            <span class="loading loading-spinner"></span>
                            Procesando...
                        </template>
                        <template v-else> Aceptar </template>
                    </button>
                </div>
            </div>
        </form>
        <ProductModal />
    </div>
</template>

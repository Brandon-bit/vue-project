<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'
import { useInventoryWithdrawalsActions } from '@inventario/Operacion/SalidasDeInventario/composables/useInventoryWithdrawalsActions'
import { createUpdateInventoryWithdrawalSchema } from '@inventario/Operacion/SalidasDeInventario/validations/inventoryWithdrawalsSchema'
import ProductModal from '@inventario/Operacion/EntradasDeInventario/components/ProductModal.vue'
import ProductList from '@inventario/Operacion/EntradasDeInventario/components/ProductList.vue'
import AddProductButton from '@inventario/Operacion/EntradasDeInventario/components/AddProductButton.vue'

const route = useRoute()
const isEditMode = computed(() => route.name === 'Actualizar salida de inventario')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar salida de inventario' : 'Crear salida de inventario'
)

interface SelectOption {
    id: number
    label: string
}

const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()

const {
    getSuppliers,
    getWarehouses,
    createInventoryWithdrawal,
    updateInventoryWithdrawal,
    getInventoryWithdrawalById
} = useInventoryWithdrawalsActions()
const warehouses = ref<SelectOption[]>([])
const suppliers = ref<SelectOption[]>([])
const states: SelectOption[] = [
    { id: 1, label: 'Despachado' },
    { id: 2, label: 'Parcialmente despachado' },
    { id: 3, label: 'Pendiente' },
    { id: 4, label: 'Cancelado' },
    { id: 5, label: 'Facturado' }
]

const movements: SelectOption[] = [
    { id: 1, label: 'Ajuste negativo' },
    { id: 2, label: 'Traslado enviado' },
    { id: 3, label: 'Devolución a proveedor' },
    { id: 4, label: 'Consumo interno' }
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

    const inventoryWithdrawalId = parseInt(route.params.id as string)
    if (inventoryWithdrawalId) {
        await getInventoryWithdrawalById()
    }
})

const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(createUpdateInventoryWithdrawalSchema),
    initialValues: {
        warehouseId: inventoryWithdrawalsStore.selectedInventoryWithdrawal.warehouseId,
        destinationId: inventoryWithdrawalsStore.selectedInventoryWithdrawal.destinationId,
        date: inventoryWithdrawalsStore.selectedInventoryWithdrawal.date,
        referenceDocument: inventoryWithdrawalsStore.selectedInventoryWithdrawal.referenceDocument,
        observations: inventoryWithdrawalsStore.selectedInventoryWithdrawal.observations,
        movementTypeId: inventoryWithdrawalsStore.selectedInventoryWithdrawal.movementTypeId,
        stateId: inventoryWithdrawalsStore.selectedInventoryWithdrawal.stateId
    },
    validateOnMount: false
})

watch(
    () => inventoryWithdrawalsStore.selectedInventoryWithdrawal,
    (newValues) => {
        resetForm({ values: { ...newValues } })
    }
)

const destinationOptions = computed<SelectOption[]>(() => {
    switch (values.movementTypeId) {
        case '2':
            return warehouses.value as SelectOption[]
        case '3':
            return suppliers.value as SelectOption[]
        case '4':
            return [{ id: 1, label: 'Consumo interno' }]
        default:
            return []
    }
})

const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
    let result
    if (isEditMode.value) {
        result = await updateInventoryWithdrawal(formValues)
    } else {
        result = await createInventoryWithdrawal(formValues)
    }
    // const modalType = modalStore.modals[inventoryWithdrawalsStore.modalId]?.type
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
                    name="destinationId"
                    label="Destino"
                    :options="destinationOptions"
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
                        to="/inventario/operacion/salidas-de-inventario"
                        class="btn col-span-6"
                        @click="() => inventoryWithdrawalsStore.clearAddedProducts()"
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

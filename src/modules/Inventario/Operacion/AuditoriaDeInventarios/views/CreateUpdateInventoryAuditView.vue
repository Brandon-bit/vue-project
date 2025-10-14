<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useInventoryAuditStore from '../store/useInventoryAuditStore'
import ProductModal from '@inventario/Operacion/AuditoriaDeInventarios/components/ProductModal.vue'
import ProductList from '@inventario/Operacion/AuditoriaDeInventarios/components/ProductList.vue'
import AddProductButton from '@inventario/Operacion/AuditoriaDeInventarios/components/AddProductButton.vue'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import { createUpdateInventoryAuditSchema } from '@inventario/Operacion/AuditoriaDeInventarios/validations/inventoryAuditSchema'
const route = useRoute()
const isEditMode = computed(() => route.name === 'Actualizar auditoria de inventario')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar auditoria de inventario' : 'Crear auditoria de inventario'
)

interface SelectOptionsType {
    id: number
    label: string
}

const { getAuditors, createInventoryAudit, updateInventoryAudit, getInventoryAuditById } =
    useInventoryAuditActions()

const inventoryAuditStore = useInventoryAuditStore()
const auditors = ref<SelectOptionsType[]>([])
const states: SelectOptionsType[] = [
    { id: 1, label: 'Borrador' },
    { id: 2, label: 'Finalizada' },
    { id: 3, label: 'Ajustada' },
    { id: 4, label: 'Cancelada' }
]
onMounted(async () => {
    if (!auditors.value.length) {
        const data = await getAuditors()
        auditors.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }

    const inventoryAuditId = parseInt(route.params.id as string)
    if (inventoryAuditId) {
        await getInventoryAuditById()
    }
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(createUpdateInventoryAuditSchema),
    initialValues: {
        date: inventoryAuditStore.selectedInventoryAudit.date,
        auditorId: inventoryAuditStore.selectedInventoryAudit.auditorId,
        stateId: inventoryAuditStore.selectedInventoryAudit.stateId,
        generalNote: inventoryAuditStore.selectedInventoryAudit.generalNote
    },
    validateOnMount: false
})

watch(
    () => inventoryAuditStore.selectedInventoryAudit,
    (newValues) => {
        resetForm({ values: { ...newValues } })
    }
)

const onSubmit = handleSubmit(async (formValues) => {
    let result
    if (isEditMode.value) {
        result = await updateInventoryAudit(formValues)
    } else {
        result = await createInventoryAudit(formValues)
    }
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
                    type="date"
                    label="Fecha"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormSelect
                    label="Auditor"
                    name="auditorId"
                    :options="auditors"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseFormSelect
                    name="stateId"
                    label="Estado"
                    :options="states"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <BaseTextArea
                    name="generalNote"
                    type="text"
                    label="Nota"
                    :required="true"
                    class="col-span-12 md:col-span-6"
                />
                <div class="col-span-12">
                    <ProductList />
                </div>
                <div class="col-span-12 grid grid-cols-12 justify-end gap-4 mt-10">
                    <router-link
                        to="/inventario/operacion/auditorias-de-inventario"
                        class="btn col-span-6"
                        @click="() => inventoryAuditStore.clearAddedProducts()"
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

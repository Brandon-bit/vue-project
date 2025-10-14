<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useOrderManagementActions } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementActions'
interface SelectOptionsType {
    id: number
    label: string
}

const { getSuppliers } = useOrderManagementActions()
const suppliers = ref<SelectOptionsType[]>([])
onMounted(async () => {
    if (!suppliers.value.length) {
        const data = await getSuppliers()
        suppliers.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }
})
</script>

<template>
    <BaseFormInput name="folio" type="text" label="Folio" :required="true" />
    <BaseFormSelect label="Proveedor" name="supplierId" :options="suppliers" />
    <BaseFormInput name="date" type="date" label="Fecha" :required="true" />
</template>

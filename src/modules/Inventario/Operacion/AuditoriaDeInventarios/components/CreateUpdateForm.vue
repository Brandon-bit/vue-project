<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import AddProductButton from '@inventario/Operacion/AuditoriaDeInventarios/components/AddProductButton.vue'

const { getAuditors } = useInventoryAuditActions()
interface SelectOptionsType {
    id: number
    label: string
}

const auditors = ref<SelectOptionsType[]>([])
onMounted(async () => {
    if (!auditors.value.length) {
        const data = await getAuditors()
        auditors.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }
})
</script>

<template>
    <BaseFormInput name="date" type="date" label="Fecha" :required="true" />
    <BaseFormSelect label="Auditor" name="auditorId" :options="auditors" />
    <BaseTextArea name="generalNote" type="text" label="Nota" :required="true" />
    <AddProductButton />
</template>

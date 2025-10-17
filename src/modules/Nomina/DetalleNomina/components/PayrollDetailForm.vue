<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { usePayrollConceptActions } from '@/modules/Nomina/ConceptosNomina/composables/usePayrollConceptActions'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'

const payrollDetailStore = usePayrollDetailStore()
const { getPayrollConceptsForSelect } = usePayrollConceptActions()

const conceptOptions = ref<any[]>([])
const tipoOptions = ref([
    { id: 'percepcion', label: 'Percepción' },
    { id: 'deduccion', label: 'Deducción' }
])

onMounted(async () => {
    conceptOptions.value = await getPayrollConceptsForSelect()
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <div class="alert alert-info mb-4">
                <span class="font-semibold">Empleado:</span> 
                {{ payrollDetailStore.selectedEmployee?.employeeName }}
            </div>
        </div>
        <div class="col-span-12">
            <BaseFormSelect
                name="conceptId"
                label="Concepto"
                :options="conceptOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormSelect
                name="type"
                label="Tipo"
                :options="tipoOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="amount"
                type="number"
                label="Monto"
                placeholder="0.00"
                :required="true"
                :allowDecimal="true"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="notes"
                label="Observaciones"
                placeholder="Notas adicionales..."
            />
        </div>
    </div>
</template>

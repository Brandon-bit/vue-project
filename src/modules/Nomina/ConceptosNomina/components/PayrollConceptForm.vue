<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const { value: isVariableValue } = useField<boolean>('isVariable')
const { value: typeValue } = useField<string>('type')

const tipoOptions = ref([
    { id: 'percepcion', label: 'Percepción' },
    { id: 'deduccion', label: 'Deducción' }
])

const showFixedFields = ref(!isVariableValue.value)

watch(isVariableValue, (newValue) => {
    showFixedFields.value = !newValue
})
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del concepto"
                placeholder="Ej: Sueldo Base"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="code"
                type="text"
                label="Clave"
                placeholder="Ej: P001"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseFormSelect
                name="type"
                label="Tipo de concepto"
                :options="tipoOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="description"
                label="Descripción"
            />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="isVariable" label="¿Es variable?" :default="false" />
            <p class="text-xs text-gray-500 mt-1">
                Los conceptos variables no tienen monto fijo (ej: comisiones, horas extra)
            </p>
        </div>
        
        <template v-if="showFixedFields">
            <div class="col-span-12 md:col-span-6">
                <BaseFormInput
                    name="fixedAmount"
                    type="number"
                    label="Monto fijo"
                    placeholder="0.00"
                    :allowDecimal="true"
                />
                <p class="text-xs text-gray-500 mt-1">Dejar en 0 si usa porcentaje</p>
            </div>
            <div class="col-span-12 md:col-span-6">
                <BaseFormInput
                    name="percentage"
                    type="number"
                    label="Porcentaje"
                    placeholder="0"
                    :allowDecimal="true"
                />
                <p class="text-xs text-gray-500 mt-1">Dejar en 0 si usa monto fijo</p>
            </div>
        </template>

        <div class="col-span-12 md:col-span-6">
            <BaseFormCheckbox name="appliesISR" label="Aplica ISR" :default="false" />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormCheckbox name="appliesIMSS" label="Aplica IMSS" :default="false" />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>

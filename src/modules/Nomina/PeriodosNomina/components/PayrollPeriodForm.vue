<script setup lang="ts">
import { ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const tipoOptions = ref([
    { id: 'semanal', label: 'Semanal' },
    { id: 'quincenal', label: 'Quincenal' },
    { id: 'mensual', label: 'Mensual' }
])

const estadoOptions = ref([
    { id: 'borrador', label: 'Borrador' },
    { id: 'calculada', label: 'Calculada' },
    { id: 'pagada', label: 'Pagada' },
    { id: 'cerrada', label: 'Cerrada' }
])

const tipoNominaOptions = ref([
    { id: 'ordinaria', label: 'Ordinaria' },
    { id: 'extraordinaria', label: 'Extraordinaria' }
])
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del período"
                placeholder="Ej: Nómina Quincenal Enero 2025 - 1ra Quincena"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormSelect
                name="type"
                label="Tipo de período"
                :options="tipoOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormSelect
                name="payrollType"
                label="Tipo de nómina"
                :options="tipoNominaOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="startDate"
                type="date"
                label="Fecha de inicio"
                :required="true"
            />
        </div>
        <div class="col-span-12 md:col-span-6">
            <BaseFormInput
                name="endDate"
                type="date"
                label="Fecha de fin"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseFormSelect
                name="status"
                label="Estado"
                :options="estadoOptions"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="notes"
                label="Observaciones"
                placeholder="Notas adicionales sobre este período..."
            />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Activo" :default="true" />
        </div>
    </div>
</template>

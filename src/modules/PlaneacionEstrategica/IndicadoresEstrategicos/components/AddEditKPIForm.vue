<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const typeOptions = [
    { id: 'KPI', label: 'KPI' },
    { id: 'OKR', label: 'OKR' }
]

const perspectiveOptions = [
    { id: 'Financial', label: 'Financiera' },
    { id: 'Customer', label: 'Clientes' },
    { id: 'Process', label: 'Procesos Internos' },
    { id: 'Learning', label: 'Aprendizaje y Crecimiento' }
]

const frequencyOptions = [
    { id: 'Daily', label: 'Diaria' },
    { id: 'Weekly', label: 'Semanal' },
    { id: 'Monthly', label: 'Mensual' },
    { id: 'Quarterly', label: 'Trimestral' },
    { id: 'Annual', label: 'Anual' }
]
</script>

<template>
    <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
            <BaseFormSelect
                name="type"
                label="Tipo de Indicador"
                :options="typeOptions"
                :required="true"
            />

            <BaseFormSelect
                name="perspective"
                label="Perspectiva BSC"
                :options="perspectiveOptions"
                :required="true"
            />
        </div>

        <BaseFormInput
            name="name"
            label="Nombre del Indicador"
            type="text"
            placeholder="ej. Margen EBITDA"
            :required="true"
        />

        <BaseTextArea
            name="description"
            label="Descripción"
            placeholder="Define qué mide este indicador..."
        />

        <BaseFormInput
            name="objective"
            label="Objetivo Estratégico Asociado"
            type="text"
            placeholder="ej. Incrementar la rentabilidad"
            :required="true"
        />

        <div class="grid grid-cols-3 gap-4">
            <BaseFormInput
                name="target"
                label="Meta"
                type="number"
                :required="true"
            />

            <BaseFormInput
                name="unit"
                label="Unidad"
                type="text"
                placeholder="%, $, días"
                :required="true"
            />

            <BaseFormSelect
                name="frequency"
                label="Frecuencia"
                :options="frequencyOptions"
                :required="true"
            />
        </div>

        <BaseFormInput
            name="dataSource"
            label="Fuente de Datos"
            type="text"
            placeholder="ej. ERP Financiero, Manual, CRM"
            :required="true"
        />
    </div>
</template>

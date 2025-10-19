<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const statusOptions = [
    { id: 'planning', label: 'Planeación' },
    { id: 'in-progress', label: 'En Curso' },
    { id: 'paused', label: 'Pausada' },
    { id: 'completed', label: 'Completada' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="name"
            label="Nombre de la Iniciativa"
            type="text"
            placeholder="ej. Transformación Digital"
            :required="true"
        />

        <BaseTextArea
            name="description"
            label="Descripción"
            placeholder="Describe el alcance y propósito de la iniciativa..."
        />

        <BaseFormInput
            name="objective"
            label="Objetivo Estratégico Asociado"
            type="text"
            placeholder="ej. Mejorar eficiencia operativa"
            :required="true"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput
                name="leader"
                label="Líder de la Iniciativa"
                type="text"
                placeholder="Nombre del responsable"
                :required="true"
            />

            <BaseFormSelect
                name="status"
                label="Estado"
                :options="statusOptions"
                :required="true"
            />
        </div>

        <div class="grid grid-cols-3 gap-4">
            <BaseFormInput
                name="startDate"
                label="Fecha de Inicio"
                type="date"
                :required="true"
            />

            <BaseFormInput
                name="endDate"
                label="Fecha de Fin"
                type="date"
                :required="true"
            />

            <BaseFormInput
                name="budget"
                label="Presupuesto"
                type="text"
                placeholder="$0.00"
                :required="true"
            />
        </div>
    </div>
</template>

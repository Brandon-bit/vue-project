<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const priorityOptions = [
    { id: 'high', label: 'Alta' },
    { id: 'medium', label: 'Media' },
    { id: 'low', label: 'Baja' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="title"
            label="Título de la Tarea"
            type="text"
            placeholder="ej. Evaluación de plataformas cloud"
            :required="true"
        />

        <BaseTextArea
            name="description"
            label="Descripción"
            placeholder="Describe la tarea en detalle..."
        />

        <BaseFormInput
            name="initiative"
            label="Iniciativa Asociada"
            type="text"
            placeholder="ej. Transformación Digital"
            :required="true"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput
                name="responsible"
                label="Responsable"
                type="text"
                placeholder="Nombre del responsable"
                :required="true"
            />

            <BaseFormSelect
                name="priority"
                label="Prioridad"
                :options="priorityOptions"
                :required="true"
            />
        </div>

        <div class="grid grid-cols-2 gap-4">
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
        </div>
    </div>
</template>

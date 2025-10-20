<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const typeOptions = [
    { id: 'success', label: 'Éxito / Buena práctica' },
    { id: 'improvement', label: 'Oportunidad de mejora' },
    { id: 'problem', label: 'Problema / Obstáculo' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="objective"
            label="Objetivo Relacionado"
            type="text"
            placeholder="ej. Incrementar la rentabilidad"
            :required="true"
        />

        <BaseFormSelect
            name="type"
            label="Tipo de Lección"
            :options="typeOptions"
            :required="true"
        />

        <BaseTextArea
            name="lesson"
            label="Descripción de la Lección"
            placeholder="Describe qué aprendimos..."
            :rows="3"
        />

        <BaseTextArea
            name="impact"
            label="Impacto Observado"
            placeholder="¿Qué efecto tuvo en los resultados?"
            :rows="2"
        />

        <BaseTextArea
            name="actions"
            label="Acciones Recomendadas"
            placeholder="¿Qué debemos hacer para el próximo periodo?"
            :rows="2"
        />
    </div>
</template>

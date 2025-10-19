<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const strategyOptions = [
    { id: 'Mitigate', label: 'Mitigar' },
    { id: 'Prevent', label: 'Prevenir' },
    { id: 'Transfer', label: 'Transferir' },
    { id: 'Accept', label: 'Aceptar' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="name"
            label="Nombre del Riesgo"
            type="text"
            placeholder="Describe el riesgo..."
            :required="true"
        />

        <BaseFormInput
            name="probability"
            label="Probabilidad (1-10)"
            type="number"
            :required="true"
        />

        <BaseFormInput
            name="impact"
            label="Impacto (1-10)"
            type="number"
            :required="true"
        />

        <BaseFormSelect
            name="strategy"
            label="Estrategia"
            :options="strategyOptions"
            :required="true"
        />
    </div>
</template>

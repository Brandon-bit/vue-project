<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue';
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';

const options = [
    {
        id: 'DIAS',
        label: 'Diario'
    },
    {
        id: 'SEMANAS',
        label: 'Semanal'
    },
    {
        id: 'MESES',
        label: 'Mensual'
    },
    {
        id: 'ANIOS',
        label: 'Anual'
    }
]
</script>

<template>
    <BaseFormInput name="name" type="text" label="Nombre" :required="true"/>
    <div class="grid grid-cols-2 gap-3">
        <BaseFormInput name="duration" type="number" label="Duración" :required="true"/>
        <BaseFormSelect label="Periodo" name="period" :options="options" :required="true" />
    </div>
    <BaseTextArea name="description" label="Descripción"/>
    <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
</template>
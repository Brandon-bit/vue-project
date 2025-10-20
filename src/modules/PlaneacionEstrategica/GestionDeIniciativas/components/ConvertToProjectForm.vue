<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            name="name"
            label="Nombre del Proyecto"
            type="text"
            :required="true"
        />

        <BaseTextArea
            name="description"
            label="Descripción del Proyecto"
        />

        <BaseFormInput
            name="objective"
            label="Objetivo Estratégico"
            type="text"
            :required="true"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput
                name="leader"
                label="Project Manager"
                type="text"
                :required="true"
            />

            <BaseFormInput
                name="budget"
                label="Presupuesto"
                type="text"
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
                label="Fecha de Cierre"
                type="date"
                :required="true"
            />
        </div>
    </div>
</template>

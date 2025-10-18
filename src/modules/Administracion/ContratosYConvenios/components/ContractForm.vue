<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const contractTypes = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'arrendamiento', label: 'Arrendamiento' },
    { id: 'compras', label: 'Compras' },
    { id: 'consultoria', label: 'Consultoría' },
    { id: 'mantenimiento', label: 'Mantenimiento' },
    { id: 'suministro', label: 'Suministro' },
    { id: 'otros', label: 'Otros' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput 
            name="name" 
            type="text" 
            label="Nombre del Contrato" 
            :required="true" 
            placeholder="Ej. Contrato de Servicios de Software"
        />

        <BaseFormInput 
            name="counterpart" 
            type="text" 
            label="Contraparte" 
            :required="true" 
            placeholder="Ej. TechSolutions Inc."
        />

        <BaseFormSelect 
            name="type" 
            label="Tipo de Contrato" 
            :options="contractTypes" 
            :required="true" 
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput 
                name="startDate" 
                type="date" 
                label="Fecha de Inicio" 
                :required="true" 
            />

            <BaseFormInput 
                name="expirationDate" 
                type="date" 
                label="Fecha de Vencimiento" 
                :required="true" 
            />
        </div>

        <BaseFormInput 
            name="amount" 
            type="number" 
            label="Monto del Contrato" 
            :required="true" 
            placeholder="0.00"
            step="0.01"
        />

        <BaseTextArea 
            name="description" 
            label="Descripción / Notas" 
            rows="4"
            placeholder="Detalles adicionales del contrato..."
        />

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span class="text-sm">El sistema calculará automáticamente los días para vencimiento y el estado del contrato.</span>
        </div>
    </div>
</template>

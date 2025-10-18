<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const categories = [
    { id: 'viaticos', label: 'Viáticos' },
    { id: 'transporte', label: 'Transporte' },
    { id: 'hospedaje', label: 'Hospedaje' },
    { id: 'alimentacion', label: 'Alimentación' },
    { id: 'materiales', label: 'Materiales' },
    { id: 'capacitacion', label: 'Capacitación' },
    { id: 'otros', label: 'Otros' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput 
            name="concept" 
            type="text" 
            label="Concepto" 
            :required="true" 
            placeholder="Ej. Viaje a Monterrey - Reunión con Cliente"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput 
                name="date" 
                type="date" 
                label="Fecha" 
                :required="true" 
            />

            <BaseFormInput 
                name="amount" 
                type="number" 
                label="Monto" 
                :required="true" 
                placeholder="0.00"
                step="0.01"
            />
        </div>

        <BaseFormSelect 
            name="category" 
            label="Categoría" 
            :options="categories" 
            :required="true" 
        />

        <BaseTextArea 
            name="description" 
            label="Descripción / Justificación" 
            rows="4"
            placeholder="Describe los detalles de la solicitud..."
        />

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span class="text-sm">La solicitud será enviada para aprobación. Asegúrate de adjuntar los comprobantes correspondientes.</span>
        </div>
    </div>
</template>

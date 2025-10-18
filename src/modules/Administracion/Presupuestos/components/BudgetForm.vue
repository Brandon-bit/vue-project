<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const currentYear = new Date().getFullYear()

const areas = [
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Operaciones', label: 'Operaciones' },
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Recursos Humanos', label: 'Recursos Humanos' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Administración', label: 'Administración' },
    { id: 'Finanzas', label: 'Finanzas' },
    { id: 'Logística', label: 'Logística' }
]

const fiscalYears = [
    { id: currentYear, label: currentYear.toString() },
    { id: currentYear + 1, label: (currentYear + 1).toString() },
    { id: currentYear - 1, label: (currentYear - 1).toString() }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormSelect 
            name="area" 
            label="Área" 
            :options="areas" 
            :required="true" 
        />

        <BaseFormInput 
            name="budgeted" 
            type="number" 
            label="Monto Presupuestado" 
            :required="true" 
            placeholder="0.00"
        />

        <BaseFormSelect 
            name="fiscalYear" 
            label="Año Fiscal" 
            :options="fiscalYears" 
            :required="true" 
        />

        <BaseTextArea 
            name="description" 
            label="Descripción (Opcional)" 
            rows="3"
            placeholder="Detalles adicionales del presupuesto..."
        />

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span class="text-sm">El presupuesto se creará con gasto inicial de $0</span>
        </div>
    </div>
</template>

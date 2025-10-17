<script setup lang="ts">
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'

const periodos = [
    { id: 'q1-2024', label: 'Q1 2024' },
    { id: 'q2-2024', label: 'Q2 2024' },
    { id: 'q3-2024', label: 'Q3 2024' },
    { id: 'q4-2024', label: 'Q4 2024' },
    { id: 'anual-2024', label: 'Anual 2024' }
]
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Complete los datos para crear un nuevo presupuesto de compras</span>
        </div>

        <BaseInput
            name="area"
            label="Área o Departamento"
            placeholder="Ej. Marketing, IT, Operaciones"
            required
        />

        <BaseInput
            name="proyecto"
            label="Proyecto o Concepto"
            placeholder="Ej. Campaña Q1 2024"
            required
        />

        <BaseSelect
            name="periodo"
            label="Periodo"
            placeholder="Seleccionar periodo"
            :options="periodos"
            required
        />

        <BaseInput
            name="asignado"
            label="Monto Asignado"
            type="number"
            placeholder="0.00"
            required
        />

        <div class="alert">
            <span class="material-symbols-outlined">lightbulb</span>
            <div>
                <p class="font-semibold">Tip:</p>
                <p class="text-sm">El presupuesto se puede ajustar posteriormente según las necesidades del proyecto.</p>
            </div>
        </div>
    </div>
</template>

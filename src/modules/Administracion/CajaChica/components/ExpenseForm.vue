<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import { usePettyCashActions } from '@/modules/Administracion/CajaChica/composables/usePettyCashActions'
import type { PettyBoxType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'

const { getPettyBoxes } = usePettyCashActions()

const pettyBoxes = ref<Array<PettyBoxType & { label: string }>>([])

const concepts = [
    { id: 'Papelería', label: 'Papelería' },
    { id: 'Transporte', label: 'Transporte' },
    { id: 'Cafetería', label: 'Cafetería' },
    { id: 'Limpieza', label: 'Limpieza' },
    { id: 'Suministros', label: 'Suministros' },
    { id: 'Mensajería', label: 'Mensajería' },
    { id: 'Estacionamiento', label: 'Estacionamiento' },
    { id: 'Otros', label: 'Otros' }
]

const costCenters = [
    { id: 'Administración', label: 'Administración' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Operaciones', label: 'Operaciones' },
    { id: 'TI', label: 'TI' },
    { id: 'RH', label: 'RH' },
    { id: 'Marketing', label: 'Marketing' }
]

onMounted(async () => {
    try {
        const boxesData = await getPettyBoxes()
        pettyBoxes.value = boxesData.map(box => ({
            id: box.id,
            label: box.name,
            name: box.name,
            assigned: box.assigned,
            balance: box.balance,
            responsible: box.responsible,
            usedPercentage: box.usedPercentage
        }))
    } catch {
        // Data simulada si la API falla
        pettyBoxes.value = [
            { 
                id: 1, 
                label: 'Caja Oficina Central',
                name: 'Caja Oficina Central', 
                assigned: 10000, 
                balance: 4500, 
                responsible: 'María García',
                usedPercentage: 55
            },
            { 
                id: 2, 
                label: 'Caja Sucursal Norte',
                name: 'Caja Sucursal Norte', 
                assigned: 5000, 
                balance: 2300, 
                responsible: 'Juan Pérez',
                usedPercentage: 54
            },
            { 
                id: 3, 
                label: 'Caja Eventos',
                name: 'Caja Eventos', 
                assigned: 15000, 
                balance: 8200, 
                responsible: 'Ana Martínez',
                usedPercentage: 45.33
            }
        ]
    }
})
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <BaseFormSelect 
            name="pettyBoxId" 
            label="Caja Chica" 
            :options="pettyBoxes" 
            :required="true" 
        />
        <BaseFormInput 
            name="date" 
            type="date" 
            label="Fecha" 
            :required="true" 
        />
    </div>
    
    <div class="grid grid-cols-2 gap-4">
        <BaseFormSelect 
            name="concept" 
            label="Concepto" 
            :options="concepts" 
            :required="true" 
        />
        <BaseFormInput 
            name="amount" 
            type="number" 
            label="Monto" 
            :required="true" 
            placeholder="0.00"
        />
    </div>

    <BaseFormSelect 
        name="costCenter" 
        label="Centro de Costo" 
        :options="costCenters" 
        :required="true" 
    />

    <BaseTextArea 
        name="description" 
        label="Descripción" 
        :required="true" 
        rows="3"
        placeholder="Detalle del gasto..."
    />

    <BaseFormInputFile 
        name="receipt" 
        label="Comprobante" 
        :multiple="false" 
        accept="image/png, image/jpeg, application/pdf" 
    />
    
    <div class="alert alert-info mt-2">
        <span class="material-symbols-outlined">info</span>
        <span class="text-sm">El sistema detectará automáticamente el monto del comprobante</span>
    </div>
</template>

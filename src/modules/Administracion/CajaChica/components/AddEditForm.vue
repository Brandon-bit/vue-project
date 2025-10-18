<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
import { useGastoActions } from '@/modules/Administracion/CajaChica/composables/useGastoActions'
import type { CajaChicaType } from '@/modules/Administracion/CajaChica/types/gastoTypes'

const gastoStore = useGastoStore()
const { getCajasChica } = useGastoActions()

const cajas = ref<CajaChicaType[]>([])
const conceptos = [
    { value: 'Papelería', label: 'Papelería' },
    { value: 'Transporte', label: 'Transporte' },
    { value: 'Cafetería', label: 'Cafetería' },
    { value: 'Limpieza', label: 'Limpieza' },
    { value: 'Suministros', label: 'Suministros' },
    { value: 'Mensajería', label: 'Mensajería' },
    { value: 'Estacionamiento', label: 'Estacionamiento' },
    { value: 'Otros', label: 'Otros' }
]

const centrosCosto = [
    { value: 'Administración', label: 'Administración' },
    { value: 'Ventas', label: 'Ventas' },
    { value: 'Operaciones', label: 'Operaciones' },
    { value: 'TI', label: 'TI' },
    { value: 'RH', label: 'RH' },
    { value: 'Marketing', label: 'Marketing' }
]

onMounted(async () => {
    const cajasData = await getCajasChica()
    cajas.value = cajasData.map(caja => ({
        ...caja,
        value: caja.id,
        label: caja.nombre
    })) as any
})
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <BaseFormSelect 
            name="cajaId" 
            label="Caja Chica" 
            :options="cajas" 
            :required="true" 
        />
        <BaseFormInput 
            name="fecha" 
            type="date" 
            label="Fecha" 
            :required="true" 
        />
    </div>
    
    <div class="grid grid-cols-2 gap-4">
        <BaseFormSelect 
            name="concepto" 
            label="Concepto" 
            :options="conceptos" 
            :required="true" 
        />
        <BaseFormInput 
            name="monto" 
            type="number" 
            label="Monto" 
            :required="true" 
        />
    </div>

    <BaseFormSelect 
        name="centroCosto" 
        label="Centro de Costo" 
        :options="centrosCosto" 
        :required="true" 
    />

    <BaseTextArea 
        name="descripcion" 
        label="Descripción" 
        :required="true" 
        rows="3"
    />

    <BaseFormInputFile 
        name="comprobante" 
        label="Comprobante" 
        :multiple="false" 
        accept="image/png, image/jpeg, application/pdf" 
    />
</template>

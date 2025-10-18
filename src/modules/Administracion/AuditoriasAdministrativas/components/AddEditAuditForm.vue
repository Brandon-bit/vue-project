<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import { useField } from 'vee-validate'

const { value: nombre } = useField<string>('nombre')
const { value: tipo } = useField<string>('tipo')
const { value: area } = useField<string>('area')
const { value: auditor } = useField<string>('auditor')
const { value: fechaInicio } = useField<string>('fechaInicio')
const { value: fechaFin } = useField<string>('fechaFin')
const { value: objetivo } = useField<string>('objetivo')
const { value: activo } = useField<boolean>('activo')

const tiposAuditoria = [
    { id: 'Fiscal', label: 'Fiscal' },
    { id: 'Operativa', label: 'Operativa' },
    { id: 'Cumplimiento', label: 'Cumplimiento' },
    { id: 'Calidad', label: 'Calidad' }
]

const areas = [
    { id: 'Contabilidad', label: 'Contabilidad' },
    { id: 'Recursos Humanos', label: 'Recursos Humanos' },
    { id: 'Compras', label: 'Compras' },
    { id: 'Almacén', label: 'Almacén' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Producción', label: 'Producción' },
    { id: 'Sistemas', label: 'Sistemas' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormInput
            v-model="nombre"
            name="nombre"
            label="Nombre de la Auditoría"
            placeholder="Ej. Auditoría Fiscal Q4 2024"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormSelect
                v-model="tipo"
                name="tipo"
                label="Tipo de Auditoría"
                placeholder="Seleccione el tipo"
                :options="tiposAuditoria"
            />

            <BaseFormSelect
                v-model="area"
                name="area"
                label="Área Auditada"
                placeholder="Seleccione el área"
                :options="areas"
            />
        </div>

        <BaseFormInput
            v-model="auditor"
            name="auditor"
            label="Auditor Asignado"
            placeholder="Nombre del auditor o despacho externo"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput
                v-model="fechaInicio"
                name="fechaInicio"
                label="Fecha de Inicio"
                type="date"
            />

            <BaseFormInput
                v-model="fechaFin"
                name="fechaFin"
                label="Fecha de Fin Estimada"
                type="date"
            />
        </div>

        <BaseTextArea
            v-model="objetivo"
            name="objetivo"
            label="Objetivo de la Auditoría"
            placeholder="Describa los objetivos y alcance de la auditoría..."
            :rows="4"
        />

        <BaseFormCheckbox
            v-model="activo"
            name="activo"
            label="Activo"
        />
    </div>
</template>

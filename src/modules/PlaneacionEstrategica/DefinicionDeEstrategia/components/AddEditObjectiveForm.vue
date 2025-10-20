<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useField } from 'vee-validate'

const perspectiveOptions = [
    { id: 'Financial', label: 'Financiera' },
    { id: 'Customer', label: 'Clientes' },
    { id: 'Process', label: 'Procesos Internos' },
    { id: 'Learning', label: 'Aprendizaje y Crecimiento' }
]

// Campos SMART como checkboxes
const { value: specific } = useField<boolean>('specific')
const { value: measurable } = useField<boolean>('measurable')
const { value: achievable } = useField<boolean>('achievable')
const { value: relevant } = useField<boolean>('relevant')
const { value: timeBound } = useField<boolean>('timeBound')
</script>

<template>
    <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <BaseFormInput
            name="name"
            label="Nombre del Objetivo"
            type="text"
            placeholder="ej. Incrementar la rentabilidad"
            :required="true"
        />

        <BaseTextArea
            name="description"
            label="Descripción"
            placeholder="Describe el objetivo en detalle..."
        />

        <BaseFormSelect
            name="perspective"
            label="Perspectiva BSC"
            :options="perspectiveOptions"
            :required="true"
        />

        <!-- Criterios SMART -->
        <div class="space-y-3 rounded-lg border border-base-300 p-4 bg-base-200">
            <p class="text-base font-semibold">Criterios SMART</p>
            
            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="specific"
                        class="checkbox checkbox-sm"
                    />
                    <span class="label-text text-sm">
                        <span class="font-medium">Específico:</span> El objetivo es claro y concreto
                    </span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="measurable"
                        class="checkbox checkbox-sm"
                    />
                    <span class="label-text text-sm">
                        <span class="font-medium">Medible:</span> Se puede cuantificar el progreso
                    </span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="achievable"
                        class="checkbox checkbox-sm"
                    />
                    <span class="label-text text-sm">
                        <span class="font-medium">Alcanzable:</span> Es realista y factible
                    </span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="relevant"
                        class="checkbox checkbox-sm"
                    />
                    <span class="label-text text-sm">
                        <span class="font-medium">Relevante:</span> Está alineado con la estrategia
                    </span>
                </label>
            </div>

            <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                    <input
                        type="checkbox"
                        v-model="timeBound"
                        class="checkbox checkbox-sm"
                    />
                    <span class="label-text text-sm">
                        <span class="font-medium">Temporal:</span> Tiene un plazo definido
                    </span>
                </label>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput
                name="kpi"
                label="KPI Asociado"
                type="text"
                placeholder="ej. Margen EBITDA"
                :required="true"
            />

            <BaseFormInput
                name="target"
                label="Meta"
                type="text"
                placeholder="ej. 25%"
                :required="true"
            />
        </div>

        <BaseFormInput
            name="deadline"
            label="Plazo"
            type="text"
            placeholder="ej. Diciembre 2025"
            :required="true"
        />
    </div>
</template>

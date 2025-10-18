<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useAuditStore from '../store/auditStore'
import { useField } from 'vee-validate'

const auditStore = useAuditStore()

const { value: auditoriaId } = useField<number>('auditoriaId')
const { value: severidad } = useField<string>('severidad')
const { value: descripcion } = useField<string>('descripcion')
const { value: responsable } = useField<string>('responsable')
const { value: fechaLimite } = useField<string>('fechaLimite')
const { value: estado } = useField<string>('estado')

const severidades = [
    { id: 'Alta', label: 'Alta - Impacto significativo' },
    { id: 'Media', label: 'Media - Requiere atención' },
    { id: 'Baja', label: 'Baja - Mejora menor' }
]

const estados = [
    { id: 'Pendiente', label: 'Pendiente' },
    { id: 'En Proceso', label: 'En Proceso' },
    { id: 'Completado', label: 'Completado' }
]
</script>

<template>
    <div class="space-y-4">
        <!-- Mostrar item no conforme si existe -->
        <div v-if="auditStore.selectedChecklistItem" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <div>
                <h3 class="font-bold">Item No Conforme</h3>
                <div class="text-sm">{{ auditStore.selectedChecklistItem.item }}</div>
            </div>
        </div>

        <BaseFormSelect
            v-model="severidad"
            name="severidad"
            label="Severidad del Hallazgo"
            placeholder="Seleccione la severidad"
            :options="severidades"
        />

        <BaseTextArea
            v-model="descripcion"
            name="descripcion"
            label="Descripción del Hallazgo"
            placeholder="Describa la desviación encontrada, causas y contexto..."
            :rows="4"
        />

        <BaseFormInput
            v-model="responsable"
            name="responsable"
            label="Responsable de Corrección"
            placeholder="Nombre del responsable"
        />

        <BaseFormInput
            v-model="fechaLimite"
            name="fechaLimite"
            label="Fecha Límite de Corrección"
            type="date"
        />

        <BaseFormSelect
            v-model="estado"
            name="estado"
            label="Estado"
            placeholder="Seleccione el estado"
            :options="estados"
        />

        <!-- Evidencia Fotográfica -->
        <div class="form-control">
            <label class="label">
                <span class="label-text">Evidencia Fotográfica (Opcional)</span>
            </label>
            <div class="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <span class="material-symbols-outlined text-6xl text-base-content/50 mb-2">photo_camera</span>
                <p class="text-sm text-base-content/70">Adjuntar fotos o documentos</p>
            </div>
        </div>
    </div>
</template>

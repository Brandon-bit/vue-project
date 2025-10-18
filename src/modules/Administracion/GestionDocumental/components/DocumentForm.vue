<script setup lang="ts">
import { ref } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'

const categories = [
    { id: 'contratos', label: 'Contratos' },
    { id: 'facturas', label: 'Facturas' },
    { id: 'nomina', label: 'Nómina' },
    { id: 'rh', label: 'RH' },
    { id: 'legal', label: 'Legal' },
    { id: 'otros', label: 'Otros' }
]

const documentTypes = [
    { id: 'Contrato', label: 'Contrato' },
    { id: 'Factura', label: 'Factura' },
    { id: 'Recibo', label: 'Recibo' },
    { id: 'Comprobante', label: 'Comprobante' },
    { id: 'Expediente', label: 'Expediente' },
    { id: 'Acta', label: 'Acta' },
    { id: 'Poder', label: 'Poder' },
    { id: 'Otro', label: 'Otro' }
]

const showFileInput = ref(true)
</script>

<template>
    <div class="space-y-4">
        <div v-if="showFileInput" class="space-y-2">
            <label class="label">
                <span class="label-text">Archivo</span>
            </label>
            <BaseFormInputFile 
                name="file"
                label=""
                :multiple="false"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <p class="text-xs text-base-content/70 mt-1">PDF, DOC, XLS, JPG (Máx. 50MB)</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <BaseFormSelect 
                name="category" 
                label="Categoría" 
                :options="categories" 
                :required="true" 
            />

            <BaseFormSelect 
                name="documentType" 
                label="Tipo de Documento" 
                :options="documentTypes" 
                :required="true" 
            />
        </div>

        <BaseFormInput 
            name="name" 
            type="text" 
            label="Nombre del Documento" 
            :required="true" 
            placeholder="Ej. Contrato de Servicios 2025"
        />

        <BaseFormInput 
            name="tags" 
            type="text" 
            label="Etiquetas (Tags)" 
            placeholder="Separadas por comas: fiscal, vigente, importante"
        />

        <BaseTextArea 
            name="description" 
            label="Descripción / Notas" 
            rows="3"
            placeholder="Información adicional sobre el documento..."
        />

        <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" name="confidential" class="checkbox checkbox-primary" />
                <span class="label-text">Marcar como Confidencial</span>
            </label>
        </div>
    </div>
</template>

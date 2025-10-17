<script setup lang="ts">
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useSupplierEvaluationStore from '@/modules/Compras/EvaluacionDeProveedores/store/supplierEvaluationStore'

const supplierEvaluationStore = useSupplierEvaluationStore()

const purchaseOrderOptions = [
    { id: 'OC-2024-001', label: 'OC-2024-001' },
    { id: 'OC-2024-002', label: 'OC-2024-002' },
    { id: 'OC-2024-003', label: 'OC-2024-003' },
    { id: 'OC-2024-004', label: 'OC-2024-004' }
]

const incidentTypeOptions = [
    { id: 'calidad', label: 'Producto dañado / Defecto de calidad' },
    { id: 'incompleto', label: 'Entrega incompleta' },
    { id: 'retraso', label: 'Retraso en entrega' },
    { id: 'diferencia', label: 'Diferencia en facturación' }
]

const impactOptions = [
    { id: 'bajo', label: 'Bajo (-0.1 pts)' },
    { id: 'medio', label: 'Medio (-0.3 pts)' },
    { id: 'alto', label: 'Alto (-0.5 pts)' },
    { id: 'critico', label: 'Crítico (-1.0 pts)' }
]
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <p class="font-semibold">Registrando incidencia para: {{ supplierEvaluationStore.selectedSupplier?.name }}</p>
                <p class="text-sm">Esta incidencia afectará la calificación del proveedor según el impacto seleccionado.</p>
            </div>
        </div>

        <input type="hidden" name="supplierId" :value="supplierEvaluationStore.selectedSupplier?.id" />

        <BaseFormSelect
            name="purchaseOrder"
            label="Orden de Compra Relacionada"
            :options="purchaseOrderOptions"
            :required="true"
        />

        <BaseFormSelect
            name="incidentType"
            label="Tipo de Incidencia"
            :options="incidentTypeOptions"
            :required="true"
        />

        <div>
            <label class="font-semibold mb-2 block">
                Descripción Detallada <span class="text-error">*</span>
            </label>
            <textarea
                name="description"
                placeholder="Describe la incidencia, el impacto y las acciones tomadas..."
                class="textarea textarea-bordered w-full"
                rows="4"
                required
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
                Mínimo 10 caracteres. Incluye detalles sobre qué sucedió, cómo afectó y qué se hizo al respecto.
            </p>
        </div>

        <BaseFormSelect
            name="impact"
            label="Impacto en Calificación"
            :options="impactOptions"
            :required="true"
        />

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <div class="text-sm">
                <p class="font-semibold mb-1">Cálculo Automático de Puntuaciones</p>
                <ul class="list-disc list-inside space-y-1">
                    <li><strong>Calidad:</strong> Se ajusta según incidencias de productos dañados o defectos</li>
                    <li><strong>Tiempo:</strong> Se calcula comparando fecha prometida vs. fecha real de entrega</li>
                    <li><strong>Precio:</strong> Se evalúa la competitividad y cumplimiento de cotizaciones</li>
                    <li><strong>Soporte:</strong> Se mide la respuesta y solución a problemas</li>
                </ul>
            </div>
        </div>
    </div>
</template>

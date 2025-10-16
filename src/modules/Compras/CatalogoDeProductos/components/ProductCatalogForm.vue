<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const categoryOptions = [
    { id: 'Papelería', label: 'Papelería' },
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Servicios', label: 'Servicios' },
    { id: 'Materiales', label: 'Materiales' }
]

const unitOptions = [
    { id: 'Pza', label: 'Pieza' },
    { id: 'Caja', label: 'Caja' },
    { id: 'Kg', label: 'Kilogramo' },
    { id: 'Lt', label: 'Litro' },
    { id: 'Servicio', label: 'Servicio' }
]

const accountOptions = [
    { id: '5101', label: '5101 - Papelería y útiles' },
    { id: '5102', label: '5102 - Equipo de cómputo' },
    { id: '5103', label: '5103 - Servicios generales' },
    { id: '5104', label: '5104 - Materiales de oficina' }
]

const supplierOptions = [
    { id: 'Distribuidora Nacional', label: 'Distribuidora Nacional S.A.' },
    { id: 'Servicios Industriales', label: 'Servicios Industriales del Norte' },
    { id: 'Tech Solutions', label: 'Tech Solutions México' }
]
</script>

<template>
    <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFormInput
                name="code"
                type="text"
                label="Código"
                placeholder="MAT-001"
                :required="true"
            />
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre"
                placeholder="Nombre del producto o servicio"
                :required="true"
            />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFormSelect
                name="category"
                label="Categoría"
                :options="categoryOptions"
                :required="true"
            />
            <BaseFormSelect
                name="unit"
                label="Unidad de Medida"
                :options="unitOptions"
                :required="true"
            />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFormInput
                name="estimatedCost"
                type="number"
                label="Costo Estimado"
                placeholder="0.00"
                :required="true"
            />
            <BaseFormSelect
                name="accountingAccount"
                label="Cuenta Contable"
                :options="accountOptions"
            />
        </div>

        <div>
            <BaseFormSelect
                name="preferredSupplier"
                label="Proveedor Preferente"
                :options="supplierOptions"
                :required="true"
            />
        </div>

        <div>
            <label class="font-semibold mb-2 block">
                Descripción <span class="text-sm text-gray-500">(Opcional)</span>
            </label>
            <textarea
                name="description"
                placeholder="Descripción detallada del producto o servicio"
                class="textarea textarea-bordered w-full"
                rows="3"
            ></textarea>
        </div>

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span class="text-sm">
                El código debe seguir el formato: XXX-000 (ej: MAT-001, TEC-015, SRV-008)
            </span>
        </div>
    </div>
</template>

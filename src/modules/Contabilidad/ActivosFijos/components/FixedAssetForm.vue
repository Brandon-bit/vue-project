<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useFixedAssetsStore from '@/modules/Contabilidad/ActivosFijos/store/fixedAssetsStore'
import { useModalStore } from '@/shared/stores/modal.store'

const fixedAssetsStore = useFixedAssetsStore()
const modalStore = useModalStore()

const accountingAccountOptions = [
    { id: '1201-001', label: '1201-001 - Equipo de cómputo' },
    { id: '1202-001', label: '1202-001 - Equipo de transporte' },
    { id: '1203-001', label: '1203-001 - Mobiliario y equipo' },
    { id: '1204-001', label: '1204-001 - Maquinaria y equipo' }
]

const areaOptions = [
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Administración', label: 'Administración' },
    { id: 'Producción', label: 'Producción' },
    { id: 'Mantenimiento', label: 'Mantenimiento' }
]

const statusOptions = [
    { id: 'Activo', label: 'Activo' },
    { id: 'Dado de baja', label: 'Dado de baja' }
]

const isViewMode = () => {
    return modalStore.modals[fixedAssetsStore.modalId]?.type === 'VIEW'
}
</script>

<template>
    <div class="space-y-6">
        <!-- Información General -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Información General</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                    <BaseFormInput 
                        name="description" 
                        type="text" 
                        label="Descripción del activo" 
                        :required="true"
                        :readonly="isViewMode()"
                    />
                </div>
                <BaseFormInput 
                    name="brand" 
                    type="text" 
                    label="Marca" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="model" 
                    type="text" 
                    label="Modelo" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="serialNumber" 
                    type="text" 
                    label="Número de serie" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="acquisitionDate" 
                    type="date" 
                    label="Fecha de adquisición" 
                    :required="true"
                    :readonly="isViewMode()"
                />
            </div>
        </div>

        <!-- Información Financiera -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Información Financiera</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput 
                    name="supplier" 
                    type="text" 
                    label="Proveedor" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="invoice" 
                    type="text" 
                    label="Factura asociada" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="originalValue" 
                    type="number" 
                    label="Valor original (sin IVA)" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormInput 
                    name="usefulLife" 
                    type="number" 
                    label="Vida útil (meses)" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <div class="md:col-span-2">
                    <BaseFormSelect 
                        name="accountingAccount" 
                        label="Cuenta contable de activo" 
                        :options="accountingAccountOptions"
                        :required="true"
                        :disabled="isViewMode()"
                    />
                </div>
            </div>
        </div>

        <!-- Ubicación y Asignación -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold border-b pb-2">Ubicación y Asignación</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseFormInput 
                    name="physicalLocation" 
                    type="text" 
                    label="Ubicación física" 
                    :required="true"
                    :readonly="isViewMode()"
                />
                <BaseFormSelect 
                    name="area" 
                    label="Área" 
                    :options="areaOptions"
                    :required="true"
                    :disabled="isViewMode()"
                />
                <div class="md:col-span-2">
                    <BaseFormInput 
                        name="responsible" 
                        type="text" 
                        label="Responsable" 
                        :required="true"
                        :readonly="isViewMode()"
                    />
                </div>
                <div class="md:col-span-2">
                    <BaseFormSelect 
                        name="status" 
                        label="Estatus" 
                        :options="statusOptions"
                        :required="true"
                        :disabled="isViewMode()"
                    />
                </div>
                <div class="md:col-span-2">
                    <BaseTextArea 
                        name="notes" 
                        label="Notas adicionales"
                        :readonly="isViewMode()"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'
import type { PermissionTypeInfo } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

const props = defineProps<{
    permissionTypes: PermissionTypeInfo[]
}>()

const permissionStore = usePermissionStore()

const availableResources: Record<string, { id: string, label: string }[]> = {
    vehiculo: [
        { id: 'vehiculo-1', label: 'Vehículo #1 - Honda Civic' },
        { id: 'vehiculo-2', label: 'Vehículo #2 - Nissan Versa' },
        { id: 'vehiculo-3', label: 'Vehículo #3 - Toyota Corolla' }
    ],
    equipo: [
        { id: 'laptop-dell', label: 'Laptop Dell XPS' },
        { id: 'proyector-hd', label: 'Proyector HD' },
        { id: 'pantalla', label: 'Pantalla Portátil' },
        { id: 'camara', label: 'Cámara Web 4K' }
    ],
    sala: [
        { id: 'sala-a', label: 'Sala A - Planta Baja (Cap. 10)' },
        { id: 'sala-b', label: 'Sala B - Primer Piso (Cap. 6)' },
        { id: 'sala-ejecutiva', label: 'Sala Ejecutiva (Cap. 15)' }
    ],
    ausencia: [
        { id: 'na', label: 'N/A' }
    ]
}

const selectedType = computed(() => {
    return props.permissionTypes.find(t => t.id === permissionStore.selectedPermissionType)
})

const resourceOptions = computed(() => {
    if (!permissionStore.selectedPermissionType) return []
    return availableResources[permissionStore.selectedPermissionType] || []
})

const changeType = () => {
    permissionStore.setSelectedPermissionType('')
}
</script>

<template>
    <div class="space-y-4">
        <!-- Tipo seleccionado -->
        <div v-if="selectedType" class="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
            <span :class="['material-symbols-outlined text-3xl', selectedType.color]">{{ selectedType.icon }}</span>
            <div class="flex-1">
                <p class="font-semibold">{{ selectedType.name }}</p>
                <p class="text-xs text-base-content/70">{{ selectedType.description }}</p>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" @click="changeType">
                Cambiar
            </button>
        </div>

        <!-- Campo oculto para el tipo -->
        <input type="hidden" name="permissionType" :value="permissionStore.selectedPermissionType" />

        <BaseFormSelect 
            name="resource" 
            label="Recurso / Tipo" 
            :options="resourceOptions" 
            :required="true"
            placeholder="Seleccione el recurso"
        />

        <div class="grid grid-cols-2 gap-4">
            <BaseFormInput 
                name="startDate" 
                type="date" 
                label="Fecha Inicio" 
                :required="true" 
            />

            <BaseFormInput 
                name="endDate" 
                type="date" 
                label="Fecha Fin" 
                :required="true" 
            />
        </div>

        <BaseTextArea 
            name="reason" 
            label="Motivo / Justificación" 
            rows="4"
            placeholder="Describa el motivo de su solicitud..."
            :required="true"
        />

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <div>
                <p class="font-medium text-sm">Disponibilidad</p>
                <p class="text-xs">El recurso está disponible en las fechas seleccionadas</p>
            </div>
        </div>
    </div>
</template>

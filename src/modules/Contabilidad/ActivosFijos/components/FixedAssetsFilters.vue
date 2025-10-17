<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'filter', filters: { search: string; area: string; status: string }): void
}>()

const searchTerm = ref('')
const selectedArea = ref('0')
const selectedStatus = ref('0')

const areaOptions = [
    { id: 'todas', label: 'Todas' },
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Ventas', label: 'Ventas' },
    { id: 'Administración', label: 'Administración' },
    { id: 'Producción', label: 'Producción' },
    { id: 'Mantenimiento', label: 'Mantenimiento' }
]

const statusOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'activo', label: 'Activos' },
    { id: 'baja', label: 'Dados de baja' }
]

const applyFilters = () => {
    emit('filter', {
        search: searchTerm.value,
        area: selectedArea.value === '0' ? '' : selectedArea.value,
        status: selectedStatus.value === '0' ? '' : selectedStatus.value
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-md mb-6">
        <div class="card-body">
            <h3 class="card-title text-lg mb-4">Filtros</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Buscar -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold">Buscar</label>
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-3 top-3 text-base-content/50">
                            search
                        </span>
                        <input
                            v-model="searchTerm"
                            type="text"
                            placeholder="Buscar por ID, descripción o responsable..."
                            class="input input-bordered w-full pl-10"
                            @input="applyFilters"
                        />
                    </div>
                </div>

                <!-- Área -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold">Área</label>
                    <select
                        v-model="selectedArea"
                        class="select select-bordered w-full"
                        @change="applyFilters"
                    >
                        <option value="0">Elige una opción</option>
                        <option
                            v-for="option in areaOptions"
                            :key="option.id"
                            :value="option.id"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>

                <!-- Estatus -->
                <div class="flex flex-col space-y-2">
                    <label class="font-semibold">Estatus</label>
                    <select
                        v-model="selectedStatus"
                        class="select select-bordered w-full"
                        @change="applyFilters"
                    >
                        <option value="0">Elige una opción</option>
                        <option
                            v-for="option in statusOptions"
                            :key="option.id"
                            :value="option.id"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

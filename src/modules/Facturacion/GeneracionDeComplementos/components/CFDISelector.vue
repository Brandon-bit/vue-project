<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'
import { useComplementActions } from '@/modules/Facturacion/GeneracionDeComplementos/composables/useComplementActions'
import type { CFDIDisponibleType } from '@/modules/Facturacion/GeneracionDeComplementos/types/complementTypes'

const complementStore = useComplementStore()
const { getCFDIsDisponibles } = useComplementActions()

const cfdisDisponibles = ref<CFDIDisponibleType[]>([])
const searchTerm = ref('')
const isLoading = ref(false)

const filteredCFDIs = ref<CFDIDisponibleType[]>([])

const loadCFDIs = async () => {
    isLoading.value = true
    try {
        cfdisDisponibles.value = await getCFDIsDisponibles()
        filteredCFDIs.value = cfdisDisponibles.value
    } catch (error) {
        console.error('Error loading CFDIs:', error)
    } finally {
        isLoading.value = false
    }
}

const searchCFDI = () => {
    if (!searchTerm.value) {
        filteredCFDIs.value = cfdisDisponibles.value
        return
    }
    
    const term = searchTerm.value.toLowerCase()
    filteredCFDIs.value = cfdisDisponibles.value.filter(cfdi =>
        cfdi.folio.toLowerCase().includes(term) ||
        cfdi.uuid.toLowerCase().includes(term) ||
        cfdi.receptor.toLowerCase().includes(term)
    )
}

const selectCFDI = (cfdi: CFDIDisponibleType) => {
    complementStore.setCfdiSeleccionado(cfdi)
    complementStore.setCurrentStep('formulario')
}

onMounted(() => {
    loadCFDIs()
})
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">search</span>
            <span>Selecciona la factura a la que se le aplicará el complemento</span>
        </div>

        <!-- Buscador -->
        <div class="flex gap-2">
            <input
                v-model="searchTerm"
                @input="searchCFDI"
                type="text"
                placeholder="Buscar por Folio Fiscal (UUID), Folio o RFC del Receptor"
                class="input input-bordered w-full"
            />
            <button @click="searchCFDI" class="btn btn-square btn-primary">
                <span class="material-symbols-outlined">search</span>
            </button>
        </div>

        <div class="divider">CFDIs Pendientes de Complemento</div>

        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-3">
            <div v-for="n in 3" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                <div class="card-body">
                    <div class="h-20 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredCFDIs.length === 0" class="card bg-base-100 border border-base-content/10">
            <div class="card-body text-center py-12">
                <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                <p class="text-gray-500">No se encontraron CFDIs disponibles</p>
            </div>
        </div>

        <!-- Lista de CFDIs -->
        <div v-else class="space-y-3">
            <div
                v-for="cfdi in filteredCFDIs"
                :key="cfdi.id"
                @click="selectCFDI(cfdi)"
                class="card bg-base-100 border border-base-content/10 cursor-pointer hover:border-primary hover:shadow-lg transition-all"
            >
                <div class="card-body p-4">
                    <div class="flex justify-between items-start">
                        <div class="space-y-1 flex-1">
                            <p class="font-semibold text-lg">Folio: {{ cfdi.folio }}</p>
                            <p class="text-sm text-gray-500 font-mono">UUID: {{ cfdi.uuid }}</p>
                            <p class="text-sm">{{ cfdi.receptor }}</p>
                            <div class="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-sm">calendar_today</span>
                                    {{ new Date(cfdi.fecha).toLocaleDateString('es-MX') }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="material-symbols-outlined text-sm">payment</span>
                                    Método: {{ cfdi.metodoPago }}
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-primary">${{ cfdi.total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}</p>
                            <p class="text-xs text-gray-500">MXN</p>
                            <button class="btn btn-sm btn-primary mt-2">
                                <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import RetencionModal from '@/modules/Facturacion/ConstanciasDeRetencion/components/RetencionModal.vue'
import useRetencionStore from '@/modules/Facturacion/ConstanciasDeRetencion/store/retencionStore'
import { useRetencionActions } from '@/modules/Facturacion/ConstanciasDeRetencion/composables/useRetencionActions'
import type { ConstanciaGeneradaType } from '@/modules/Facturacion/ConstanciasDeRetencion/types/retencionTypes'
import { showNotification } from '@/utils/toastNotifications'

const retencionStore = useRetencionStore()
const modalStore = useModalStore()
const { getConstanciasGeneradas, descargarPDF, descargarXML, cancelarConstancia } = useRetencionActions()

const constancias = ref<ConstanciaGeneradaType[]>([])
const isLoading = ref(false)

const getStatusBadge = (status: string): string => {
    const badgeMap: Record<string, string> = {
        'Vigente': 'badge-success',
        'Cancelada': 'badge-error'
    }
    return badgeMap[status] || 'badge-neutral'
}

const fetchData = async () => {
    isLoading.value = true
    try {
        constancias.value = await getConstanciasGeneradas()
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    retencionStore.reset()
    modalStore.open(retencionStore.modalId, {
        type: 'CREATE',
        title: 'Nueva Constancia de Retención'
    })
}

const handleDescargarPDF = async (uuid: string) => {
    try {
        const result = await descargarPDF(uuid)
        showNotification(result.message, result.status)
    } catch (error) {
        showNotification('Error al descargar PDF', 'error')
    }
}

const handleDescargarXML = async (uuid: string) => {
    try {
        const result = await descargarXML(uuid)
        showNotification(result.message, result.status)
    } catch (error) {
        showNotification('Error al descargar XML', 'error')
    }
}

const handleCancelar = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta constancia?')) {
        return
    }
    
    try {
        const result = await cancelarConstancia(id)
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            await fetchData()
        }
    } catch (error) {
        showNotification('Error al cancelar constancia', 'error')
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Constancias de Retención" 
            subtitle="Genera y gestiona constancias de retenciones de ISR e IVA"
        />
        <div class="flex items-center justify-end">
            <BaseButton text="Nueva Constancia" @click="openCreateModal" icon="add" />
        </div>

        <!-- Tarjetas de Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Total Constancias
                    </h3>
                    <div class="text-2xl font-bold">{{ constancias.length }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Vigentes
                    </h3>
                    <div class="text-2xl font-bold text-green-500">
                        {{ constancias.filter(c => c.estatus === 'Vigente').length }}
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">payments</span>
                        Total Retenido
                    </h3>
                    <div class="text-2xl font-bold text-primary">
                        ${{ constancias.filter(c => c.estatus === 'Vigente').reduce((sum, c) => sum + c.totalRetenido, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Listado de Constancias -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Constancias Generadas</h3>

                <div v-if="isLoading" class="space-y-3">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else-if="constancias.length === 0" class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p class="text-gray-500">No hay constancias generadas</p>
                    <button @click="openCreateModal" class="btn btn-primary mt-4">
                        <span class="material-symbols-outlined">add</span>
                        Generar Primera Constancia
                    </button>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>UUID</th>
                                <th>Receptor</th>
                                <th>Periodo</th>
                                <th class="text-right">Total Retenido</th>
                                <th>Fecha</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="constancia in constancias" :key="constancia.id">
                                <td class="font-semibold">{{ constancia.folio }}</td>
                                <td class="font-mono text-xs">{{ constancia.uuid }}</td>
                                <td>{{ constancia.receptor }}</td>
                                <td>{{ constancia.periodo }}</td>
                                <td class="text-right font-semibold">
                                    ${{ constancia.totalRetenido.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </td>
                                <td>{{ new Date(constancia.fecha).toLocaleDateString('es-MX') }}</td>
                                <td>
                                    <span :class="['badge', getStatusBadge(constancia.estatus)]">
                                        {{ constancia.estatus }}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-1">
                                        <button
                                            @click="handleDescargarPDF(constancia.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar PDF"
                                        >
                                            <span class="material-symbols-outlined text-sm">picture_as_pdf</span>
                                        </button>
                                        <button
                                            @click="handleDescargarXML(constancia.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar XML"
                                        >
                                            <span class="material-symbols-outlined text-sm">download</span>
                                        </button>
                                        <button
                                            v-if="constancia.estatus === 'Vigente'"
                                            @click="handleCancelar(constancia.id)"
                                            class="btn btn-ghost btn-sm btn-square text-error"
                                            title="Cancelar"
                                        >
                                            <span class="material-symbols-outlined text-sm">cancel</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <RetencionModal :onRefresh="fetchData" />
    </div>
</template>

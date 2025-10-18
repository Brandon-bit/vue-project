<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import CFDIModal from '@/modules/Facturacion/GeneracionDeCFDI/components/CFDIModal.vue'
import useCFDIStore from '@/modules/Facturacion/GeneracionDeCFDI/store/cfdiStore'
import { useCFDIActions } from '@/modules/Facturacion/GeneracionDeCFDI/composables/useCFDIActions'
import type { CFDIGeneradoType } from '@/modules/Facturacion/GeneracionDeCFDI/types/cfdiTypes'
import { showNotification } from '@/utils/toastNotifications'

const cfdiStore = useCFDIStore()
const modalStore = useModalStore()
const { getCFDIsGenerados, descargarPDF, descargarXML, cancelarCFDI, enviarPorCorreo } = useCFDIActions()

const cfdis = ref<CFDIGeneradoType[]>([])
const isLoading = ref(false)

const getStatusBadge = (status: string): string => {
    const badgeMap: Record<string, string> = {
        'Vigente': 'badge-success',
        'Cancelado': 'badge-error'
    }
    return badgeMap[status] || 'badge-neutral'
}

const getMetodoPagoBadge = (metodo: string): string => {
    return metodo === 'PUE' ? 'badge-info' : 'badge-warning'
}

const fetchData = async () => {
    isLoading.value = true
    try {
        cfdis.value = await getCFDIsGenerados()
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    cfdiStore.reset()
    modalStore.open(cfdiStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo CFDI 4.0'
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

const handleEnviarCorreo = async (uuid: string) => {
    const email = prompt('Ingresa el correo electrónico del receptor:')
    if (!email) return
    
    try {
        const result = await enviarPorCorreo(uuid, email)
        showNotification(result.message, result.status)
    } catch (error) {
        showNotification('Error al enviar correo', 'error')
    }
}

const handleCancelar = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas cancelar este CFDI?')) {
        return
    }
    
    try {
        const result = await cancelarCFDI(id)
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            await fetchData()
        }
    } catch (error) {
        showNotification('Error al cancelar CFDI', 'error')
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Generación de CFDI 4.0" 
            subtitle="Genera facturas electrónicas cumpliendo con la normativa del SAT"
        />
        <div class="flex items-center justify-end">
            <div class="flex gap-2">
                <button class="btn btn-outline">
                    <span class="material-symbols-outlined">description</span>
                    Plantillas
                </button>
                <BaseButton text="Nuevo CFDI" @click="openCreateModal" icon="add" />
            </div>
        </div>

        <!-- Tarjetas de Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Total CFDIs
                    </h3>
                    <div class="text-2xl font-bold">{{ cfdis.length }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Vigentes
                    </h3>
                    <div class="text-2xl font-bold text-green-500">
                        {{ cfdis.filter(c => c.estatus === 'Vigente').length }}
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">payments</span>
                        Total Facturado
                    </h3>
                    <div class="text-2xl font-bold text-primary">
                        ${{ cfdis.filter(c => c.estatus === 'Vigente').reduce((sum, c) => sum + c.total, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">calendar_today</span>
                        Este Mes
                    </h3>
                    <div class="text-2xl font-bold text-blue-500">
                        {{ cfdis.filter(c => new Date(c.fecha).getMonth() === new Date().getMonth()).length }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Listado de CFDIs -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">CFDIs Generados</h3>

                <div v-if="isLoading" class="space-y-3">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else-if="cfdis.length === 0" class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p class="text-gray-500">No hay CFDIs generados</p>
                    <button @click="openCreateModal" class="btn btn-primary mt-4">
                        <span class="material-symbols-outlined">add</span>
                        Generar Primer CFDI
                    </button>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Serie-Folio</th>
                                <th>UUID</th>
                                <th>Receptor</th>
                                <th>Fecha</th>
                                <th class="text-right">Total</th>
                                <th>Método</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cfdi in cfdis" :key="cfdi.id">
                                <td class="font-semibold">{{ cfdi.serie }}-{{ cfdi.folio }}</td>
                                <td class="font-mono text-xs">{{ cfdi.uuid }}</td>
                                <td>{{ cfdi.receptor }}</td>
                                <td>{{ new Date(cfdi.fecha).toLocaleDateString('es-MX') }}</td>
                                <td class="text-right font-semibold">
                                    ${{ cfdi.total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </td>
                                <td>
                                    <span :class="['badge badge-sm', getMetodoPagoBadge(cfdi.metodoPago)]">
                                        {{ cfdi.metodoPago }}
                                    </span>
                                </td>
                                <td>
                                    <span :class="['badge', getStatusBadge(cfdi.estatus)]">
                                        {{ cfdi.estatus }}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-1">
                                        <button
                                            @click="handleDescargarPDF(cfdi.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar PDF"
                                        >
                                            <span class="material-symbols-outlined text-sm">picture_as_pdf</span>
                                        </button>
                                        <button
                                            @click="handleDescargarXML(cfdi.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar XML"
                                        >
                                            <span class="material-symbols-outlined text-sm">download</span>
                                        </button>
                                        <button
                                            @click="handleEnviarCorreo(cfdi.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Enviar por Correo"
                                        >
                                            <span class="material-symbols-outlined text-sm">mail</span>
                                        </button>
                                        <button
                                            v-if="cfdi.estatus === 'Vigente'"
                                            @click="handleCancelar(cfdi.id)"
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

        <CFDIModal :onRefresh="fetchData" />
    </div>
</template>

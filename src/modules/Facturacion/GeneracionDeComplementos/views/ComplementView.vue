<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ComplementModal from '@/modules/Facturacion/GeneracionDeComplementos/components/ComplementModal.vue'
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'
import { useComplementActions } from '@/modules/Facturacion/GeneracionDeComplementos/composables/useComplementActions'
import type { ComplementoGeneradoType } from '@/modules/Facturacion/GeneracionDeComplementos/types/complementTypes'
import { showNotification } from '@/utils/toastNotifications'

const complementStore = useComplementStore()
const modalStore = useModalStore()
const { getComplementosGenerados, descargarPDF, descargarXML, cancelarComplemento } = useComplementActions()

const complementos = ref<ComplementoGeneradoType[]>([])
const isLoading = ref(false)

const getStatusBadge = (status: string): string => {
    const badgeMap: Record<string, string> = {
        'Vigente': 'badge-success',
        'Cancelado': 'badge-error'
    }
    return badgeMap[status] || 'badge-neutral'
}

const getTipoIcon = (tipo: string): string => {
    const iconMap: Record<string, string> = {
        'pago': 'payments',
        'cartaporte': 'local_shipping'
    }
    return iconMap[tipo] || 'description'
}

const getTipoLabel = (tipo: string): string => {
    const labelMap: Record<string, string> = {
        'pago': 'Complemento de Pago',
        'cartaporte': 'Carta Porte'
    }
    return labelMap[tipo] || tipo
}

const fetchData = async () => {
    isLoading.value = true
    try {
        complementos.value = await getComplementosGenerados()
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    complementStore.reset()
    modalStore.open(complementStore.modalId, {
        type: 'CREATE',
        title: 'Generación de Complementos'
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
    if (!confirm('¿Estás seguro de que deseas cancelar este complemento?')) {
        return
    }
    
    try {
        const result = await cancelarComplemento(id)
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            await fetchData()
        }
    } catch (error) {
        showNotification('Error al cancelar complemento', 'error')
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Generación de Complementos" 
            subtitle="Genera complementos de pago, carta porte y más de forma optimizada"
        />
        <div class="flex items-center justify-end">
            <BaseButton text="Nuevo Complemento" @click="openCreateModal" icon="add" />
        </div>

        <!-- Tarjetas de Información -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Total Complementos
                    </h3>
                    <div class="text-2xl font-bold">{{ complementos.length }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">payments</span>
                        Complementos de Pago
                    </h3>
                    <div class="text-2xl font-bold text-green-500">
                        {{ complementos.filter(c => c.tipo === 'pago').length }}
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">local_shipping</span>
                        Cartas Porte
                    </h3>
                    <div class="text-2xl font-bold text-blue-500">
                        {{ complementos.filter(c => c.tipo === 'cartaporte').length }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Listado de Complementos -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Complementos Generados</h3>

                <div v-if="isLoading" class="space-y-3">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else-if="complementos.length === 0" class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p class="text-gray-500">No hay complementos generados</p>
                    <button @click="openCreateModal" class="btn btn-primary mt-4">
                        <span class="material-symbols-outlined">add</span>
                        Generar Primer Complemento
                    </button>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Folio</th>
                                <th>UUID</th>
                                <th>CFDI Relacionado</th>
                                <th>Fecha</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="complemento in complementos" :key="complemento.id">
                                <td>
                                    <div class="flex items-center gap-2">
                                        <span class="material-symbols-outlined text-primary">
                                            {{ getTipoIcon(complemento.tipo) }}
                                        </span>
                                        <span class="text-sm">{{ getTipoLabel(complemento.tipo) }}</span>
                                    </div>
                                </td>
                                <td class="font-semibold">{{ complemento.folio }}</td>
                                <td class="font-mono text-xs">{{ complemento.uuid }}</td>
                                <td>{{ complemento.cfdiRelacionado }}</td>
                                <td>{{ new Date(complemento.fecha).toLocaleDateString('es-MX') }}</td>
                                <td>
                                    <span :class="['badge', getStatusBadge(complemento.estatus)]">
                                        {{ complemento.estatus }}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex gap-1">
                                        <button
                                            @click="handleDescargarPDF(complemento.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar PDF"
                                        >
                                            <span class="material-symbols-outlined text-sm">picture_as_pdf</span>
                                        </button>
                                        <button
                                            @click="handleDescargarXML(complemento.uuid)"
                                            class="btn btn-ghost btn-sm btn-square"
                                            title="Descargar XML"
                                        >
                                            <span class="material-symbols-outlined text-sm">download</span>
                                        </button>
                                        <button
                                            v-if="complemento.estatus === 'Vigente'"
                                            @click="handleCancelar(complemento.id)"
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

        <ComplementModal :onRefresh="fetchData" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useFacturaStore from '@/modules/Facturacion/MatrizDeFacturas/store/facturaStore'
import { useFacturaActions } from '@/modules/Facturacion/MatrizDeFacturas/composables/useFacturaActions'
import type { FacturaType } from '@/modules/Facturacion/MatrizDeFacturas/types/facturaTypes'
import { showNotification } from '@/utils/toastNotifications'
import FiltrosFacturas from '@/modules/Facturacion/MatrizDeFacturas/components/FiltrosFacturas.vue'
import ConfigSATModal from '@/modules/Facturacion/MatrizDeFacturas/components/ConfigSATModal.vue'

const facturaStore = useFacturaStore()
const modalStore = useModalStore()
const { getFacturas, calcularResumen, sincronizarSAT, descargarPDF, descargarXML, enviarPorCorreo, cancelarCFDI } = useFacturaActions()

const facturas = ref<FacturaType[]>([])
const isLoading = ref(false)
const isSyncing = ref(false)

const resumen = computed(() => calcularResumen(facturas.value))

const facturasFiltradas = computed(() => {
    let filtered = facturas.value

    // Filtro por tipo
    if (facturaStore.filtros.tipo !== 'todas') {
        filtered = filtered.filter(f => f.tipo === facturaStore.filtros.tipo)
    }

    // Filtro por estatus
    if (facturaStore.filtros.estatus !== 'todos') {
        filtered = filtered.filter(f => f.estatus === facturaStore.filtros.estatus)
    }

    // Filtro por fechas
    if (facturaStore.filtros.fechaDesde) {
        filtered = filtered.filter(f => f.fecha >= facturaStore.filtros.fechaDesde)
    }
    if (facturaStore.filtros.fechaHasta) {
        filtered = filtered.filter(f => f.fecha <= facturaStore.filtros.fechaHasta)
    }

    // Filtro por búsqueda
    if (facturaStore.filtros.busqueda) {
        const search = facturaStore.filtros.busqueda.toLowerCase()
        filtered = filtered.filter(f =>
            f.folioFiscal.toLowerCase().includes(search) ||
            f.folio.toLowerCase().includes(search) ||
            f.emisor.toLowerCase().includes(search) ||
            f.receptor.toLowerCase().includes(search)
        )
    }

    return filtered
})

// Definición de columnas para BaseTable
const columns: ColumnDef<FacturaType>[] = [
    {
        accessorKey: 'tipo',
        header: 'Tipo',
        cell: ({ row }) => {
            const tipo = row.original.tipo
            return h('div', { class: 'flex items-center gap-2' }, [
                h('span', {
                    class: tipo === 'emitida' ? 'material-symbols-outlined text-green-500' : 'material-symbols-outlined text-blue-500'
                }, tipo === 'emitida' ? 'arrow_upward' : 'arrow_downward'),
                h('span', { class: 'text-xs' }, tipo === 'emitida' ? 'Emitida' : 'Recibida')
            ])
        }
    },
    {
        accessorKey: 'folio',
        header: 'Folio',
        cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.folio)
    },
    {
        accessorKey: 'folioFiscal',
        header: 'Folio Fiscal (UUID)',
        cell: ({ row }) => h('span', { class: 'font-mono text-xs' }, row.original.folioFiscal)
    },
    {
        accessorKey: 'emisor',
        header: 'Emisor'
    },
    {
        accessorKey: 'receptor',
        header: 'Receptor'
    },
    {
        accessorKey: 'fecha',
        header: 'Fecha',
        cell: ({ row }) => new Date(row.original.fecha).toLocaleDateString('es-MX')
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => h('span', { class: 'font-semibold' }, 
            `$${row.original.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
        )
    },
    {
        accessorKey: 'estatus',
        header: 'Estatus',
        cell: ({ row }) => {
            const estatus = row.original.estatus
            return h('span', {
                class: estatus === 'vigente' ? 'badge badge-success' : 'badge badge-error'
            }, estatus === 'vigente' ? 'Vigente' : 'Cancelada')
        }
    },
    {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => {
            return h('div', { class: 'flex gap-1' }, [
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    title: 'Descargar PDF',
                    onClick: () => handleDescargarPDF(row.original.folioFiscal)
                }, h('span', { class: 'material-symbols-outlined text-sm' }, 'picture_as_pdf')),
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    title: 'Descargar XML',
                    onClick: () => handleDescargarXML(row.original.folioFiscal)
                }, h('span', { class: 'material-symbols-outlined text-sm' }, 'download')),
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    title: 'Enviar por Correo',
                    onClick: () => handleEnviarCorreo(row.original.folioFiscal)
                }, h('span', { class: 'material-symbols-outlined text-sm' }, 'mail')),
                ...(row.original.tipo === 'emitida' && row.original.estatus === 'vigente' ? [
                    h('button', {
                        class: 'btn btn-ghost btn-sm btn-square text-error',
                        title: 'Cancelar CFDI',
                        onClick: () => handleCancelar(row.original.id)
                    }, h('span', { class: 'material-symbols-outlined text-sm' }, 'cancel'))
                ] : [])
            ])
        }
    }
]

const fetchData = async (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedData = facturasFiltradas.value.slice(start, end)
    
    return {
        items: paginatedData,
        total: facturasFiltradas.value.length
    }
}

const loadFacturas = async () => {
    isLoading.value = true
    try {
        facturas.value = await getFacturas()
    } catch (error) {
        console.error('Error loading facturas:', error)
    } finally {
        isLoading.value = false
    }
}

const openConfigModal = () => {
    modalStore.open(facturaStore.modalConfigSATId, {
        type: 'CREATE',
        title: 'Configuración SAT'
    })
}

const handleSincronizar = async () => {
    isSyncing.value = true
    showNotification('Sincronizando con el SAT...', 'info')
    
    try {
        const result = await sincronizarSAT()
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            await loadFacturas()
        }
    } catch (error) {
        showNotification('Error al sincronizar con el SAT', 'error')
    } finally {
        isSyncing.value = false
    }
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
    const email = prompt('Ingresa el correo electrónico:')
    if (!email) return
    
    try {
        const result = await enviarPorCorreo(uuid, email)
        showNotification(result.message, result.status)
    } catch (error) {
        showNotification('Error al enviar correo', 'error')
    }
}

const handleCancelar = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas cancelar este CFDI?')) {
        return
    }
    
    try {
        const result = await cancelarCFDI(id)
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            await loadFacturas()
        }
    } catch (error) {
        showNotification('Error al cancelar CFDI', 'error')
    }
}

onMounted(() => {
    loadFacturas()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold">Matriz de Facturas</h2>
                <p class="text-gray-500 mt-1">
                    Control centralizado de todas tus facturas emitidas y recibidas
                </p>
            </div>
            <div class="flex gap-2">
                <button @click="openConfigModal" class="btn btn-outline">
                    <span class="material-symbols-outlined">settings</span>
                    Configurar SAT
                </button>
                <button @click="handleSincronizar" class="btn btn-primary" :disabled="isSyncing">
                    <span v-if="isSyncing" class="loading loading-spinner"></span>
                    <span v-else class="material-symbols-outlined">sync</span>
                    {{ isSyncing ? 'Sincronizando...' : 'Sincronizar con SAT' }}
                </button>
            </div>
        </div>

        <!-- Resumen -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Resumen</h3>
                <div class="grid grid-cols-4 gap-4 mt-4">
                    <div class="text-center">
                        <p class="text-3xl font-bold text-green-600">{{ resumen.emitidasVigentes }}</p>
                        <p class="text-sm text-gray-500">Emitidas Vigentes</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-blue-600">{{ resumen.recibidasVigentes }}</p>
                        <p class="text-sm text-gray-500">Recibidas Vigentes</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-primary">
                            ${{ resumen.totalEmitido.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                        </p>
                        <p class="text-sm text-gray-500">Total Emitido</p>
                    </div>
                    <div class="text-center">
                        <p class="text-3xl font-bold text-secondary">
                            ${{ resumen.totalRecibido.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                        </p>
                        <p class="text-sm text-gray-500">Total Recibido</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtros -->
        <FiltrosFacturas />

        <!-- Tabla de Facturas -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h3 class="card-title">Facturas ({{ facturasFiltradas.length }})</h3>
                        <p class="text-sm text-gray-500">
                            {{ facturaStore.filtros.tipo === 'todas' ? 'Todas las facturas' :
                               facturaStore.filtros.tipo === 'emitidas' ? 'Facturas emitidas' :
                               'Facturas recibidas' }}
                        </p>
                    </div>
                </div>

                <BaseTable
                    :headers="columns"
                    :fetchCallback="fetchData"
                />
            </div>
        </div>

        <ConfigSATModal />
    </div>
</template>

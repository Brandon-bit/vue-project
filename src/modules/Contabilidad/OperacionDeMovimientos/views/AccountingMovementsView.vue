<script setup lang="ts">
import { computed } from 'vue'
import useAccountingMovementsStore from '@/modules/Contabilidad/OperacionDeMovimientos/store/accountingMovementsStore'
import { useAccountingMovementsActions } from '@/modules/Contabilidad/OperacionDeMovimientos/composables/useAccountingMovementsActions'
import { showNotification } from '@/utils/toastNotifications'

const accountingMovementsStore = useAccountingMovementsStore()
const {
    searchMovements,
    getAccountAuxiliaries,
    exportToPDF,
    exportToExcel
} = useAccountingMovementsActions()

const costCenterOptions = [
    { id: 'admin', label: 'Administración' },
    { id: 'ventas', label: 'Ventas' },
    { id: 'produccion', label: 'Producción' }
]

const totalDebit = computed(() => accountingMovementsStore.totalDebit)
const totalCredit = computed(() => accountingMovementsStore.totalCredit)
const movementsCount = computed(() => accountingMovementsStore.movementsCount)

const handleSearch = async () => {
    try {
        const movements = await searchMovements(accountingMovementsStore.searchFilters)
        accountingMovementsStore.setMovements(movements)
        accountingMovementsStore.setShowResults(true)
        showNotification(`${movements.length} movimientos encontrados`, 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al buscar movimientos', 'error')
    }
}

const handleViewAuxiliaries = async () => {
    try {
        const account = accountingMovementsStore.searchFilters.account
        if (!account) {
            showNotification('Por favor ingrese una cuenta para ver auxiliares', 'warning')
            return
        }
        const movements = await getAccountAuxiliaries(account)
        accountingMovementsStore.setMovements(movements)
        accountingMovementsStore.setShowResults(true)
        showNotification(`Auxiliares de cuenta ${account}`, 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al obtener auxiliares', 'error')
    }
}

const handleExportPDF = async () => {
    try {
        await exportToPDF(accountingMovementsStore.movements)
        showNotification('Exportando a PDF...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al exportar a PDF', 'error')
    }
}

const handleExportExcel = async () => {
    try {
        await exportToExcel(accountingMovementsStore.movements)
        showNotification('Exportando a Excel...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al exportar a Excel', 'error')
    }
}

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-center mb-2">Movimientos Contables</h2>
            <p class="text-center text-gray-500">
                Consulta detallada de cada asiento contable y su impacto en los saldos
            </p>
        </div>

        <!-- Filtros de búsqueda -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Motor de Búsqueda y Filtrado</h3>
                <p class="text-sm text-gray-500 mb-4">
                    Localice movimientos específicos usando los filtros disponibles
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label class="font-semibold mb-2 block">Fecha inicio</label>
                        <input
                            type="date"
                            v-model="accountingMovementsStore.searchFilters.startDate"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Fecha fin</label>
                        <input
                            type="date"
                            v-model="accountingMovementsStore.searchFilters.endDate"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Cuenta contable</label>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-3 top-3 text-gray-400">
                                search
                            </span>
                            <input
                                type="text"
                                v-model="accountingMovementsStore.searchFilters.account"
                                placeholder="Buscar cuenta..."
                                class="input input-bordered w-full pl-10"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Folio de póliza</label>
                        <input
                            type="text"
                            v-model="accountingMovementsStore.searchFilters.policyFolio"
                            placeholder="Ej: D-001, I-045..."
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Centro de costo</label>
                        <select
                            v-model="accountingMovementsStore.searchFilters.costCenter"
                            class="select select-bordered w-full"
                        >
                            <option value="">Seleccionar...</option>
                            <option v-for="center in costCenterOptions" :key="center.id" :value="center.id">
                                {{ center.label }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Documento origen</label>
                        <input
                            type="text"
                            v-model="accountingMovementsStore.searchFilters.sourceDocument"
                            placeholder="Ej: FAC-1234..."
                            class="input input-bordered w-full"
                        />
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button @click="handleSearch" class="btn btn-primary">
                        <span class="material-symbols-outlined">search</span>
                        Buscar movimientos
                    </button>
                    <button @click="handleViewAuxiliaries" class="btn btn-outline">
                        <span class="material-symbols-outlined">trending_up</span>
                        Ver auxiliares por cuenta
                    </button>
                </div>
            </div>
        </div>

        <!-- Resultados -->
        <div v-if="accountingMovementsStore.showResults" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">Resultados de Búsqueda</h3>
                        <p class="text-sm text-gray-500">
                            {{ movementsCount }} movimientos encontrados
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="handleExportPDF" class="btn btn-outline btn-sm">
                            <span class="material-symbols-outlined">download</span>
                            Exportar PDF
                        </button>
                        <button @click="handleExportExcel" class="btn btn-outline btn-sm">
                            <span class="material-symbols-outlined">description</span>
                            Exportar Excel
                        </button>
                    </div>
                </div>

                <!-- Tabla de movimientos -->
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead class="bg-base-200">
                            <tr>
                                <th>Fecha</th>
                                <th>Póliza</th>
                                <th>Cuenta</th>
                                <th>Descripción</th>
                                <th class="text-right">Debe</th>
                                <th class="text-right">Haber</th>
                                <th class="text-right">Saldo</th>
                                <th>Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="accountingMovementsStore.movements.length === 0">
                                <td colspan="8" class="text-center py-8 text-gray-500">
                                    No se encontraron movimientos con los filtros aplicados
                                </td>
                            </tr>
                            <tr v-for="(movement, index) in accountingMovementsStore.movements" :key="index">
                                <td>
                                    {{ new Date(movement.date).toLocaleDateString('es-MX') }}
                                </td>
                                <td>
                                    <span class="badge badge-outline">{{ movement.policy }}</span>
                                </td>
                                <td class="font-medium">{{ movement.account }}</td>
                                <td>{{ movement.description }}</td>
                                <td class="text-right">
                                    <span v-if="movement.debit > 0">
                                        ${{ formatCurrency(movement.debit) }}
                                    </span>
                                    <span v-else class="text-gray-400">-</span>
                                </td>
                                <td class="text-right">
                                    <span v-if="movement.credit > 0">
                                        ${{ formatCurrency(movement.credit) }}
                                    </span>
                                    <span v-else class="text-gray-400">-</span>
                                </td>
                                <td class="text-right font-semibold">
                                    ${{ formatCurrency(movement.balance) }}
                                </td>
                                <td>
                                    <span v-if="movement.document" class="badge badge-secondary">
                                        {{ movement.document }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Totales -->
                <div class="mt-4 p-4 border rounded-lg bg-base-200">
                    <div class="flex justify-end gap-8">
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Debe</div>
                            <div class="text-lg font-bold">
                                ${{ formatCurrency(totalDebit) }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Haber</div>
                            <div class="text-lg font-bold">
                                ${{ formatCurrency(totalCredit) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

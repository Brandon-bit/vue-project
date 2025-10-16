<script setup lang="ts">
import { computed } from 'vue'
import useDepreciationStore from '@/modules/Contabilidad/Depreciacion/store/depreciationStore'
import { useDepreciationActions } from '@/modules/Contabilidad/Depreciacion/composables/useDepreciationActions'
import { showNotification } from '@/utils/toastNotifications'

const depreciationStore = useDepreciationStore()
const {
    calculateDepreciation,
    generateDepreciationPolicy,
    downloadAnnualDepreciationReport,
    downloadAccountingTaxReconciliationReport,
    downloadDepreciationHistoryReport
} = useDepreciationActions()

const monthOptions = [
    { id: '01', label: 'Enero' },
    { id: '02', label: 'Febrero' },
    { id: '03', label: 'Marzo' },
    { id: '04', label: 'Abril' },
    { id: '05', label: 'Mayo' },
    { id: '06', label: 'Junio' },
    { id: '07', label: 'Julio' },
    { id: '08', label: 'Agosto' },
    { id: '09', label: 'Septiembre' },
    { id: '10', label: 'Octubre' },
    { id: '11', label: 'Noviembre' },
    { id: '12', label: 'Diciembre' }
]

const yearOptions = [
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' }
]

const methodOptions = [
    { id: 'linea-recta', label: 'Línea Recta' },
    { id: 'saldos-decrecientes', label: 'Saldos Decrecientes' }
]

const totalMonthlyDepreciation = computed(() => depreciationStore.totalMonthlyDepreciation)
const totalAssets = computed(() => depreciationStore.totalAssets)
const periodLabel = computed(() => depreciationStore.periodLabel)

const handleCalculateDepreciation = async () => {
    try {
        const assets = await calculateDepreciation(
            depreciationStore.selectedMonth,
            depreciationStore.selectedYear,
            depreciationStore.depreciationMethod
        )
        depreciationStore.setDepreciableAssets(assets)
        depreciationStore.setCalculationPerformed(true)
        depreciationStore.setPolicyGenerated(false)
        showNotification('Cálculo de depreciación completado', 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al calcular la depreciación', 'error')
    }
}

const handleGeneratePolicy = async () => {
    try {
        const result = await generateDepreciationPolicy(
            depreciationStore.selectedMonth,
            depreciationStore.selectedYear,
            depreciationStore.depreciableAssets
        )
        depreciationStore.setPolicyGenerated(true, result.folio)
        showNotification(result.message, 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al generar la póliza', 'error')
    }
}

const handleDownloadAnnualReport = async () => {
    try {
        await downloadAnnualDepreciationReport(depreciationStore.selectedYear)
        showNotification('Descargando reporte anual de depreciación...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
    }
}

const handleDownloadReconciliationReport = async () => {
    try {
        await downloadAccountingTaxReconciliationReport(depreciationStore.selectedYear)
        showNotification('Descargando reporte de conciliación...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
    }
}

const handleDownloadHistoryReport = async () => {
    try {
        await downloadDepreciationHistoryReport()
        showNotification('Descargando historial de depreciaciones...', 'info')
    } catch (error) {
        console.error(error)
        showNotification('Error al descargar el reporte', 'error')
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
            <h2 class="text-center mb-2">Depreciación de Activos</h2>
            <p class="text-center text-gray-500">
                Cálculo automático de depreciación y generación de pólizas contables
            </p>
        </div>

        <!-- Motor de Cálculo -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Motor de Cálculo de Depreciación</h3>
                <p class="text-sm text-gray-500 mb-4">
                    Configure los parámetros para calcular la depreciación del periodo
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="font-semibold mb-2 block">Mes a depreciar</label>
                        <select
                            v-model="depreciationStore.selectedMonth"
                            class="select select-bordered w-full"
                        >
                            <option v-for="month in monthOptions" :key="month.id" :value="month.id">
                                {{ month.label }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Año</label>
                        <select
                            v-model="depreciationStore.selectedYear"
                            class="select select-bordered w-full"
                        >
                            <option v-for="year in yearOptions" :key="year.id" :value="year.id">
                                {{ year.label }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="font-semibold mb-2 block">Método de depreciación</label>
                        <select
                            v-model="depreciationStore.depreciationMethod"
                            class="select select-bordered w-full"
                        >
                            <option v-for="method in methodOptions" :key="method.id" :value="method.id">
                                {{ method.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button @click="handleCalculateDepreciation" class="btn btn-primary">
                        <span class="material-symbols-outlined">settings</span>
                        Calcular depreciación del periodo
                    </button>
                </div>
            </div>
        </div>

        <!-- Vista Previa del Cálculo -->
        <div v-if="depreciationStore.calculationPerformed" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">Vista Previa del Cálculo - {{ periodLabel }}</h3>
                        <p class="text-sm text-gray-500">
                            Revise los activos que serán depreciados y sus montos
                        </p>
                    </div>
                    <button
                        v-if="!depreciationStore.policyGenerated"
                        @click="handleGeneratePolicy"
                        class="btn btn-primary"
                    >
                        <span class="material-symbols-outlined">receipt</span>
                        Generar póliza automática
                    </button>
                </div>

                <!-- Alert de estado -->
                <div
                    v-if="!depreciationStore.policyGenerated"
                    class="alert alert-warning mb-4"
                >
                    <span class="material-symbols-outlined">warning</span>
                    <span>Cálculo completado - Revisar antes de generar póliza</span>
                </div>
                <div
                    v-else
                    class="alert alert-success mb-4"
                >
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>Póliza de depreciación {{ depreciationStore.generatedPolicyFolio }} generada exitosamente</span>
                </div>

                <!-- Tabla de activos depreciables -->
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead class="bg-base-200">
                            <tr>
                                <th>ID Activo</th>
                                <th>Descripción</th>
                                <th class="text-right">Valor Original</th>
                                <th class="text-right">Deprec. Acumulada</th>
                                <th class="text-center">Vida Útil</th>
                                <th class="text-center">Meses Deprec.</th>
                                <th class="text-right">Deprec. Mensual</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="asset in depreciationStore.depreciableAssets" :key="asset.id">
                                <td>
                                    <span class="badge badge-outline">{{ asset.id }}</span>
                                </td>
                                <td class="font-medium">{{ asset.description }}</td>
                                <td class="text-right">
                                    ${{ formatCurrency(asset.originalValue) }}
                                </td>
                                <td class="text-right">
                                    ${{ formatCurrency(asset.accumulatedDepreciation) }}
                                </td>
                                <td class="text-center">{{ asset.usefulLife }} meses</td>
                                <td class="text-center">{{ asset.depreciatedMonths }} meses</td>
                                <td class="text-right font-semibold">
                                    ${{ formatCurrency(asset.monthlyDepreciation) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Totales -->
                <div class="mt-4 p-4 border rounded-lg bg-base-200">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="text-sm text-gray-500">Total de activos a depreciar</div>
                            <div class="text-lg font-bold">{{ totalAssets }}</div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Depreciación total del mes</div>
                            <div class="text-2xl font-bold">
                                ${{ formatCurrency(totalMonthlyDepreciation) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detalle de la póliza generada -->
                <div v-if="depreciationStore.policyGenerated" class="card bg-base-100 border border-base-content/10 mt-6">
                    <div class="card-body">
                        <h4 class="card-title text-base">Detalle de Póliza Generada</h4>
                        <p class="text-sm text-gray-500 mb-4">
                            Asientos contables de la depreciación automática
                        </p>

                        <div class="overflow-x-auto">
                            <table class="table table-sm">
                                <thead class="bg-base-200">
                                    <tr>
                                        <th>Cuenta</th>
                                        <th>Descripción</th>
                                        <th class="text-right">Debe</th>
                                        <th class="text-right">Haber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="font-medium">5201-001 Depreciación</td>
                                        <td>Depreciación de activos fijos - {{ periodLabel }}</td>
                                        <td class="text-right">
                                            ${{ formatCurrency(totalMonthlyDepreciation) }}
                                        </td>
                                        <td class="text-right">-</td>
                                    </tr>
                                    <tr>
                                        <td class="font-medium">1201-002 Depreciación Acumulada</td>
                                        <td>Depreciación acumulada - {{ periodLabel }}</td>
                                        <td class="text-right">-</td>
                                        <td class="text-right">
                                            ${{ formatCurrency(totalMonthlyDepreciation) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="flex gap-3 mt-6">
                            <button class="btn btn-outline">
                                <span class="material-symbols-outlined">description</span>
                                Ver póliza completa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reportes -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Reportes de Depreciación</h3>
                <p class="text-sm text-gray-500 mb-4">
                    Genere reportes detallados para conciliación contable-fiscal
                </p>

                <div class="flex gap-3 flex-wrap">
                    <button @click="handleDownloadAnnualReport" class="btn btn-outline">
                        <span class="material-symbols-outlined">description</span>
                        Reporte anual de depreciación
                    </button>
                    <button @click="handleDownloadReconciliationReport" class="btn btn-outline">
                        <span class="material-symbols-outlined">description</span>
                        Conciliación contable-fiscal
                    </button>
                    <button @click="handleDownloadHistoryReport" class="btn btn-outline">
                        <span class="material-symbols-outlined">description</span>
                        Historial de depreciaciones
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

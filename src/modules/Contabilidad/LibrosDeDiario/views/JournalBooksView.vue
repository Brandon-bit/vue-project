<script setup lang="ts">
import { computed } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useJournalBooksStore from '@/modules/Contabilidad/LibrosDeDiario/store/journalBooksStore'
import { useJournalBooksActions } from '@/modules/Contabilidad/LibrosDeDiario/composables/useJournalBooksActions'
import useJournalBooks from '@/modules/Contabilidad/LibrosDeDiario/composables/useJournalBooks'
import { showNotification } from '@/utils/toastNotifications'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { journalBookFiltersSchema } from '@/modules/Contabilidad/LibrosDeDiario/validations/journalBooksValidation'

const journalBooksStore = useJournalBooksStore()
const { generateJournalBook, exportJournalBookPDF, exportJournalBookExcel, printJournalBook } = useJournalBooksActions()
const { getTypeBadgeVariant, getMonthName, formatCurrency, formatDate } = useJournalBooks()

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
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' }
]

const policyTypeOptions = [
    { id: 'todas', label: 'Todas' },
    { id: 'diario', label: 'Diario' },
    { id: 'ingreso', label: 'Ingresos' },
    { id: 'egreso', label: 'Egresos' }
]

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(journalBookFiltersSchema),
    initialValues: {
        month: journalBooksStore.filters.month,
        year: journalBooksStore.filters.year,
        policyType: journalBooksStore.filters.policyType
    }
})

const onGenerateBook = handleSubmit(async (formValues) => {
    journalBooksStore.setLoading(true)
    try {
        const result = await generateJournalBook({
            month: formValues.month,
            year: formValues.year,
            policyType: formValues.policyType || 'todas'
        })
        
        journalBooksStore.setFilters({
            month: formValues.month,
            year: formValues.year,
            policyType: formValues.policyType || 'todas'
        })
        journalBooksStore.setJournalEntries(result.entries)
        journalBooksStore.setBookGenerated(true)
        
        showNotification('Libro diario generado correctamente', 'success')
    } catch (error) {
        console.error(error)
        showNotification('Error al generar el libro diario', 'error')
    } finally {
        journalBooksStore.setLoading(false)
    }
})

const handleExportPDF = async () => {
    const result = await exportJournalBookPDF()
    showNotification(result.message, result.status)
}

const handleExportExcel = async () => {
    const result = await exportJournalBookExcel()
    showNotification(result.message, result.status)
}

const handlePrint = async () => {
    const result = await printJournalBook()
    showNotification(result.message, result.status)
}

const selectedMonthName = computed(() => {
    return getMonthName(journalBooksStore.filters.month)
})

const selectedYear = computed(() => {
    return journalBooksStore.filters.year
})
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="text-center mb-2 text-3xl font-bold">Libros de Diario</h2>
            <p class="text-center text-gray-500">
                Generación del libro diario oficial con respaldo normativo
            </p>
        </div>

        <!-- Parámetros de generación -->
        <div class="card bg-base-100 shadow-sm border border-base-content/5">
            <div class="card-body">
                <h3 class="card-title text-xl">Parámetros de Generación</h3>
                <p class="text-sm text-gray-500 mb-4">
                    Seleccione el periodo para generar el libro diario oficial
                </p>

                <form @submit.prevent="onGenerateBook">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <BaseFormSelect
                            name="month"
                            label="Mes"
                            :options="monthOptions"
                            :required="true"
                        />
                        <BaseFormSelect
                            name="year"
                            label="Año"
                            :options="yearOptions"
                            :required="true"
                        />
                        <BaseFormSelect
                            name="policyType"
                            label="Tipo de póliza (opcional)"
                            :options="policyTypeOptions"
                        />
                    </div>

                    <div class="flex gap-3 mt-6">
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-lg"
                            :disabled="journalBooksStore.loading"
                        >
                            <span v-if="journalBooksStore.loading" class="loading loading-spinner"></span>
                            <span v-else class="material-symbols-outlined">calendar_month</span>
                            Generar libro diario del periodo
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Vista previa del libro -->
        <div v-if="journalBooksStore.bookGenerated" class="card bg-base-100 shadow-sm border border-base-content/5">
            <div class="card-body">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-xl">
                            Libro Diario General - {{ selectedMonthName }} {{ selectedYear }}
                        </h3>
                        <p class="text-sm text-gray-500">
                            Vista previa del libro contable oficial
                        </p>
                    </div>
                    <div class="flex gap-2 mt-4 md:mt-0">
                        <button 
                            @click="handleExportPDF" 
                            class="btn btn-outline btn-sm"
                        >
                            <span class="material-symbols-outlined">download</span>
                            Exportar PDF
                        </button>
                        <button 
                            @click="handleExportExcel" 
                            class="btn btn-outline btn-sm"
                        >
                            <span class="material-symbols-outlined">description</span>
                            Exportar Excel
                        </button>
                        <button 
                            @click="handlePrint" 
                            class="btn btn-outline btn-sm"
                        >
                            <span class="material-symbols-outlined">print</span>
                            Imprimir
                        </button>
                    </div>
                </div>

                <!-- Success message -->
                <div class="alert alert-success mb-4">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span class="font-semibold">
                        Libro generado correctamente - Cumple con requisitos fiscales
                    </span>
                </div>

                <!-- Table -->
                <div class="rounded-box border border-base-content/5 bg-base-100 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="table">
                            <thead class="bg-base-300">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Folio</th>
                                    <th>Tipo</th>
                                    <th>Concepto</th>
                                    <th>Cuenta</th>
                                    <th class="text-right">Debe</th>
                                    <th class="text-right">Haber</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="(entry, index) in journalBooksStore.journalEntries" 
                                    :key="index"
                                    class="hover:bg-base-200"
                                >
                                    <td>{{ formatDate(entry.date) }}</td>
                                    <td>
                                        <span class="badge badge-outline">{{ entry.folio }}</span>
                                    </td>
                                    <td>
                                        <span class="badge" :class="getTypeBadgeVariant(entry.type)">
                                            {{ entry.type }}
                                        </span>
                                    </td>
                                    <td>{{ entry.concept }}</td>
                                    <td class="font-medium">{{ entry.account }}</td>
                                    <td class="text-right font-mono">
                                        {{ formatCurrency(entry.debit) }}
                                    </td>
                                    <td class="text-right font-mono">
                                        {{ formatCurrency(entry.credit) }}
                                    </td>
                                </tr>

                                <tr v-if="journalBooksStore.journalEntries.length === 0">
                                    <td colspan="7" class="text-center py-8">
                                        No se encontraron entradas para el periodo seleccionado
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Totales -->
                <div class="mt-4 p-4 border rounded-lg bg-base-200">
                    <div class="flex flex-col md:flex-row justify-end gap-8">
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Debe</div>
                            <div class="text-lg font-bold">
                                ${{ journalBooksStore.totalDebit.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Total Haber</div>
                            <div class="text-lg font-bold">
                                ${{ journalBooksStore.totalCredit.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Diferencia</div>
                            <div 
                                class="text-lg font-bold"
                                :class="journalBooksStore.difference === 0 ? 'text-success' : 'text-error'"
                            >
                                ${{ Math.abs(journalBooksStore.difference).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.02);
}
</style>

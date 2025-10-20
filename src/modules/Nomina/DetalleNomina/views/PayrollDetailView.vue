<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePayrollDetailActions } from '@/modules/Nomina/DetalleNomina/composables/usePayrollDetailActions'
import { usePayrollDetailColumns } from '@/modules/Nomina/DetalleNomina/composables/usePayrollDetailColumns'
import { PayrollPeriodSummary } from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'
import PayrollDetailModal from '@/modules/Nomina/DetalleNomina/components/PayrollDetailModal.vue'
import EmployeeConceptsModal from '@/modules/Nomina/DetalleNomina/components/EmployeeConceptsModal.vue'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const route = useRoute()
const payrollDetailStore = usePayrollDetailStore()
const modalStore = useModalStore()
const { getPayrollPeriodSummary } = usePayrollDetailActions()

const periodSummary = ref<PayrollPeriodSummary | null>(null)
const loading = ref(true)
const tableRef = ref()

const periodId = computed(() => Number(route.params.id))

const fetchData = async () => {
    loading.value = true
    try {
        payrollDetailStore.setCurrentPeriod(periodId.value)
        periodSummary.value = await getPayrollPeriodSummary(periodId.value)
        // Setear el estado del período en el store
        if (periodSummary.value) {
            payrollDetailStore.setPeriodStatus(periodSummary.value.status)
        }
    } catch (error) {
        console.error('Error fetching payroll details:', error)
    } finally {
        loading.value = false
    }
}

const getEmployeesForTable = async (page: number, pageSize: number) => {
    if (!periodSummary.value) return { items: [], total: 0 }

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedEmployees = periodSummary.value.employees.slice(startIndex, endIndex)

    return {
        items: paginatedEmployees,
        total: periodSummary.value.employees.length
    }
}

const handleRefresh = () => {
    fetchData()
    tableRef.value?.fetchData()
}

const openImportModal = () => {
    modalStore.open(payrollDetailStore.modalId, {
        type: 'IMPORT',
        title: 'Importar nómina'
    })
}

const openDispersionModal = () => {
    modalStore.open(payrollDetailStore.modalId, {
        type: 'DISPERSION',
        title: 'Dispersión bancaria',
        data: {
            periodId: periodSummary.value?.periodId,
            periodName: periodSummary.value?.periodName,
            employees: periodSummary.value?.employees || []
        }
    })
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="container mx-auto p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- Content -->
        <div v-else-if="periodSummary">
            <!-- Header -->
            <div class="mb-8">
                <div class="flex justify-between items-start">
                    <BaseTitle
                        :title="periodSummary.periodName"
                        :subtitle="periodSummary.startDate + ' al ' + periodSummary.endDate"
                    />
                    <div>
                        <span
                            :class="[
                                'badge badge-lg',
                                periodSummary.status === 'borrador' && 'badge-ghost',
                                periodSummary.status === 'calculada' && 'badge-info',
                                periodSummary.status === 'pagada' && 'badge-success',
                                periodSummary.status === 'cerrada' && 'badge-error'
                            ]"
                        >
                            <template v-if="periodSummary.status === 'borrador'">Borrador</template>
                            <template v-else-if="periodSummary.status === 'calculada'"
                                >Calculada</template
                            >
                            <template v-else-if="periodSummary.status === 'pagada'"
                                >Pagada</template
                            >
                            <template v-else-if="periodSummary.status === 'cerrada'"
                                >Cerrada</template
                            >
                        </span>
                    </div>
                </div>

                <!-- Alert for paid/closed status only -->
                <div
                    v-if="periodSummary.status === 'pagada' || periodSummary.status === 'cerrada'"
                    class="alert alert-warning mt-4"
                >
                    <span class="material-symbols-outlined">lock</span>
                    <span>
                        <strong
                            >Nómina
                            {{ periodSummary.status === 'pagada' ? 'pagada' : 'cerrada' }}:</strong
                        >
                        Esta nómina ya fue dispersada y no puede ser modificada.
                        {{
                            periodSummary.status === 'cerrada'
                                ? 'El período está cerrado definitivamente.'
                                : ''
                        }}
                    </span>
                </div>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <!-- Total Employees Card -->
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-primary/10">
                        <span class="material-symbols-outlined text-primary text-2xl">group</span>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Total Empleados</h3>
                        <div class="stat-value text-primary">
                            {{ periodSummary.totalEmployees }}
                        </div>
                        <p class="stat-description">Empleados en nómina</p>
                    </div>
                    <div class="stat-decoration bg-primary/5"></div>
                </div>

                <!-- Total Perceptions Card -->
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-success/10">
                        <span class="material-symbols-outlined text-success text-2xl"
                            >trending_up</span
                        >
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Total Percepciones</h3>
                        <div class="stat-value text-success">
                            ${{
                                periodSummary.totalPerceptions.toLocaleString('es-MX', {
                                    minimumFractionDigits: 2
                                })
                            }}
                        </div>
                        <p class="stat-description">Ingresos totales</p>
                    </div>
                    <div class="stat-decoration bg-success/5"></div>
                </div>

                <!-- Total Deductions Card -->
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-error/10">
                        <span class="material-symbols-outlined text-error text-2xl"
                            >trending_down</span
                        >
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Total Deducciones</h3>
                        <div class="stat-value text-error">
                            ${{
                                periodSummary.totalDeductions.toLocaleString('es-MX', {
                                    minimumFractionDigits: 2
                                })
                            }}
                        </div>
                        <p class="stat-description">Descuentos totales</p>
                    </div>
                    <div class="stat-decoration bg-error/5"></div>
                </div>

                <!-- Total Net Card -->
                <div class="stat-card group">
                    <div class="stat-icon-wrapper bg-info/10">
                        <span class="material-symbols-outlined text-info text-2xl">payments</span>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-label">Total Neto</h3>
                        <div class="stat-value text-info">
                            ${{
                                periodSummary.totalNet.toLocaleString('es-MX', {
                                    minimumFractionDigits: 2
                                })
                            }}
                        </div>
                        <p class="stat-description">A pagar</p>
                    </div>
                    <div class="stat-decoration bg-info/5"></div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="mb-6 flex gap-4">
                <!-- Import Button (only in draft/calculated) -->
                <button
                    v-if="payrollDetailStore.canEdit"
                    @click="openImportModal"
                    class="btn btn-primary"
                >
                    <span class="material-symbols-outlined">upload_file</span>
                    Importar Nómina
                </button>

                <!-- Dispersion Button (only when calculated) -->
                <button
                    v-if="periodSummary.status === 'calculada'"
                    @click="openDispersionModal"
                    class="btn btn-success"
                >
                    <span class="material-symbols-outlined">account_balance</span>
                    Dispersión Bancaria
                </button>
            </div>

            <!-- Employees Table -->
            <div v-if="periodSummary.employees.length > 0">
                <h2 class="text-2xl font-bold mb-4">Empleados en Nómina</h2>
                <BaseTable
                    ref="tableRef"
                    :fetchCallback="getEmployeesForTable"
                    :headers="usePayrollDetailColumns()"
                />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
                <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">group_off</span>
                <p class="text-gray-500 text-lg mb-4">No hay empleados asignados a este período</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-12">
            <p class="text-error text-lg">Error al cargar los datos del período</p>
        </div>

        <!-- Modales -->
        <EmployeeConceptsModal :onRefresh="handleRefresh" />
        <PayrollDetailModal :onRefresh="handleRefresh" />
    </div>
</template>

<style scoped>
.stat-card {
    position: relative;
    overflow: hidden;
    background: hsl(var(--b1));
    border-radius: 1rem;
    border: 1px solid hsl(var(--bc) / 0.1);
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease-in-out;
    padding: 1.5rem;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-color: hsl(var(--p) / 0.3);
}

.stat-icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon-wrapper {
    transform: scale(1.1);
}

.stat-content {
    position: relative;
    z-index: 10;
}

.stat-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--bc) / 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-value {
    transform: scale(1.05);
}

.stat-description {
    font-size: 0.75rem;
    color: hsl(var(--bc) / 0.5);
    font-weight: 500;
}

.stat-decoration {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    opacity: 0.2;
    transition: all 0.5s ease;
}

.stat-card:hover .stat-decoration {
    transform: scale(1.5);
    opacity: 0.3;
}

/* Gradiente sutil en el fondo */
.stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, hsl(var(--b2) / 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.stat-card:hover::before {
    opacity: 1;
}

/* Animación de entrada */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card {
    animation: slideInUp 0.5s ease-out;
}
</style>

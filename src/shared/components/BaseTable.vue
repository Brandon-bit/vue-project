<script setup lang="ts" generic="T">
import {
    useVueTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    FlexRender
} from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, computed, defineProps, watch, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
//import axiosApiInstance from '@/api/axiosApiInstance'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'

//type DataMapper<T> = (rawData: any) => T;

const props = defineProps<{
    //data: T[]
    headers: ColumnDef<T>[]
    fetchCallback?: (page: number, pageSize: number) => Promise<{ items: T[]; total: number }>
    //endpoint: string,
    //dataMapper: DataMapper<T>
}>()

// State
const data = ref<T[]>([])
const loading = ref(true)
const totalRows = ref(0)
const globalFilter = ref('')
const pageSize = ref(5)
const pageIndex = ref(1)

const table = useVueTable({
    data: data,
    columns: props.headers,
    state: {
        get globalFilter() {
            return globalFilter.value
        }
    },
    onGlobalFilterChange: (val) => {
        globalFilter.value = val ?? ''
    },
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageIndex: pageIndex.value,
            pageSize: pageSize.value
        }
    },
    manualPagination: true
})

const from = computed(() =>
    data.value.length > 0 ? (pageIndex.value - 1) * pageSize.value + 1 : 0
)
const to = computed(() => Math.min(pageIndex.value * pageSize.value, totalRows.value))

const fetchData = async () => {
    loading.value = true
    try {
        const { items, total } = await props.fetchCallback(pageIndex.value, pageSize.value)
        data.value = items
        totalRows.value = total
    } catch (error) {
        //TODO: Cambiar por toastify
        console.error('Error fetching data:', error)
    } finally {
        loading.value = false
    }
}

// Watchers to trigger data fetching
watch([pageIndex, pageSize, globalFilter], () => {
    fetchData()
})

onMounted(() => {
    fetchData()
})

const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.value)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data')
    XLSX.writeFile(wb, 'data.xlsx')
}

const exportToPDF = () => {
    // const doc = new jsPDF("p", "pt"); // horizontal
    const doc = new jsPDF({
        orientation: 'landscape',

        unit: 'mm'
    })

    const headers = props.headers.map((col) => {
        if (col.header != 'Acciones') {
            return col.header
        }
    })

    const tableData = data.value.map((row) => {
        return props.headers.map((col) => {
            const value = row[col.accessorKey]
            return value !== undefined && value !== null ? value.toString() : ''
        })
    })

    autoTable(doc, {
        head: [headers],
        body: tableData,
        styles: {
            fontSize: 10,
            cellPadding: 6,
            overflow: 'linebreak'
        },
        headStyles: {
            fillColor: [51, 102, 153],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        },
        margin: { top: 20 }
        // showHead: 'firstPage'
    })

    doc.save('data.pdf')
}

defineExpose({
    fetchData
})
</script>

<template>
    <!-- Table filters -->
    <div class="flex flex-col md:flex-row md:items-center gap-5 table-controls">
        <!-- Export button -->
        <div>
            <button
                class="btn btn-sm export-btn"
                popovertarget="popover-exportar"
                style="anchor-name: --anchor-exportar"
            >
                <span class="material-symbols-outlined"> file_save </span>
                Exportar
            </button>
            <ul
                class="dropdown menu w-52 rounded-box bg-base-100 table-dropdown"
                popover
                id="popover-exportar"
                style="position-anchor: --anchor-exportar"
            >
                <li @click="exportToPDF" class="dropdown-item">
                    <a>
                        <span class="material-symbols-outlined"> picture_as_pdf </span>
                        PDF
                    </a>
                </li>
                <li @click="exportToExcel" class="dropdown-item">
                    <a>
                        <span class="material-symbols-outlined"> rubric </span>
                        Excel
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-span-12 md:col-span-5 md:mb-0 justify-center w-full">
            <div class="flex items-center page-size-selector">
                Mostrar
                <select
                    class="select mx-2 w-full max-w-[70px] table-select"
                    @change="
                        (e) => {
                            pageIndex = 1
                            pageSize = Number((e.target as HTMLSelectElement).value)
                        }
                    "
                >
                    <option
                        v-for="(number, index) in [5, 10, 20, 100]"
                        :key="index"
                        :value="number"
                    >
                        {{ number }}
                    </option>
                </select>
                registros por página
            </div>
        </div>
        <div class="col-span-12 md:col-span-4 w-full">
            <div class="flex items-center lg:justify-end">
                <p class="mb-0 me-3">Buscar:</p>
                <input
                    v-model="globalFilter"
                    placeholder="Ingresar texto..."
                    class="input min-w-0 search-input"
                />
            </div>
        </div>
    </div>
    <!-- Table Body -->
    <BaseSkeletonTable v-if="loading" />
    <div v-else class="table-container">
        <div class="overflow-x-auto">
            <table class="table text-center data-table">
                <thead>
                    <tr
                        v-for="headerGroup in table.getHeaderGroups()"
                        :key="headerGroup.id"
                        class="table-header"
                    >
                        <th class="table-th">#</th>
                        <th
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            :colSpan="header.colSpan"
                            class="table-th font-bold !text-black"
                        >
                            <FlexRender
                                v-if="!header.isPlaceholder"
                                :render="header.column.columnDef.header"
                                :props="header.getContext()"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-if="data.length > 0"
                        v-for="(row, ix) in table.getRowModel().rows"
                        :key="row.id"
                        class="table-row"
                    >
                        <td class="table-td">{{ ix + 1 + (pageIndex - 1) * pageSize }}</td>
                        <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="table-td">
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </td>
                    </tr>
                    <tr v-else>
                        <td
                            :colspan="table.getAllColumns().length + 1"
                            class="text-center py-8 empty-state"
                        >
                            <span class="material-symbols-outlined text-4xl opacity-30 mb-2"
                                >inbox</span
                            >
                            <p class="text-base-content/60">Aún no hay registros disponibles</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Table pagination -->
    <div class="grid grid-cols-12 gap-3 items-center w-full table-pagination">
        <div class="col-span-12 md:col-span-5 flex items-center justify-center md:justify-start">
            <p class="pagination-info">
                Mostrando
                <strong>{{ from }}</strong>
                a <strong>{{ to }}</strong> de <strong>{{ totalRows }}</strong>
                registros
            </p>
        </div>
        <div
            class="col-span-12 md:col-span-7 flex flex-col md:flex-row items-center justify-center md:justify-end gap-3"
        >
            <div class="join pagination-group">
                <button
                    class="btn join-item pagination-btn"
                    @click="() => (pageIndex = 1)"
                    :disabled="pageIndex == 1 || loading"
                >
                    Inicio
                </button>
                <button
                    class="btn join-item pagination-btn"
                    @click="() => pageIndex--"
                    :disabled="pageIndex - 1 == 0 || loading"
                >
                    Anterior
                </button>
            </div>
            <p className="text-center md:text-left page-indicator">
                Página
                <strong class="page-number">
                    {{ pageIndex }} de
                    {{ Math.ceil(totalRows / pageSize) }}
                </strong>
            </p>
            <div class="join pagination-group">
                <button
                    class="btn join-item pagination-btn"
                    @click="() => pageIndex++"
                    :disabled="pageIndex == Math.ceil(totalRows / pageSize) || loading"
                >
                    Siguiente
                </button>
                <button
                    class="btn join-item pagination-btn"
                    @click="() => (pageIndex = Math.ceil(totalRows / pageSize))"
                    :disabled="pageIndex == Math.ceil(totalRows / pageSize) || loading"
                >
                    Final
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Animations */
.table-controls {
    animation: fadeIn 0.3s ease-in-out;
}
.table-pagination {
    animation: fadeIn 0.3s ease-in-out 0.2s both;
}
.table-container {
    animation: slideIn 0.3s ease-out;
}
.table-dropdown {
    animation: slideDown 0.2s ease-out;
}

/* Common Transitions & Styles */
.export-btn,
.table-select,
.search-input,
.pagination-btn {
    transition: all 0.3s ease-in-out;
}

.dropdown-item,
.dropdown-item a {
    transition: all 0.2s ease-in-out;
}

.export-btn,
.table-select,
.search-input {
    border-radius: 0.5rem;
    font-weight: 500;
}

/* Controls */
.export-btn {
    box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.export-btn:hover {
    transform: translateY(-0.0625rem);
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.export-btn:active {
    transform: scale(0.98);
}

.table-dropdown {
    box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-item:hover {
    background-color: oklch(var(--color-primary) / 0.1);
}

.dropdown-item:hover a {
    color: oklch(var(--color-primary));
    transform: translateX(0.25rem);
}

.table-select,
.search-input {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.05);
}

.table-select:focus,
.search-input:focus {
    box-shadow: 0 0 0 3px oklch(var(--color-primary) / 0.1);
    border-color: oklch(var(--color-primary));
}

.search-input:focus {
    transform: translateY(-0.0625rem);
}

/* Table */
.table-container {
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: oklch(var(--b1));
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    margin: 1.25rem 0;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
}

.data-table {
    width: 100%;
}

.table-header {
    background: linear-gradient(to bottom, oklch(var(--b3)), oklch(var(--b2)));
    border-bottom: 2px solid oklch(var(--color-primary) / 0.3);
}

.table-th {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: oklch(var(--bc));
    padding: 1.25rem 1rem;
    background: oklch(var(--b3));
    border-bottom: 2px solid oklch(var(--color-primary) / 0.3);
}

.table-row {
    transition: background-color 0.2s ease-in-out;
    border-bottom: 1px solid oklch(var(--bc) / 0.08);
}

.table-row:hover {
    background-color: oklch(var(--color-primary) / 0.06);
}

.table-td {
    padding: 0.875rem 1rem;
    vertical-align: middle;
    font-size: 0.9rem;
    color: oklch(var(--bc) / 0.85);
}

.empty-state {
    padding: 3rem 1rem !important;
}
.empty-state span {
    display: block;
}

/* Pagination */
.pagination-info,
.page-indicator {
    font-size: 0.875rem;
    color: oklch(var(--bc) / 0.7);
}

.pagination-info strong,
.page-number {
    color: oklch(var(--color-primary));
    font-weight: 600;
}

.page-number {
    font-size: 1rem;
}

.pagination-group {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.05);
    border-radius: 0.5rem;
}

.pagination-btn {
    font-weight: 500;
}

.pagination-btn:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}

.pagination-btn:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

.pagination-btn:not(:disabled):hover {
    transform: translateY(-0.03125rem);
    box-shadow: 0 3px 6px -1px rgb(0 0 0 / 0.08);
    background-color: oklch(var(--color-primary) / 0.08);
}

.pagination-btn:active {
    transform: scale(0.99);
}

.pagination-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Keyframes */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0.7;
        transform: translateY(-3px) scale(0.995);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-0.5rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .table-th,
    .table-td {
        padding: 0.75rem 0.5rem;
        font-size: 0.875rem;
    }
    .table-container {
        border-radius: 0.75rem;
    }
}
</style>

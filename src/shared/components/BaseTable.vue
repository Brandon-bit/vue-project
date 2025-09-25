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
    fetchCallback?: (page: number, pageSize: number) => Promise<{items: T[], total : number}>
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

const from = computed(() => data.value.length > 0 ? ((pageIndex.value - 1) * pageSize.value) + 1 : 0)
const to = computed(() => Math.min((pageIndex.value) * pageSize.value, totalRows.value))

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
    <div class="flex flex-col md:flex-row md:items-center gap-5">
        <!-- Export button -->
        <div>
            <button class="btn btn-sm" popovertarget="popover-exportar" style="anchor-name:--anchor-exportar">
                <span class="material-symbols-outlined">
                    file_save
                </span>
                Exportar
            </button>
            <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
            popover id="popover-exportar" style="position-anchor:--anchor-exportar">
                <li @click="exportToPDF">
                    <a>
                        <span class="material-symbols-outlined">
                            picture_as_pdf
                        </span>
                        PDF
                    </a>
                </li>
                <li @click="exportToExcel">
                    <a>
                        <span class="material-symbols-outlined">
                            rubric
                        </span>
                        Excel
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-span-12 md:col-span-5 md:mb-0 justify-center w-full">
            <div class="flex items-center">
                Mostrar
                <select
                    class="select mx-2 w-full max-w-[70px]"
                    @change="(e) => {
                        pageIndex = 1
                        pageSize = Number((e.target as HTMLSelectElement).value)
                    }"
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
                    class="input min-w-0"
                />
            </div>
        </div>
    </div>
    <!-- Table Body -->
    <BaseSkeletonTable v-if="loading"/>
    <div v-else class="rounded-box border border-base-content/5 bg-base-100 my-5 w-full max-w-[100vw] overflow-hidden">
        <div class="overflow-x-auto">
            <table class="table text-center">
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="bg-base-300">
                        <th>#</th>
                        <th
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                            :colSpan="header.colSpan"
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
                    <tr v-if="data.length > 0" v-for="(row, ix) in table.getRowModel().rows" :key="row.id" class="hover:bg-base-200">
                        <td>{{ ix + 1 + ((pageIndex - 1) * pageSize)}}</td>
                        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </td>
                    </tr>
                    <tr v-else>
                        <td :colspan="table.getAllColumns().length + 1" class="text-center py-4">
                        Aún no hay registros disponibles
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Table pagination -->
    <div class="grid grid-cols-12 gap-3 items-center w-full">
        <div class="col-span-12 md:col-span-5 flex items-center justify-center md:justify-start">
            <p>
                Mostrando
                {{ from }}
                a {{ to }} de {{ totalRows }}
                registros
            </p>
        </div>
        <div
            class="col-span-12 md:col-span-7 flex flex-col md:flex-row items-center justify-center md:justify-end gap-3"
        >
            <div class="join">
                <button
                    class="btn join-item"
                    @click="() => pageIndex = 1"
                    :disabled="pageIndex == 1 || loading"
                >
                    Inicio
                </button>
                <button
                    class="btn join-item"
                    @click="() => pageIndex--"
                    :disabled="pageIndex - 1 == 0 || loading"
                >
                    Anterior
                </button>
            </div>
            <p className="text-center md:text-left">
                Página
                <strong>
                    {{ pageIndex }} de
                    {{ Math.ceil(totalRows / pageSize) }}
                </strong>
            </p>
            <div class="join">
                <button
                    class="btn join-item"
                    @click="() => pageIndex++"
                    :disabled="pageIndex == Math.ceil(totalRows / pageSize) || loading"
                >
                    Siguiente
                </button>
                <button
                    class="btn join-item"
                    @click="() => pageIndex = Math.ceil(totalRows / pageSize)"
                    :disabled="pageIndex == Math.ceil(totalRows / pageSize) || loading"
                >
                    Final
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.main-table-button-export-pdf,
.main-table-button-export-xlsx {
    color: #ffffff;
    opacity: 0.8;
}

.main-table-button-export-pdf {
    background: #ff0000;
}

.main-table-button-export-xlsx {
    background: #217346;
}

.main-table-button-export-pdf:hover,
.main-table-button-export-xlsx:hover {
    opacity: 1;
}
</style>

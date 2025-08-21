<script setup lang="ts" generic="T">
import {
    useVueTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    FlexRender
} from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, computed, defineProps } from 'vue'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const props = defineProps<{
    data: T[]
    headers: ColumnDef<T>[]
}>()

const globalFilter = ref('')
const table = useVueTable({
    data: props.data,
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
            pageIndex: 0,
            pageSize: 5
        }
    }
})

const pageSize = computed(() => table.getState().pagination.pageSize)
const pageIndex = computed(() => table.getState().pagination.pageIndex)
const totalRows = computed(() => table.getFilteredRowModel().rows.length)

const from = computed(() => pageIndex.value * pageSize.value + 1)
const to = computed(() => Math.min((pageIndex.value + 1) * pageSize.value, totalRows.value))

const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(props.data)
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

    const tableData = props.data.map((row) => {
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
</script>

<template>
    <div class="grid grid-cols-12 gap-5 place-items-center lg:items-center lg:place-items-start">
        <div class="col-span-12 md:col-span-3 flex gap-4 w-full">
            <button
                class="btn btn-sm main-table-button-export-pdf"
                v-tooltip.top="'Exportar a PDF'"
                @click="exportToPDF"
            >
                PDF
            </button>
            <button
                class="btn btn-sm main-table-button-export-xlsx"
                v-tooltip.top="'Exportar a Excel'"
                @click="exportToExcel"
            >
                Excel
            </button>
        </div>
        <div class="col-span-12 md:col-span-5 md:mb-0 justify-center w-full">
            <div class="flex items-center">
                Mostrar
                <select
                    class="select mx-2 w-full max-w-[70px]"
                    @change="
                        (e) => table.setPageSize(Number((e.target as HTMLSelectElement).value))
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
                    class="input min-w-0"
                />
            </div>
        </div>
    </div>
    <div
        class="rounded-box border border-base-content/5 bg-base-100 my-8 w-full max-w-[100vw] overflow-hidden"
    >
        <div class="overflow-x-auto">
            <table class="table text-center">
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
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
                    <tr v-for="row in table.getRowModel().rows" :key="row.id">
                        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
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
                    @click="() => table.firstPage()"
                    :disabled="!table.getCanPreviousPage()"
                >
                    Inicio
                </button>
                <button
                    class="btn join-item"
                    @click="() => table.previousPage()"
                    :disabled="!table.getCanPreviousPage()"
                >
                    Anterior
                </button>
            </div>
            <p className="text-center md:text-left">
                Página
                <strong>
                    {{ table.getState().pagination.pageIndex + 1 }} de
                    {{ table.getPageCount() }}
                </strong>
            </p>
            <div class="join">
                <button
                    class="btn join-item"
                    @click="() => table.nextPage()"
                    :disabled="!table.getCanNextPage()"
                >
                    Siguiente
                </button>
                <button
                    class="btn join-item"
                    @click="() => table.lastPage()"
                    :disabled="!table.getCanNextPage()"
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

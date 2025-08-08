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
</script>

<template>
    <div class="grid grid-cols-12 place-items-center lg:items-center lg:place-items-start">
        <div class="col-span-12 md:col-span-6 mb-4 md:mb-0 lg:w-full">
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
        <div class="col-span-12 md:col-span-6 lg:ml-auto lg:mt-0">
            <div class="flex items-center">
                <p class="mb-0 me-3">Buscar:</p>
                <input
                    v-model="globalFilter"
                    placeholder="Ingresar texto..."
                    class="input min-w-0"
                />
            </div>
        </div>
    </div>
    <div class="rounded-box border border-base-content/5 bg-base-100 my-8">
        <table class="table">
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
    <div class="grid grid-cols-12 place-items-center lg:items-center lg:place-items-start">
        <div class="col-span-12 lg:col-span-6 mb-4 lg:mb-0">
            <p>
                Mostrando
                {{ from }}
                a {{ to }} de {{ totalRows }}
                registros
            </p>
        </div>
        <div
            class="col-span-12 lg:col-span-6 lg:ml-auto lg:mt-0 flex items-center justify-end mt-3"
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
            <p className="my-0 mx-3">
                Página
                <strong>
                    {{ table.getState().pagination.pageIndex + 1 }} de {{ table.getPageCount() }}
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

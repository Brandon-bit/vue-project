<script setup lang="ts">
import { computed } from 'vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import useFacturaStore from '@/modules/Facturacion/MatrizDeFacturas/store/facturaStore'

const facturaStore = useFacturaStore()

const tiposFactura = [
    { id: 'todas', label: 'Todas' },
    { id: 'emitidas', label: '⬆️ Emitidas' },
    { id: 'recibidas', label: '⬇️ Recibidas' }
]

const estatusOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'vigente', label: 'Vigente' },
    { id: 'cancelada', label: 'Cancelada' }
]

const filtros = computed(() => facturaStore.filtros)

const updateFiltro = (key: string, value: any) => {
    facturaStore.setFiltros({ [key]: value })
}
</script>

<template>
    <div class="card bg-base-100 border border-base-content/10">
        <div class="card-body">
            <h3 class="card-title text-lg">Filtros de Búsqueda</h3>
            
            <div class="grid grid-cols-4 gap-4">
                <BaseSelect
                    name="tipoFactura"
                    label="Tipo de Factura"
                    :options="tiposFactura"
                    :modelValue="filtros.tipo"
                    @update:modelValue="updateFiltro('tipo', $event)"
                />
                
                <BaseSelect
                    name="estatusSAT"
                    label="Estatus SAT"
                    :options="estatusOptions"
                    :modelValue="filtros.estatus"
                    @update:modelValue="updateFiltro('estatus', $event)"
                />
                
                <BaseInput
                    name="fechaDesde"
                    label="Fecha Desde"
                    type="date"
                    :modelValue="filtros.fechaDesde"
                    @update:modelValue="updateFiltro('fechaDesde', $event)"
                />
                
                <BaseInput
                    name="fechaHasta"
                    label="Fecha Hasta"
                    type="date"
                    :modelValue="filtros.fechaHasta"
                    @update:modelValue="updateFiltro('fechaHasta', $event)"
                />
            </div>
            
            <!-- <div class="flex gap-2 mt-4">
                <input
                    type="text"
                    placeholder="Buscar por RFC, Folio Fiscal (UUID) o Razón Social"
                    class="input input-bordered w-full"
                    :value="filtros.busqueda"
                    @input="updateFiltro('busqueda', ($event.target as HTMLInputElement).value)"
                />
                <button class="btn btn-square btn-outline">
                    <span class="material-symbols-outlined">search</span>
                </button>
            </div> -->
        </div>
    </div>
</template>

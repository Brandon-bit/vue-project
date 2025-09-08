<template>
    <h2>Imprimir código de Barras</h2>

    <div style="display: grid; grid-template-columns: 25% 25%; gap: 1rem; margin-bottom: 1rem; width: 100%;">
        <BaseSelect
            label="Tienda"
            name="store"
            v-model="store.selectedStore"
            :options="storeOptions"
            placeholder="Seleccione una tienda"
        />
        <BaseSelect
            label="Bodega"
            name="warehouse"
            v-model="store.selectedWarehouse"
            :options="warehouseOptions"
            placeholder="Seleccione una bodega"
        />
    </div>

    <p v-if="loading">Cargando...</p>
    <BaseTable v-else :data="store.filteredProducts" :headers="getProductsTableColumns()"/>
    
    <!-- Fila de configuración del código de barras -->
    <div class="flex items-center gap-6 my-6">
        <!-- Select de tamaño de papel -->
        <div class="form-control w-full max-w-xs">
            <label class="label">
                <span class="label-text">Tamaño de papel</span>
            </label>
            <select v-model="paperSize" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Seleccione tamaño</option>
                <option value="A4">A4</option>
                <option value="Letter">Carta</option>
                <option value="Legal">Legal</option>
                <option value="A5">A5</option>
            </select>
        </div>
        
        <!-- Toggle para nombre de tienda -->
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text mr-4">Mostrar nombre de tienda</span>
                <input v-model="showStoreName" type="checkbox" class="toggle toggle-primary" />
            </label>
        </div>
        
        <!-- Toggle para nombre de producto -->
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text mr-4">Mostrar nombre de producto</span>
                <input v-model="showProductName" type="checkbox" class="toggle toggle-primary" />
            </label>
        </div>
        
        <!-- Toggle para precio -->
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text mr-4">Mostrar precio</span>
                <input v-model="showPrice" type="checkbox" class="toggle toggle-primary" />
            </label>
        </div>
    </div>
    
    <!-- Fila de botones -->
    <div class="flex justify-end gap-4 my-6">
        <!-- Botón Generar -->
        <button class="btn btn-warning text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Generar código de barras
        </button>
        
        <!-- Botón Resetear -->
        <button class="btn btn-neutral text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Resetear código de barras
        </button>
        
        <!-- Botón Imprimir -->
        <button class="btn btn-error text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir código de barras
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import useImprimirCodigoDeBarrasStore from '../store/imprimirCodigoDeBarras.store'
import { getProductsService, getStoresService, getWarehousesService } from '../services/imprimirCodigoDeBarrasServices'
import { useImprimirCodigoDeBarras } from '../composables/useImprimirCodigoDeBarras'

const store = useImprimirCodigoDeBarrasStore()
const loading = ref(false)
const { getProductsTableColumns } = useImprimirCodigoDeBarras()

// Variables para configuración de código de barras
const paperSize = ref('')
const showStoreName = ref(false)
const showProductName = ref(false)
const showPrice = ref(false)

onMounted(async () => {
    loading.value = true
    const [products, stores, warehouses] = await Promise.all([
        getProductsService(),
        getStoresService(),
        getWarehousesService(),
    ])
    store.products = products
    store.stores = stores
    store.warehouses = warehouses
    loading.value = false
})

const storeOptions = computed(() => store.stores.map(s => ({ id: s.id, label: s.label })))
const warehouseOptions = computed(() => store.warehouses.map(w => ({ id: w.id, label: w.label })))

</script>
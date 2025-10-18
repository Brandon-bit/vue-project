<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import SupplierModal from '@/modules/Compras/Proveedores/components/SupplierModal.vue'
import useSupplierStore from '@/modules/Compras/Proveedores/store/supplierStore'
import { useSupplierActions } from '@/modules/Compras/Proveedores/composables/useSupplierActions'
import type { SupplierType, SupplierStatsType } from '@/modules/Compras/Proveedores/types/supplierTypes'

const supplierStore = useSupplierStore()
const modalStore = useModalStore()
const { getSuppliers, getSupplierStats } = useSupplierActions()

const suppliers = ref<SupplierType[]>([])
const stats = ref<SupplierStatsType>({
    totalProveedores: 0,
    proveedoresActivos: 0,
    categorias: 0,
    promedioCalificacion: 0
})
const isLoading = ref(false)
const searchTerm = ref('')
const selectedCategory = ref('todos')

const categorias = [
    { value: 'todos', label: 'Todas las categorías' },
    { value: 'materiales', label: 'Materiales' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'insumos', label: 'Insumos' },
    { value: 'otros', label: 'Otros' }
]

const filteredSuppliers = computed(() => {
    return suppliers.value.filter(supplier => {
        const matchesSearch = 
            supplier.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            supplier.rfc.toLowerCase().includes(searchTerm.value.toLowerCase())
        
        const matchesCategory = 
            selectedCategory.value === 'todos' || 
            supplier.categoria.toLowerCase() === selectedCategory.value.toLowerCase()
        
        return matchesSearch && matchesCategory
    })
})

const fetchData = async () => {
    isLoading.value = true
    try {
        const [suppliersData, statsData] = await Promise.all([
            getSuppliers(),
            getSupplierStats()
        ])
        suppliers.value = suppliersData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    supplierStore.reset()
    modalStore.open(supplierStore.modalId, {
        type: 'CREATE',
        title: 'Registrar Proveedor'
    })
}

const openDetailModal = (supplier: SupplierType) => {
    supplierStore.setSelectedSupplier(supplier)
    modalStore.open(supplierStore.modalId, {
        type: 'DETAIL',
        title: `Proveedor - ${supplier.nombre}`
    })
}

const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Proveedores" 
            subtitle="Gestiona tu red de proveedores y sus datos de contacto"
        />
        <div class="flex items-center justify-end">
            <BaseButton text="Registrar Proveedor" @click="openCreateModal" icon="add" />
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">business</span>
                        Total Proveedores
                    </h3>
                    <div class="text-2xl font-bold">{{ stats.totalProveedores }}</div>
                    <p class="text-xs text-gray-500">Registrados</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Activos
                    </h3>
                    <div class="text-2xl font-bold text-green-500">{{ stats.proveedoresActivos }}</div>
                    <p class="text-xs text-gray-500">En operación</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">category</span>
                        Categorías
                    </h3>
                    <div class="text-2xl font-bold text-blue-500">{{ stats.categorias }}</div>
                    <p class="text-xs text-gray-500">Diferentes</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">star</span>
                        Calificación Promedio
                    </h3>
                    <div class="text-2xl font-bold text-yellow-500">{{ stats.promedioCalificacion }}</div>
                    <p class="text-xs text-gray-500">De 5.0</p>
                </div>
            </div>
        </div>

        <!-- Búsqueda y Filtros -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex flex-col md:flex-row gap-4">
                    <!-- Buscador -->
                    <div class="flex-1 relative">
                        <span class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            search
                        </span>
                        <input
                            v-model="searchTerm"
                            type="text"
                            placeholder="Buscar por nombre o RFC..."
                            class="input input-bordered w-full pl-10"
                        />
                    </div>
                    
                    <!-- Filtro de Categoría -->
                    <select v-model="selectedCategory" class="select select-bordered w-full md:w-48">
                        <option v-for="cat in categorias" :key="cat.value" :value="cat.value">
                            {{ cat.label }}
                        </option>
                    </select>
                </div>

                <!-- Listado de Proveedores -->
                <div class="mt-6">
                    <div v-if="isLoading" class="space-y-3">
                        <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                            <div class="card-body">
                                <div class="h-20 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="filteredSuppliers.length === 0" class="text-center py-12">
                        <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">business</span>
                        <p class="text-gray-500">No se encontraron proveedores</p>
                    </div>

                    <div v-else class="space-y-3">
                        <div
                            v-for="supplier in filteredSuppliers"
                            :key="supplier.id"
                            @click="openDetailModal(supplier)"
                            class="card bg-base-100 border border-base-content/10 hover:shadow-md transition-all cursor-pointer"
                        >
                            <div class="card-body p-4">
                                <div class="flex items-center justify-between">
                                    <!-- Info del Proveedor -->
                                    <div class="flex items-center gap-4 flex-1">
                                        <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span class="material-symbols-outlined text-2xl text-primary">business</span>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <h3 class="font-semibold">{{ supplier.nombre }}</h3>
                                                <span class="badge badge-outline">{{ supplier.categoria }}</span>
                                                <span :class="['badge', supplier.estatus === 'Activo' ? 'badge-success' : 'badge-error']">
                                                    {{ supplier.estatus }}
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-500">RFC: {{ supplier.rfc }}</p>
                                        </div>
                                    </div>

                                    <!-- Estadísticas -->
                                    <div class="flex items-center gap-6 text-center">
                                        <div>
                                            <div class="flex items-center gap-1 text-yellow-500 mb-1">
                                                <span class="material-symbols-outlined text-sm">star</span>
                                                <span class="font-semibold">{{ supplier.puntuacion }}</span>
                                            </div>
                                            <p class="text-xs text-gray-500">Puntuación</p>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{{ supplier.ordenes }}</p>
                                            <p class="text-xs text-gray-500">Órdenes</p>
                                        </div>
                                        <div>
                                            <p class="font-semibold">{{ formatCurrency(supplier.montoTotal) }}</p>
                                            <p class="text-xs text-gray-500">Total Comprado</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <SupplierModal :onRefresh="fetchData" />
    </div>
</template>

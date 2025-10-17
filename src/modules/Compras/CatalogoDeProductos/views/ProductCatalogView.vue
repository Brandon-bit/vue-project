<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ProductCatalogModal from '@/modules/Compras/CatalogoDeProductos/components/ProductCatalogModal.vue'
import useProductCatalogStore from '@/modules/Compras/CatalogoDeProductos/store/productCatalogStore'
import { useProductCatalogActions } from '@/modules/Compras/CatalogoDeProductos/composables/useProductCatalogActions'
import type { ProductType, CatalogStatsType } from '@/modules/Compras/CatalogoDeProductos/types/productCatalogTypes'

const productCatalogStore = useProductCatalogStore()
const modalStore = useModalStore()
const { getProducts, getCatalogStats } = useProductCatalogActions()

const products = ref<ProductType[]>([])
const stats = ref<CatalogStatsType>({
    totalItems: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    estimatedValue: 0
})
const isLoading = ref(false)

const categoryOptions = [
    { value: 'todos', label: 'Todas las categorías' },
    { value: 'Papelería', label: 'Papelería' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Servicios', label: 'Servicios' },
    { value: 'Materiales', label: 'Materiales' }
]

const filteredProducts = computed(() => {
    let filtered = products.value

    // Filtrar por búsqueda
    if (productCatalogStore.searchTerm) {
        const searchLower = productCatalogStore.searchTerm.toLowerCase()
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.code.toLowerCase().includes(searchLower)
        )
    }

    // Filtrar por categoría
    if (productCatalogStore.selectedCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === productCatalogStore.selectedCategory)
    }

    return filtered
})

const fetchData = async () => {
    isLoading.value = true
    try {
        const [productsData, statsData] = await Promise.all([
            getProducts(),
            getCatalogStats()
        ])
        products.value = productsData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    productCatalogStore.setData()
    modalStore.open(productCatalogStore.modalId, { type: 'CREATE', title: 'Agregar al Catálogo' })
}

const openEditModal = (product: ProductType) => {
    productCatalogStore.setData(product)
    modalStore.open(productCatalogStore.modalId, { type: 'EDIT', title: 'Editar Producto' })
}

const openDeleteModal = (product: ProductType) => {
    productCatalogStore.setData(product)
    modalStore.open(productCatalogStore.modalId, { type: 'DELETE', title: 'Eliminar Producto' })
}

const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(2)}`
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold">Catálogo de Productos y Servicios</h2>
                <p class="text-gray-500 mt-1">
                    Catálogo central estandarizado
                </p>
            </div>
            <BaseButton text="Agregar al Catálogo" @click="openCreateModal" icon="add" />
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center">
                    <div class="text-3xl font-bold text-primary mb-1">{{ stats.totalItems }}</div>
                    <p class="text-sm text-gray-500">Total de ítems</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center">
                    <div class="text-3xl font-bold text-blue-500 mb-1">{{ stats.totalCategories }}</div>
                    <p class="text-sm text-gray-500">Categorías</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center">
                    <div class="text-3xl font-bold text-green-500 mb-1">{{ stats.totalSuppliers }}</div>
                    <p class="text-sm text-gray-500">Proveedores asignados</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center">
                    <div class="text-3xl font-bold text-orange-500 mb-1">
                        {{ formatCurrency(stats.estimatedValue) }}
                    </div>
                    <p class="text-sm text-gray-500">Valor estimado</p>
                </div>
            </div>
        </div>

        <!-- Búsqueda y Filtros -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center gap-4">
                    <div class="relative flex-1">
                        <span class="material-symbols-outlined absolute left-3 top-3 text-gray-400">
                            search
                        </span>
                        <input
                            type="text"
                            v-model="productCatalogStore.searchTerm"
                            placeholder="Buscar por código o nombre..."
                            class="input input-bordered w-full pl-10"
                        />
                    </div>
                    <select
                        v-model="productCatalogStore.selectedCategory"
                        class="select select-bordered w-[200px]"
                    >
                        <option v-for="cat in categoryOptions" :key="cat.value" :value="cat.value">
                            {{ cat.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Grid de Productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                v-if="isLoading"
                v-for="n in 6"
                :key="n"
                class="card bg-base-100 border border-base-content/10 animate-pulse"
            >
                <div class="card-body">
                    <div class="h-12 w-12 bg-gray-300 rounded-lg mb-4"></div>
                    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>

            <div
                v-else-if="filteredProducts.length === 0"
                class="col-span-full text-center py-12"
            >
                <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">
                    inventory_2
                </span>
                <p class="text-gray-500">No se encontraron productos</p>
            </div>

            <div
                v-else
                v-for="product in filteredProducts"
                :key="product.id"
                class="card bg-base-100 border border-base-content/10 hover:shadow-lg transition-shadow"
            >
                <div class="card-body">
                    <!-- Header con ícono y badge -->
                    <div class="flex justify-between items-start mb-3">
                        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary">
                                inventory_2
                            </span>
                        </div>
                        <span class="badge badge-outline">{{ product.category }}</span>
                    </div>

                    <!-- Información del producto -->
                    <div class="space-y-3">
                        <div>
                            <p class="text-xs text-gray-500 mb-1">Código: {{ product.code }}</p>
                            <h3 class="font-semibold line-clamp-2">{{ product.name }}</h3>
                        </div>

                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-500">Unidad:</span>
                            <span class="font-medium">{{ product.unit }}</span>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500">Costo estimado:</span>
                            <span class="text-lg font-bold text-primary">
                                ${{ product.estimatedCost.toFixed(2) }}
                            </span>
                        </div>

                        <div class="pt-2 border-t">
                            <p class="text-xs text-gray-500 mb-1">Proveedor preferente:</p>
                            <p class="text-sm font-medium">{{ product.preferredSupplier }}</p>
                        </div>

                        <!-- Botones de acción -->
                        <div class="flex gap-2 pt-2">
                            <button
                                @click="openEditModal(product)"
                                class="btn btn-outline btn-sm flex-1"
                            >
                                <span class="material-symbols-outlined text-sm">edit</span>
                                Editar
                            </button>
                            <button
                                @click="openDeleteModal(product)"
                                class="btn btn-outline btn-sm text-error hover:bg-error hover:text-white"
                            >
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ProductCatalogModal :onRefresh="fetchData" />
    </div>
</template>

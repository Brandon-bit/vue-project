<script setup lang="ts">
import { ref, watch } from 'vue'
import createDiscountStore from '@inventario/ConfiguracionDeInventario/CrearDescuento/store/createDiscountStore'

const results = ref([])
const loading = ref(false)
const noResults = ref(false)
const currentPage = ref(1)
const query = ref('')
// const productsToAddDiscount = ref({})
const timeout = ref<NodeJS.Timeout | null>(null)
const discountStore = createDiscountStore()
const searchProducts = async (query: string, page: number) => {
    if (!query) {
        results.value = []
        return
    }

    loading.value = true

    try {
        const limit = 20
        const skip = (page - 1) * limit

        const response = await fetch(
            `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
        )
        const data = await response.json()
        if (data.products.length === 0) {
            setTimeout(() => {
                noResults.value = true
            }, 2000)
            noResults.value = false
        } else {
            results.value = [...results.value, ...data.products]
        }
    } catch (error) {
        console.error('Error al buscar productos:', error)
    } finally {
        loading.value = false
    }
}

const onScroll = async (event: Event) => {
    const scrollable = event.target as HTMLElement
    const bottom = scrollable.scrollHeight === scrollable.scrollTop + scrollable.clientHeight

    if (bottom && !loading.value) {
        currentPage.value++
        searchProducts(query.value, currentPage.value)
    }
}

watch(query, (newQuery: string) => {
    if (timeout.value) clearTimeout(timeout.value)

    timeout.value = setTimeout(() => {
        currentPage.value = 1
        results.value = []
        noResults.value = false
        searchProducts(newQuery, currentPage.value)
    }, 300)
})

const addProduct = (product: any) => {
    const { id, title } = product
    discountStore.addProduct(id, title)
}
</script>

<template>
    <input class="input mt-2 w-full" v-model="query" placeholder="Buscar productos..." />
    <span class="material-symbols-outlined absolute top-4 right-2 z-10"> search </span>
    <ul
        v-if="results.length"
        @scroll="onScroll"
        class="mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-2 pb-2 pt-4"
    >
        <li
            v-for="product in results"
            :key="product.id"
            @click="() => addProduct(product)"
            class="p-1 hover:bg-gray-100"
        >
            {{ product.title }}
        </li>
    </ul>
    <div v-show="loading" class="text-center py-2 text-gray-600">Cargando mas resultados...</div>
    <div v-show="noResults" class="text-center py-2 text-gray-600">
        No se encontraron más resultados.
    </div>
</template>

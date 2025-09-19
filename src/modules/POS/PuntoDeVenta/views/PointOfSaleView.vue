<script setup lang="ts">
import { onMounted } from 'vue'
import { usePos } from '@/modules/POS/PuntoDeVenta/composables/usePos'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'
import SearchBar from '@pos/PuntoDeVenta/components/SearchBar.vue'
import ProductCard from '@pos/PuntoDeVenta/components/ProductCard.vue'
import CategoryCard from '@pos/PuntoDeVenta/components/CategoryCard.vue'
import SelectedProductsTable from '@pos/PuntoDeVenta/components/SelectedProductsTable.vue'
import ClienteTypeSelect from '@pos/PuntoDeVenta/components/PriceTypeSelect.vue'
import ConfirmPosButton from '@pos/PuntoDeVenta/components/ConfirmPosButton.vue'
import PosModal from '@pos/PuntoDeVenta/components/PosModal.vue'

const { getCategories, getProducts } = usePos()
const posStore = usePosStore()

const handleSelect = (slug: string | null) => {
    posStore.setPageNumber(1)
    posStore.setIsAvailablesGetProducts(true)
    posStore.setSelectedCategory(slug)
    posStore.resetProducts()
    posStore.setSearchWord('')
    getProducts()
}

onMounted(async () => {
    await getCategories()
    await getProducts()
})

const onScroll = async (event: Event) => {
    if (posStore.isSearching || posStore.isLoading) return

    const scrollable = event.target as HTMLElement
    if (scrollable.scrollHeight <= scrollable.clientHeight) return

    const bottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1
    if (bottom && posStore.isAvailablesGetProducts) {
        posStore.setPageNumber(posStore.pageNumber + 1)
        await getProducts()
    }
}
</script>
<template>
    <div
        class="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-1 gap-4 min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)]"
    >
        <!-- PRINCIPAL CONTAINER -->
        <div class="h-[calc(100vh-20vh)] lg:h-full lg:col-span-8 bg-gray-100 rounded-2xl p-4">
            <div class="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-1 min-h-0 h-full">
                <div
                    class="flex gap-4 overflow-x-auto overflow-y-hidden p-1 h-32 flex-shrink-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:col-span-3 xl:col-span-2 lg:h-auto"
                >
                    <CategoryCard
                        v-for="category in posStore.categories"
                        :key="category.id"
                        :category="category"
                        :onSelect="handleSelect"
                    />
                </div>
                <div class="lg:h-full lg:col-span-9 xl:col-span-10 flex flex-col min-h-0">
                    <div class="grid grid-cols-12 my-5 mx-3">
                        <div class="col-span-12 lg:col-span-8 m-2">
                            <SearchBar />
                        </div>
                        <div class="col-span-12 lg:col-span-4 m-2">
                            <ClienteTypeSelect />
                        </div>
                    </div>
                    <div
                        @scroll="onScroll"
                        class="overflow-y-auto rounded-xl p-2 h-[calc(100vh-8rem)]"
                    >
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                            <ProductCard
                                v-for="product in posStore.products"
                                :key="product.id"
                                :product="product"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ORDER CONTAINER -->
        <div
            class="relative h-[50vh] lg:h-full lg:col-span-4 bg-gray-100 rounded-2xl p-4 flex flex-col"
        >
            <p class="!text-xl !font-semibold text-center mb-4">Orden de compra</p>
            <div class="flex-1 overflow-y-auto pr-2">
                <SelectedProductsTable />
            </div>
            <div class="pt-4 bg-gray-100">
                <ConfirmPosButton />
            </div>
        </div>
    </div>
    <PosModal />
</template>

<style scoped>
.icon-buy-order {
    font-size: 20px;
}
</style>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useField } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import { useInventoryEntriesActions } from '@inventario/Operacion/EntradasDeInventario/composables/useInventoryEntriesActions'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

const modalStore = useModalStore()
const inventoryEntriesStore = useInventoryEntriesStore()
const { getProductsBySearch } = useInventoryEntriesActions()
const timeout = ref<NodeJS.Timeout | null>(null)
const currentPage = ref(1)
const results = ref<unknown[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

const { value: productValue } = useField<string>('productName')
const { value: productIdValue } = useField<number | null>('productId')
const { value: priceValue } = useField<number>('unitPrice')
const { value: subtotalValue } = useField<number>('subtotal')
const { value: quantityValue } = useField<number>('quantity')

const mode = computed(() => modalStore.modals[inventoryEntriesStore.modalId]?.type)
const isEditing = computed(() => mode.value === 'UPDATE')

watch([priceValue, quantityValue], () => {
    if (priceValue.value && quantityValue.value) {
        subtotalValue.value = Math.ceil(priceValue.value * quantityValue.value * 100) / 100
    }
})

const searchProducts = async (page: number, limit: number = 10) => {
    if (!currentQuery.value) {
        results.value = []
        noResults.value = false
        return
    }

    loading.value = true
    noResults.value = false

    const result = await getProductsBySearch(currentQuery.value, limit, page)
    const products = result.products

    if (page === 1) {
        results.value = products
    } else {
        results.value = [...results.value, ...products]
    }

    if (results.value.length === 0) {
        noResults.value = true
        productIdValue.value = null
    }

    loading.value = false
}

watch(productValue, (query) => {
    if (timeout.value) clearTimeout(timeout.value)
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    if (isEditing.value) return

    currentQuery.value = query
    timeout.value = setTimeout(async () => {
        currentPage.value = 1
        results.value = []
        noResults.value = false

        if (productIdValue.value) {
            productIdValue.value = null
            priceValue.value = 0
            subtotalValue.value = 0
            quantityValue.value = 0
        }

        if (query.trim()) {
            await searchProducts(currentPage.value)
        } else {
            results.value = []
            noResults.value = false
            productIdValue.value = null
        }
    }, 300)
})

const selectProduct = (id: number, product: string, price: number) => {
    if (id) {
        suppressSearch.value = true
        productIdValue.value = id
        productValue.value = product
        priceValue.value = price
        currentPage.value = 1
        results.value = []
        noResults.value = false
    }
}

const onScroll = async (event: Event) => {
    const target = event.target as HTMLElement
    const bottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 5
    if (bottom && !loading.value && currentQuery.value) {
        currentPage.value++
        await searchProducts(currentPage.value)
    }
}
</script>
<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="relative col-span-12">
            <BaseFormInput
                name="productName"
                type="text"
                label="Producto"
                inputClass="ps-10"
                :required="true"
                :readonly="isEditing"
            />
            <span class="material-symbols-outlined absolute top-10 text-gray-500 left-2 z-10">
                search
            </span>
            <ul
                v-if="results.length"
                @scroll="onScroll"
                class="mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-2 pb-2 pt-4"
            >
                <li
                    v-for="product in results"
                    :key="product.id"
                    @click="selectProduct(product.id, product.title, product.price)"
                    class="p-1 hover:bg-gray-100"
                >
                    {{ product.title }}
                </li>
            </ul>
            <div
                v-else-if="noResults && !loading"
                class="mx-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-4 py-2 text-gray-500"
            >
                No hay coincidencias
            </div>
        </div>
        <BaseFormInput
            name="quantity"
            label="Cantidad"
            type="number"
            :required="true"
            class="col-span-6"
        />
        <BaseFormInput
            name="unitPrice"
            label="Precio unitario"
            type="number"
            :allowDecimal="true"
            :required="true"
            class="col-span-6"
        />
        <BaseFormInput
            name="subtotal"
            label="subtotal"
            type="number"
            :readonly="true"
            :allowDecimal="true"
            :required="true"
            class="col-span-6"
        />
        <BaseFormInput
            name="expirationDate"
            label="Fecha de expiracion"
            type="date"
            class="col-span-6"
        />
        <BaseFormInput name="batch" label="Lote" class="col-span-12" />
    </div>
</template>

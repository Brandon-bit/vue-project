<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useModalStore } from '@/shared/stores/modal.store'

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()
const { getAuditors, getProductsBySearch } = useInventoryAuditActions()
const timeout = ref<NodeJS.Timeout | null>(null)
const currentPage = ref(1)
const results = ref([])
const loading = ref(false)
const noResults = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)

interface SelectOptionsType {
    id: number
    label: string
}

const auditors = ref<SelectOptionsType[]>([])
onMounted(async () => {
    if (!auditors.value.length) {
        const data = await getAuditors()
        auditors.value = data.map(({ id, name }) => {
            return { id, label: name }
        })
    }
})

const { value } = useField('product')

const searchProducts = async (page: number, limit: number = 10) => {
    if (!currentQuery.value) {
        results.value = []
        return
    }

    loading.value = true

    const result = await getProductsBySearch(currentQuery.value, limit, page)
    const products = result.products
    if (products.length === 0) {
        setTimeout(() => {
            noResults.value = true
        }, 2000)
        noResults.value = false
    } else {
        results.value = [...results.value, ...products]
    }
    loading.value = false
}

watch(value, (query) => {
    if (timeout.value) clearTimeout(timeout.value)
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    currentQuery.value = query
    timeout.value = setTimeout(async () => {
        currentPage.value = 1
        results.value = []
        noResults.value = false
        searchProducts(currentPage.value)
    }, 300)
})

const onScroll = async (event: Event) => {
    const scrollable = event.target as HTMLElement
    const bottom = scrollable.scrollHeight === scrollable.scrollTop + scrollable.clientHeight

    if (bottom && !loading.value) {
        currentPage.value++
        searchProducts(currentPage.value)
    }
}

const selectProduct = (id: number, product: string) => {
    suppressSearch.value = true
    inventoryAuditStore.setCurrentProduct(id, product)
    value.value = product
    currentPage.value = 1
    results.value = []
    noResults.value = false
}
</script>

<template>
    <BaseFormInput name="date" type="date" label="Fecha" :required="true" />
    <BaseFormSelect label="Auditor" name="auditorId" :options="auditors" />
    <div class="relative">
        <BaseFormInput
            name="product"
            type="text"
            label="Producto"
            inputClass="ps-10"
            :required="true"
            :readonly="modalStore.modals[inventoryAuditStore.modalId]?.type === 'UPDATE'"
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
                @click="selectProduct(product.id, product.title)"
                class="p-1 hover:bg-gray-100"
            >
                {{ product.title }}
            </li>
        </ul>
    </div>
    <BaseFormInput name="count" type="number" label="Conteo" :required="true" />
    <BaseFormInput name="difference" type="number" label="Diferencia" :required="true" />
    <BaseTextArea name="note" type="text" label="Nota" :required="true" />
</template>

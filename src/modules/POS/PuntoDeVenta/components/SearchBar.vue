<script setup lang="ts">
import { ref, watch } from 'vue'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'
import { usePos } from '@pos/PuntoDeVenta/composables/usePos'

const { getProducts } = usePos()
const posStore = usePosStore()
const timeout = ref<NodeJS.Timeout | null>(null)

watch(
    () => posStore.searchWord,
    (newQuery) => {
        if (timeout.value) clearTimeout(timeout.value)

        timeout.value = setTimeout(async () => {
            posStore.isSearching = true

            posStore.setPageNumber(1)

            if (posStore.selectedCategory != null && newQuery !== '') {
                posStore.setSelectedCategory(null)
            }

            posStore.resetProducts()

            await getProducts()

            posStore.isSearching = false
        }, 300)
    }
)

const clearSearchWord = () => {
    posStore.setSearchWord('')
    posStore.setPageNumber(1)
}
</script>
<template>
    <div class="relative">
        <input
            class="input w-full ps-10"
            v-model="posStore.searchWord"
            placeholder="Buscar productos..."
        />
        <span class="material-symbols-outlined absolute top-2 text-gray-500 left-2 z-10">
            search
        </span>
        <span
            @click="clearSearchWord"
            v-show="posStore.searchWord != ''"
            class="material-symbols-outlined absolute cursor-pointer top-2 text-gray-500 right-2 z-10"
        >
            close
        </span>
    </div>
</template>

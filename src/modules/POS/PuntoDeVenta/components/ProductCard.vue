<script setup lang="ts">
import { ref } from 'vue'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'

const posStore = usePosStore()
const props = defineProps<{
    product: {}
}>()
const clicked = ref(false)

const addProduct = () => {
    clicked.value = true
    const { id, price, title } = props.product
    const product = { id, title, quantity: 1, basePrice: price, totalPrice: price }
    posStore.addProduct(product)

    setTimeout(() => {
        clicked.value = false
    }, 300)
}
</script>
<template>
    <div
        @click="addProduct"
        :class="[
            'bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden cursor-pointer',
            clicked ? 'ring-2 ring-blue-400' : ''
        ]"
    >
        <div class="h-32 bg-gray-100 flex items-center justify-center p-2">
            <img
                :src="props.product.thumbnail"
                alt=""
                loading="lazy"
                class="max-h-full max-w-full object-contain"
            />
        </div>
        <div class="p-3 flex flex-col justify-between gap-1">
            <p class="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                {{ props.product.title }}
            </p>
            <p class="text-base font-bold text-blue-600">$ {{ props.product.price }}</p>
        </div>
    </div>
</template>

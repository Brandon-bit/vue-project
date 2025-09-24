<script setup lang="ts">
import usePosStore from '@pos/PuntoDeVenta/store/posStore'

const props = defineProps<{
    category: {}
    onSelect: (slug: string | null) => void
}>()

const posStore = usePosStore()
const onSelectedCategory = () => {
    if (posStore.selectedCategory === props.category.slug) {
        props.onSelect(null)
    } else {
        props.onSelect(props.category.slug)
    }
}
</script>
<template>
    <div
        :class="[
            'bg-white w-30 h-25 flex-shrink-0 cursor-pointer border border-gray-200 rounded-xl grid grid-rows-6',
            posStore.selectedCategory === props.category.slug ? 'ring-2 ring-blue-400' : ''
        ]"
        @click="onSelectedCategory"
    >
        <div class="row-span-2 m-auto">
            <img
                class="w-10"
                src="https://img.freepik.com/foto-gratis/conjunto-herramientas-arquitecto_93675-132306.jpg"
                alt=""
            />
        </div>
        <div class="px-1 py-3 row-span-4 m-auto">
            <p class="semi-bold text-l text-center m-0">{{ props.category.name }}</p>
        </div>
    </div>
</template>

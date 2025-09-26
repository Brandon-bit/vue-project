<script setup lang="ts">
const props = defineProps<{
    title: string
    quantity: string | number
}>()
</script>
<template>
    <div class="card bg-base-100 shadow-sm col-span-12 md:col-span-6 lg:col-span-3">
        <div class="card-body">
            <div class="grid grid-rows-2 items-center h-full">
                <h3 class="card-title row-span-1">{{ props.title }}</h3>
                <p class="text-2xl !font-semibold my-3 row-span-1">{{ props.quantity }}</p>
            </div>
        </div>
    </div>
</template>

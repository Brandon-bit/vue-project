<script setup lang="ts">

import useSaleStore from '@/modules/Sales/Sales/online-orders/store/saleStore'
const saleStore = useSaleStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la venta
        <span class="!font-semibold"> "{{ saleStore.selectedSale?.name }}" ? </span>
    </p>
</template>

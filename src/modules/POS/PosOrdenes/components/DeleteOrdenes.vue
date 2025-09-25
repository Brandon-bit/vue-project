<script setup lang="ts">

import useOrdersStore from '@/modules/POS/PosOrdenes/store/posOrdersStore'
const ordersStore = useOrdersStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la orden
        <span class="!font-semibold"> "{{ ordersStore.selectedSale?.name }}" ? </span>
    </p>
</template>

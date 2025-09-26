<script setup lang="ts">
import useOrderManagementStore from '@inventario/Operacion/GestionDePedidos/store/useOrderManagementStore';
const orderManagementStore = useOrderManagementStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas avanzar el estado del pedido
        <span class="!font-semibold"> "{{ orderManagementStore.selectedOrderManagement?.folio }}" ? </span>
    </p>
</template>

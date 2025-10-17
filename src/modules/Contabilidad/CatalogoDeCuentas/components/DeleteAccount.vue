<script setup lang="ts">
import useAccountsCatalogStore from '@/modules/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'

const accountsCatalogStore = useAccountsCatalogStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la cuenta
        <span class="!font-semibold"> "{{ accountsCatalogStore.selectedAccount?.name }}" </span>
        con código
        <span class="!font-semibold"> "{{ accountsCatalogStore.selectedAccount?.code }}" </span>?
    </p>
</template>

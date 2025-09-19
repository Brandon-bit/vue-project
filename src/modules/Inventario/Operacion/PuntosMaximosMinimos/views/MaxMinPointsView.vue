<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useMaxMinTableHeaders } from '@inventario/Operacion/PuntosMaximosMinimos/composables/useMaxMinTableHeaders'
import CreateButton from '@inventario/Operacion/PuntosMaximosMinimos/components/CreateButton.vue'
import { useMaxMinActions } from '@/modules/Inventario/Operacion/PuntosMaximosMinimos/composables/useMaxMinActions'
import MaxMinModal from '@inventario/Operacion/PuntosMaximosMinimos/components/MaxMinModal.vue'
const { getMaxMinPoints } = useMaxMinActions()
</script>
<template>
    <h2 class="text-center mb-8">Puntos máximos y mínimos</h2>
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable :fetchCallback="getMaxMinPoints" :headers="useMaxMinTableHeaders()" />
    <MaxMinModal />
</template>

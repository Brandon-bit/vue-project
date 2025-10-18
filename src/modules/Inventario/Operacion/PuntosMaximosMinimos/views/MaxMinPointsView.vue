<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { useMaxMinTableHeaders } from '@inventario/Operacion/PuntosMaximosMinimos/composables/useMaxMinTableHeaders'
import CreateButton from '@inventario/Operacion/PuntosMaximosMinimos/components/CreateButton.vue'
import { useMaxMinActions } from '@/modules/Inventario/Operacion/PuntosMaximosMinimos/composables/useMaxMinActions'
import MaxMinModal from '@inventario/Operacion/PuntosMaximosMinimos/components/MaxMinModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
const { getMaxMinPoints } = useMaxMinActions()
</script>
<template>
    <BaseTitle 
        title="Puntos máximos y mínimos" 
        subtitle="Gestión de puntos máximos y mínimos"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable :fetchCallback="getMaxMinPoints" :headers="useMaxMinTableHeaders()" />
    <MaxMinModal />
</template>

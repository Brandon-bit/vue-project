<script setup lang="ts">
import useAuditStore from '../store/auditStore'

const auditStore = useAuditStore()
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <span>Esta acción no se puede deshacer. La auditoría será marcada como eliminada.</span>
        </div>

        <div class="bg-base-200 p-4 rounded-lg space-y-2">
            <h3 class="font-semibold text-lg">{{ auditStore.selectedAudit.nombre }}</h3>
            <div class="text-sm text-base-content/70 space-y-1">
                <p><strong>Tipo:</strong> {{ auditStore.selectedAudit.tipo }}</p>
                <p><strong>Área:</strong> {{ auditStore.selectedAudit.area }}</p>
                <p><strong>Auditor:</strong> {{ auditStore.selectedAudit.auditor }}</p>
                <p><strong>Estado:</strong> {{ auditStore.selectedAudit.estado }}</p>
            </div>
        </div>

        <p class="text-sm text-base-content/70">
            ¿Está seguro que desea eliminar esta auditoría?
        </p>
    </div>
</template>

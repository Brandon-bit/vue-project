<script setup lang="ts">
import type { Finding } from '../types/auditTypes'

defineProps<{
    findings: Finding[]
}>()

const getSeverityBadge = (severity: string) => {
    const badges: Record<string, string> = {
        'Alta': 'badge-error',
        'Media': 'badge-warning',
        'Baja': 'badge-info'
    }
    return badges[severity] || 'badge-outline'
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    })
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="status in ['Pendiente', 'En Proceso', 'Completado']" :key="status" class="space-y-3">
            <!-- Header de Columna -->
            <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <h3 class="font-semibold">{{ status }}</h3>
                <div class="badge badge-outline">
                    {{ findings.filter(f => f.estado === status).length }}
                </div>
            </div>

            <!-- Tarjetas de Hallazgos -->
            <div class="space-y-2 min-h-[200px]">
                <div 
                    v-for="finding in findings.filter(f => f.estado === status)" 
                    :key="finding.id"
                    class="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer"
                >
                    <div class="card-body p-4">
                        <div class="flex justify-between items-start gap-2 mb-2">
                            <h4 class="text-sm font-semibold line-clamp-2">{{ finding.descripcion }}</h4>
                            <div :class="['badge badge-sm', getSeverityBadge(finding.severidad)]">
                                {{ finding.severidad }}
                            </div>
                        </div>
                        
                        <p class="text-xs text-base-content/70 mb-3">{{ finding.auditoriaNombre }}</p>
                        
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 text-xs text-base-content/70">
                                <span class="material-symbols-outlined text-sm">person</span>
                                {{ finding.responsable }}
                            </div>
                            <div class="flex items-center gap-2 text-xs text-base-content/70">
                                <span class="material-symbols-outlined text-sm">calendar_month</span>
                                Límite: {{ formatDate(finding.fechaLimite) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="findings.filter(f => f.estado === status).length === 0" class="text-center py-8 text-base-content/50">
                    <span class="material-symbols-outlined text-4xl mb-2 block">inbox</span>
                    <p class="text-sm">No hay hallazgos</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AuditStats } from '../types/auditTypes'

defineProps<{
    stats: AuditStats
}>()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Auditorías Activas -->
        <div class="stats shadow bg-base-100">
            <div class="stat">
                <div class="stat-title">Auditorías Activas</div>
                <div class="stat-value text-blue-500">{{ stats.activas }}</div>
                <div class="stat-figure text-blue-500">
                    <span class="material-symbols-outlined text-5xl">play_circle</span>
                </div>
            </div>
        </div>

        <!-- Hallazgos Abiertos -->
        <div class="stats shadow bg-base-100">
            <div class="stat">
                <div class="stat-title">Hallazgos Abiertos</div>
                <div class="stat-value text-orange-500">{{ stats.hallazgosAbiertos }}</div>
                <div class="stat-figure text-orange-500">
                    <span class="material-symbols-outlined text-5xl">warning</span>
                </div>
            </div>
        </div>

        <!-- Tareas Correctivas -->
        <div class="stats shadow bg-base-100">
            <div class="stat">
                <div class="stat-title">Tareas Correctivas</div>
                <div class="stat-value text-purple-500">{{ stats.tareasCorrectivas }}</div>
                <div class="stat-figure text-purple-500">
                    <span class="material-symbols-outlined text-5xl">task_alt</span>
                </div>
            </div>
        </div>

        <!-- Completadas Este Año -->
        <div class="stats shadow bg-base-100">
            <div class="stat">
                <div class="stat-title">Completadas Este Año</div>
                <div class="stat-value text-green-500">{{ stats.completadasAnio }}</div>
                <div class="stat-figure text-green-500">
                    <span class="material-symbols-outlined text-5xl">check_circle</span>
                </div>
            </div>
        </div>
    </div>
</template>

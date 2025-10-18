<script setup lang="ts">
import VacationStatsCards from '@rrhh/VacacionesDashboard/components/VacationStatsCards.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
</script>

<template>
    <div class="vacation-dashboard">
        <BaseTitle 
            title="Dashboard de vacaciones" 
            subtitle="Gestión de vacaciones"
        />
        
        <VacationStatsCards />
        
        <!-- Sección adicional para futuras mejoras -->
        <div class="mt-10">
            <div class="alert alert-info">
                <span class="material-symbols-outlined">info</span>
                <span>
                    Este dashboard muestra estadísticas en tiempo real sobre las vacaciones de los empleados.
                    Utiliza la sección de <strong>Gestión de Vacaciones</strong> para administrar las solicitudes.
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.vacation-dashboard {
    padding: 1rem;
}

.alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: hsl(var(--in) / 0.1);
    border: 1px solid hsl(var(--in) / 0.2);
}

.alert-info {
    color: hsl(var(--inc));
}

.alert .material-symbols-outlined {
    font-size: 1.5rem;
}
</style>

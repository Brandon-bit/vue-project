<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEmployeeActions } from '@/modules/RRHH/Empleados/composables/useEmployeeActions'

interface EmployeeStats {
    total: number
    active: number
    inactive: number
}

const { getEmployeeStats } = useEmployeeActions()
const stats = ref<EmployeeStats>({
    total: 0,
    active: 0,
    inactive: 0
})

const activePercentage = computed(() => {
    if (stats.value.total === 0) return '0.0'
    return ((stats.value.active / stats.value.total) * 100).toFixed(1)
})

const inactivePercentage = computed(() => {
    if (stats.value.total === 0) return '0.0'
    return ((stats.value.inactive / stats.value.total) * 100).toFixed(1)
})

onMounted(async () => {
    stats.value = await getEmployeeStats()
})
</script>

<template>
    <div class="grid gap-6 md:grid-cols-3 mb-15">
        <!-- Total Empleados -->
        <div class="stat-card group">
            <div class="stat-icon-wrapper bg-primary/10">
                <span class="material-symbols-outlined text-primary text-2xl">groups</span>
            </div>
            <div class="stat-content">
                <h3 class="stat-label">Total Empleados</h3>
                <div class="stat-value">{{ stats.total }}</div>
                <p class="stat-description">En todas las empresas</p>
            </div>
            <div class="stat-decoration"></div>
        </div>

        <!-- Activos -->
        <div class="stat-card group">
            <div class="stat-icon-wrapper bg-success/10">
                <span class="material-symbols-outlined text-success text-2xl">check_circle</span>
            </div>
            <div class="stat-content">
                <h3 class="stat-label">Activos</h3>
                <div class="stat-value text-success">{{ stats.active }}</div>
                <p class="stat-description">{{ activePercentage }}% de la plantilla</p>
            </div>
            <div class="stat-decoration bg-success/5"></div>
        </div>

        <!-- Inactivos -->
        <div class="stat-card group">
            <div class="stat-icon-wrapper bg-error/10">
                <span class="material-symbols-outlined text-error text-2xl">cancel</span>
            </div>
            <div class="stat-content">
                <h3 class="stat-label">Inactivos</h3>
                <div class="stat-value text-error">{{ stats.inactive }}</div>
                <p class="stat-description">{{ inactivePercentage }}% de la plantilla</p>
            </div>
            <div class="stat-decoration bg-error/5"></div>
        </div>
    </div>
</template>

<style scoped>
.stat-card {
    position: relative;
    overflow: hidden;
    background: hsl(var(--b1));
    border-radius: 1rem;
    border: 1px solid hsl(var(--bc) / 0.1);
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease-in-out;
    padding: 1.5rem;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-color: hsl(var(--p) / 0.3);
}

.stat-icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon-wrapper {
    transform: scale(1.1);
}

.stat-content {
    position: relative;
    z-index: 10;
}

.stat-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--bc) / 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    transition: transform 0.3s ease;
}

.stat-card:hover .stat-value {
    transform: scale(1.05);
}

.stat-description {
    font-size: 0.75rem;
    color: hsl(var(--bc) / 0.5);
    font-weight: 500;
}

.stat-decoration {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    opacity: 0.2;
    transition: all 0.5s ease;
}

.stat-card:hover .stat-decoration {
    transform: scale(1.5);
    opacity: 0.3;
}

/* Gradiente sutil en el fondo */
.stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, hsl(var(--b2) / 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.stat-card:hover::before {
    opacity: 1;
}

/* Animación de entrada */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-card {
    animation: slideInUp 0.5s ease-out;
}

.stat-card:nth-child(1) {
    animation-delay: 0.1s;
}
.stat-card:nth-child(2) {
    animation-delay: 0.2s;
}
.stat-card:nth-child(3) {
    animation-delay: 0.3s;
}
</style>

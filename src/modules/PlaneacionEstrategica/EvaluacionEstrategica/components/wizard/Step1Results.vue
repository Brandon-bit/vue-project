<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'

const periodResults = {
    evaluatedObjectives: 4,
    completedObjectives: 3,
    averageCompliance: 76,
    completedInitiatives: 1,
    greenKPIs: 5
}
</script>

<template>
    <div class="space-y-4">
        <h3 class="font-semibold text-lg">Resumen de Resultados</h3>
        
        <div class="grid grid-cols-2 gap-4">
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Objetivos Cumplidos</p>
                    <p class="text-2xl font-bold">
                        {{ periodResults.completedObjectives }}/{{ periodResults.evaluatedObjectives }}
                    </p>
                </div>
            </div>
            
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Cumplimiento Promedio</p>
                    <p class="text-2xl font-bold">{{ periodResults.averageCompliance }}%</p>
                </div>
            </div>
            
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Iniciativas Completadas</p>
                    <p class="text-2xl font-bold">{{ periodResults.completedInitiatives }}</p>
                </div>
            </div>
            
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">KPIs en Meta</p>
                    <p class="text-2xl font-bold text-success">{{ periodResults.greenKPIs }}</p>
                </div>
            </div>
        </div>

        <BaseFormInput
            name="period"
            label="Periodo Evaluado"
            type="text"
            placeholder="ej. Q1 2025"
            :required="true"
        />
    </div>
</template>

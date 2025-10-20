<script setup lang="ts">
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const lessonsCount = 2
const successCount = 1
const problemCount = 1
</script>

<template>
    <div class="space-y-4">
        <h3 class="font-semibold text-lg">Lecciones Aprendidas y Recomendaciones</h3>
        
        <div class="card bg-base-200">
            <div class="card-body">
                <h4 class="text-sm font-medium">Lecciones Registradas</h4>
                <p class="text-2xl font-bold">{{ lessonsCount }}</p>
                <p class="text-xs text-base-content/60">
                    {{ successCount }} éxitos, {{ problemCount }} problemas
                </p>
            </div>
        </div>

        <BaseTextArea
            name="recommendations"
            label="Recomendaciones para el Próximo Periodo"
            placeholder="¿Qué ajustes debemos hacer en la estrategia?..."
            :rows="5"
        />
    </div>
</template>

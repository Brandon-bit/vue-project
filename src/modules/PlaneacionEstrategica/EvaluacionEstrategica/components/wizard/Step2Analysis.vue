<script setup lang="ts">
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="space-y-4">
        <h3 class="font-semibold text-lg">Análisis Cualitativo</h3>
        
        <BaseTextArea
            name="highlightedAchievements"
            label="Logros Destacados"
            placeholder="Describe los principales logros del periodo..."
            :rows="4"
        />

        <BaseTextArea
            name="opportunityAreas"
            label="Áreas de Oportunidad"
            placeholder="Identifica áreas que requieren atención..."
            :rows="4"
        />
    </div>
</template>

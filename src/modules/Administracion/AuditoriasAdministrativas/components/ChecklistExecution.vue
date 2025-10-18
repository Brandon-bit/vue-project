<script setup lang="ts">
import type { ChecklistItem, Audit } from '../types/auditTypes'
import { ref } from 'vue'

const props = defineProps<{
    items: ChecklistItem[]
    audits: Audit[]
}>()

const emit = defineEmits<{
    registerFinding: [item: ChecklistItem]
    selectAudit: [auditId: number]
}>()

const selectedAuditId = ref<number>(props.audits[0]?.id || 0)
</script>

<template>
    <div class="space-y-4">
        <!-- Selector de Auditoría -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h3 class="text-lg font-semibold">Checklist de Auditoría</h3>
                <p class="text-sm text-base-content/70">Marque los items verificados durante la ejecución</p>
            </div>
            <select 
                v-model="selectedAuditId"
                class="select select-bordered w-80"
                @change="emit('selectAudit', selectedAuditId)"
            >
                <option v-for="audit in audits" :key="audit.id" :value="audit.id">
                    {{ audit.nombre }}
                </option>
            </select>
        </div>

        <!-- Checklist por Categoría -->
        <div v-for="categoria in ['Documentación', 'Procesos', 'Controles']" :key="categoria" class="space-y-3">
            <h3 class="font-semibold text-lg border-b pb-2">{{ categoria }}</h3>
            
            <div 
                v-for="item in items.filter(i => i.categoria === categoria && i.auditoriaId === selectedAuditId)" 
                :key="item.id"
                class="flex items-start gap-3 p-3 border rounded-lg hover:bg-base-200 transition-colors"
            >
                <input 
                    type="checkbox" 
                    :checked="item.cumple"
                    class="checkbox checkbox-primary mt-1"
                />
                
                <div class="flex-1">
                    <label class="text-sm cursor-pointer">
                        {{ item.item }}
                    </label>
                </div>
                
                <div class="flex gap-2">
                    <div v-if="item.cumple" class="badge badge-success gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Cumple
                    </div>
                    <template v-else>
                        <div class="badge badge-error gap-1">
                            <span class="material-symbols-outlined text-sm">warning</span>
                            No Cumple
                        </div>
                        <button 
                            class="btn btn-outline btn-sm"
                            @click="emit('registerFinding', item)"
                        >
                            Registrar Hallazgo
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

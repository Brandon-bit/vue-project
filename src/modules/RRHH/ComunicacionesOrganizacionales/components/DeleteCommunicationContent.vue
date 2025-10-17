<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'

const props = defineProps<{
    modalId: string
}>()

const modalStore = useModalStore()

const communicationData = computed(() => {
    return modalStore.modals[props.modalId]?.data || {}
})
</script>

<template>
    <div class="space-y-4">
        <div class="text-center">
            <p class="text-lg mb-4">¿Estás seguro de que deseas eliminar este comunicado?</p>
            <div class="bg-base-200 p-4 rounded-lg">
                <p class="font-bold text-xl mb-2">
                    {{ communicationData.title }}
                </p>
                <p class="text-sm text-base-content/70 mb-2">
                    Creado por: {{ communicationData.createdBy }}
                </p>
                <p class="text-sm text-base-content/70">
                    Fecha: {{ communicationData.createdAtFormatted }}
                </p>
                <div class="mt-3">
                    <span
                        :class="
                            communicationData.active ? 'badge badge-success' : 'badge badge-error'
                        "
                    >
                        {{ communicationData.statusLabel }}
                    </span>
                </div>
            </div>
            <div class="alert alert-warning mt-4">
                <span class="material-symbols-outlined">warning</span>
                <span>Esta acción no se puede deshacer</span>
            </div>
        </div>
    </div>
</template>

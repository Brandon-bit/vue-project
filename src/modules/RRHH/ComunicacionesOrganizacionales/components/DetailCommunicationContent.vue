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

const openImageInNewTab = (url: string) => {
    window.open(url, '_blank')
}
</script>

<template>
    <div class="space-y-4">
        <!-- Título -->
        <div>
            <h3 class="text-2xl font-bold mb-2">{{ communicationData.title }}</h3>
            <div class="flex gap-2 flex-wrap mb-4">
                <span
                    :class="
                        communicationData.active ? 'badge badge-success' : 'badge badge-error'
                    "
                >
                    {{ communicationData.statusLabel }}
                </span>
                <span
                    :class="
                        communicationData.publicationType === 'publish'
                            ? 'badge badge-primary'
                            : 'badge badge-secondary'
                    "
                >
                    {{ communicationData.publicationTypeLabel }}
                </span>
            </div>
        </div>

        <!-- Información -->
        <div class="bg-base-200 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span class="font-semibold">Creado por:</span>
                    <p class="text-base-content/70">{{ communicationData.createdBy }}</p>
                </div>
                <div>
                    <span class="font-semibold">Fecha:</span>
                    <p class="text-base-content/70">
                        {{ communicationData.createdAtFormatted }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Contenido -->
        <div>
            <h4 class="font-semibold mb-2">Contenido:</h4>
            <div class="bg-base-200 p-4 rounded-lg">
                <p class="whitespace-pre-wrap">{{ communicationData.content }}</p>
            </div>
        </div>

        <!-- Imágenes -->
        <div v-if="communicationData.images && communicationData.images.length > 0">
            <h4 class="font-semibold mb-2">
                Imágenes ({{ communicationData.images.length }}):
            </h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div
                    v-for="(image, index) in communicationData.images"
                    :key="index"
                    class="relative group"
                >
                    <img
                        :src="image"
                        :alt="`Imagen ${index + 1}`"
                        class="w-full h-32 object-cover rounded-lg border border-base-300 cursor-pointer hover:opacity-80 transition-opacity"
                        @click="openImageInNewTab(image)"
                    />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center"
                    >
                        <span
                            class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            zoom_in
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

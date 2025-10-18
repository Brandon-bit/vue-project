<script setup lang="ts">
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'

const documentStore = useDocumentStore()
const doc = documentStore.selectedDocument
</script>

<template>
    <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="text-sm text-base-content/70">Categoría</label>
                <p class="font-medium">{{ doc.category }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Tamaño</label>
                <p class="font-medium">{{ doc.size }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Fecha</label>
                <p class="font-medium">{{ new Date(doc.uploadDate).toLocaleDateString() }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Subido Por</label>
                <p class="font-medium">{{ doc.uploadedBy }}</p>
            </div>
        </div>
        
        <div v-if="doc.tags && doc.tags.length > 0">
            <label class="text-sm text-base-content/70">Tags</label>
            <div class="flex gap-2 mt-1 flex-wrap">
                <span v-for="tag in doc.tags" :key="tag" class="badge badge-primary">
                    {{ tag }}
                </span>
            </div>
        </div>

        <div class="border rounded-lg p-8 bg-base-200 text-center">
            <span class="material-symbols-outlined text-8xl text-base-content/30 mb-4">description</span>
            <p class="text-base-content/70">Vista previa del documento</p>
        </div>
    </div>
</template>

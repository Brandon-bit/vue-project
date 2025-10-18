<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseFormSingleImageInput from '@/shared/components/BaseFormSingleImageInput.vue';
import { useMediaAssetStore } from '../store/mediaAssetStore';
import { useModalStore } from '@/shared/stores/modal.store';

const mediaAssetStore = useMediaAssetStore();
const modalStore = useModalStore();

const isEditMode = modalStore.modals[mediaAssetStore.modalId]?.type === 'EDIT';
</script>

<template>
  <div class="space-y-4">
    <BaseFormSingleImageInput
      name="image"
      label="Archivo de Imagen"
      accept="image/png, image/jpeg, image/webp"
      :image-url="mediaAssetStore.selectedAsset?.url"
      :required="!isEditMode"
    />
    <BaseFormInput
      name="title"
      type="text"
      label="Título de la Imagen"
      placeholder="Ej: Colección Verano 2025"
      :required="true"
    />
    <BaseFormInput
      name="tags"
      type="text"
      label="Etiquetas"
      placeholder="ropa, verano, campaña (separadas por coma)"
      :required="true"
    />
    <p class="text-xs text-gray-500">
      Las etiquetas ayudan a encontrar la imagen más fácilmente.
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus, Search, Tag, Edit, Trash2, ImageIcon, Video, Music } from 'lucide-vue-next';

import { useMediaAssetStore } from '../store/mediaAssetStore';
import { useModalStore } from '@/shared/stores/modal.store';
import { useMediaAssetActions } from '../composables/useMediaAssetActions';
import type { AssetType, AssetFormType, MediaType } from '../types/mediaAssetType';
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseTitle from '@/shared/components/BaseTitle.vue';
import UploadAssetForm from '../components/bankForm.vue';

const mediaAssetStore = useMediaAssetStore();
const modalStore = useModalStore();
const { getAssets, uploadAsset, updateDetails, deleteAsset } = useMediaAssetActions();

const assets = ref<AssetType[]>([]);
const isSubmitting = ref(false);
const searchQuery = ref('');
const activeTab = ref<MediaType>('image');

const tabs: { name: MediaType; label: string; icon: any }[] = [
  { name: 'image', label: 'Imágenes', icon: ImageIcon },
  { name: 'video', label: 'Videos', icon: Video },
  { name: 'audio', label: 'Música', icon: Music },
];

const fetchData = async () => {
  const response = await getAssets(activeTab.value, searchQuery.value);
  assets.value = response.items;
};

onMounted(fetchData);

const handleSearch = () => fetchData();

const handleTabClick = (mediaType: MediaType) => {
  activeTab.value = mediaType;
  searchQuery.value = '';
  fetchData();
};

const openUploadModal = () => {
  mediaAssetStore.setData();
  modalStore.open(mediaAssetStore.modalId, {
    type: 'CREATE',
    title: `Subir Nuevo ${activeTab.value === 'image' ? 'Imagen' : activeTab.value === 'video' ? 'Video' : 'Audio'}`,
  });
};

const openEditModal = (asset: AssetType) => {
  const dataForForm = { ...asset, tags: Array.isArray(asset.tags) ? asset.tags.join(', ') : '' };
  mediaAssetStore.setData(dataForForm as any);
  modalStore.open(mediaAssetStore.modalId, {
    type: 'EDIT',
    title: 'Editar Detalles del Activo',
  });
};

const openDeleteModal = (asset: AssetType) => {
  mediaAssetStore.setData(asset);
  modalStore.open(mediaAssetStore.modalId, {
    type: 'DELETE',
    title: 'Confirmar Eliminación',
  });
};

const handleSubmit = async (formData: AssetFormType) => {
  isSubmitting.value = true;
  try {
    const modalType = modalStore.modals[mediaAssetStore.modalId]?.type;
    
    if (modalType === 'CREATE') await uploadAsset(formData, activeTab.value);
    if (modalType === 'EDIT') await updateDetails(formData);
    if (modalType === 'DELETE') await deleteAsset();

    modalStore.close(mediaAssetStore.modalId);
    await fetchData();
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleClose = () => {
  mediaAssetStore.setData();
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};
</script>

<template>
  <div class="">
    <BaseTitle title="Banco de Medios" subtitle="Gestiona y organiza todos tus activos" />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openUploadModal">
        <Plus class="mr-2 h-4 w-4" />
        Subir Archivo
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="tabs tabs-bordered mb-6">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            class="tab"
            :class="{ 'tab-active': activeTab === tab.name }"
            @click="handleTabClick(tab.name)"
          >
            <component :is="tab.icon" class="h-4 w-4 mr-2" />
            {{ tab.label }}
          </a>
        </div>
        
        <div class="flex gap-4 mb-6">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Buscar por nombre o etiqueta..."
              class="input input-bordered w-full pl-10"
            />
          </div>
          <button class="btn btn-outline" disabled>
            <Tag class="mr-2 h-4 w-4" />
            Filtrar por Etiqueta
          </button>
        </div>

        <div v-if="assets.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="asset in assets" :key="asset.id" class="card card-compact bg-base-100 shadow-md overflow-hidden group">
            
            <figure v-if="asset.mediaType === 'image' || asset.mediaType === 'video'" class="relative aspect-video bg-black">
              <img :src="asset.mediaType === 'video' ? (asset as any).thumbnailUrl || asset.url : asset.url" :alt="asset.title" class="w-full h-full object-cover" />
              <div v-if="asset.mediaType === 'video'" class="absolute inset-0 flex items-center justify-center bg-black/30">
                <Video class="h-12 w-12 text-white/70" />
              </div>
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button @click="openEditModal(asset)" class="btn btn-sm btn-circle"><Edit class="h-4 w-4" /></button>
                <button @click="openDeleteModal(asset)" class="btn btn-sm btn-circle btn-error"><Trash2 class="h-4 w-4" /></button>
              </div>
            </figure>

            <div v-if="asset.mediaType !== 'audio'" class="card-body">
              <h3 class="card-title text-sm truncate">{{ asset.title }}</h3>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="tag in asset.tags" :key="tag" class="badge badge-ghost text-xs">{{ tag }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-2">{{ formatDate(asset.uploadDate) }}</p>
            </div>

            <div v-if="asset.mediaType === 'audio'" class="card-body flex-row items-center justify-between">
              <div class="flex items-center gap-4 truncate">
                <Music class="h-8 w-8 text-primary flex-shrink-0"/>
                <div class="truncate">
                  <h3 class="font-semibold text-sm truncate">{{ asset.title }}</h3>
                  <p class="text-xs text-gray-500 truncate">{{ (asset as any).artist }} - {{ (asset as any).album }}</p>
                </div>
              </div>
              <div class="flex gap-1">
                <button @click="openEditModal(asset)" class="btn btn-xs btn-ghost btn-circle"><Edit class="h-4 w-4" /></button>
                <button @click="openDeleteModal(asset)" class="btn btn-xs btn-ghost btn-circle text-error"><Trash2 class="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          <ImageIcon class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p class="font-semibold">No se encontraron activos</p>
          <p class="text-sm mt-2">Intenta con otra búsqueda o sube un nuevo archivo.</p>
        </div>
      </div>
    </div>

    <BaseModal
      :modal-id="mediaAssetStore.modalId"
      :is-submitting="isSubmitting"
      :on-submit="handleSubmit"
      :on-close="handleClose"
    >
      <template #modalBody>
        <div v-if="modalStore.modals[mediaAssetStore.modalId]?.type === 'DELETE'">
          <p class="text-center">¿Estás seguro de que quieres eliminar este activo?</p>
          <p class="text-center font-bold mt-2">{{ mediaAssetStore.selectedAsset.title }}</p>
        </div>
        <UploadAssetForm v-else />
      </template>
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus, Search, Tag, Download, Edit, Trash2, Image as ImageIcon } from 'lucide-vue-next';

// 1. Importaciones de nuestra nueva arquitectura
import { useImageBankStore } from '../store/imageBankStore';
import { useModalStore } from '@/shared/stores/modal.store';
import { useImageBankActions } from '../composables/useBankImagesActions';
import  { ImageAssetType, ImageFormType } from '../types/bankImageType';
import BaseModal from '@/shared/components/BaseModal.vue';
import UploadImageForm from '../components/bankForm.vue';

// 2. Inicialización de stores y composables
const imageBankStore = useImageBankStore();
const modalStore = useModalStore();
const { getImages, uploadImage, updateDetails, deleteImage } = useImageBankActions();

// 3. Refs para manejar el estado de la vista
const images = ref<ImageAssetType[]>([]);
const isSubmitting = ref(false);
const searchQuery = ref('');

// 4. Lógica para cargar datos, buscar y manejar modales
const fetchData = async () => {
  const response = await getImages(searchQuery.value);
  images.value = response.items;
};

onMounted(fetchData);

const handleSearch = () => {
  fetchData();
};

const openUploadModal = () => {
  imageBankStore.setData(); // Resetea cualquier data
  modalStore.open(imageBankStore.modalId, {
    type: 'CREATE',
    title: 'Subir Nuevas Imágenes'
  });
};

const openEditModal = (image: ImageAssetType) => {
 
  const dataForForm = { ...image, tags: image.tags.join(', ') };
  imageBankStore.setData(dataForForm as any);
  modalStore.open(imageBankStore.modalId, {
    type: 'EDIT',
    title: 'Editar Detalles de Imagen'
  });
};

const openDeleteModal = (image: ImageAssetType) => {
    imageBankStore.setData(image);
    modalStore.open(imageBankStore.modalId, {
        type: 'DELETE',
        title: 'Confirmar Eliminación'
    });
};

// 5. El manejador principal del modal
const handleSubmit = async (formData: ImageFormType) => {
  isSubmitting.value = true;
  try {
    const modalType = modalStore.modals[imageBankStore.modalId]?.type;
    
    if (modalType === 'CREATE') await uploadImage(formData);
    if (modalType === 'EDIT') await updateDetails(formData);
    if (modalType === 'DELETE') await deleteImage();

    modalStore.close(imageBankStore.modalId);
    await fetchData(); // Recarga las imágenes
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleClose = () => {
    imageBankStore.setData();
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
};
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Banco de Imágenes</h1>
        <p class="text-gray-500 mt-2">
          Gestiona y organiza todos tus activos visuales
        </p>
      </div>
      <button class="btn btn-primary" @click="openUploadModal">
        <Plus class="mr-2 h-4 w-4" />
        Subir Imágenes
      </button>
    </div>

    <div class="card ">
      <div class="card-body">
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

        <div v-if="images.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="image in images" :key="image.id" class="card card-compact bg-white shadow-md overflow-hidden group">
            <figure class="relative aspect-video">
              <img :src="image.url" :alt="image.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button @click="openEditModal(image)" class="btn btn-sm btn-circle">
                  <Edit class="h-4 w-4" />
                </button>
                <button @click="openDeleteModal(image)" class="btn btn-sm btn-circle btn-error">
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </figure>
            <div class="card-body bg-white ">
              <h3 class="card-title text-sm truncate">{{ image.title }}</h3>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="tag in image.tags" :key="tag" class="badge badge-ghost text-xs">
                  {{ tag }}
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-2">{{ formatDate(image.uploadDate) }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          <ImageIcon class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p class="font-semibold">No se encontraron imágenes</p>
          <p class="text-sm mt-2">Intenta con otra búsqueda o sube una nueva imagen.</p>
        </div>
      </div>
    </div>

    <BaseModal
      :modal-id="imageBankStore.modalId"
      :is-submitting="isSubmitting"
      :on-submit="handleSubmit"
      :on-close="handleClose"
    >
        <template #modalBody>
            <div v-if="modalStore.modals[imageBankStore.modalId]?.type === 'DELETE'">
                <p class="text-center">¿Estás seguro de que quieres eliminar esta imagen?</p>
                <p class="text-center font-bold mt-2">{{ imageBankStore.selectedAsset.title }}</p>
            </div>
            <UploadImageForm v-else />
        </template>
    </BaseModal>
  </div>
</template>
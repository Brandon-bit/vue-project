<script setup lang="ts">
import { onMounted, ref } from 'vue';


import useSocialStore from '../store/useSocialPostStore'; 
import { useSocialPostActions } from '../composables/useSocialActions'; 
import { useStatusBadge } from '../composables/useSocialStatus'; 
import { useModalStore } from '@/shared/stores/modal.store';
import BaseModal from '@/shared/components/BaseModal.vue';
import AddEditSocialPostForm from '../components/socialPostForm.vue'; 
import BaseCalendar from '@/shared/components/BaseCalendar.vue';
import type { SocialPost } from '../types/socialPostTypes';
import BaseTitle from '@/shared/components/BaseTitle.vue';

const socialStore = useSocialStore();
const modalStore = useModalStore();
const { getPosts, createPost, editPost, deletePost } = useSocialPostActions();
const { getBadgeProps } = useStatusBadge();

// 2. Refs para manejar el estado de la vista
const posts = ref<SocialPost[]>([]);
const isSubmitting = ref(false);
const selectedDate = ref(new Date());

// 3. Función para cargar los datos
const fetchData = async () => {
 
  const response = await getPosts(1, 100); // Carga los primeros 100 posts
  posts.value = response.items;
};

onMounted(fetchData);


const openCreateModal = () => {
  // Pre-llenamos la fecha con la seleccionada en el calendario
  const initialData = { ...socialStore.selectedPost, date: selectedDate.value.toISOString().split('T')[0] };
  socialStore.setData(initialData as SocialPost);
  modalStore.open(socialStore.modalId, {
    type: 'CREATE',
    title: 'Nueva Publicación'
  });
};

const openEditModal = (post: SocialPost) => {
  socialStore.setData(post);
  modalStore.open(socialStore.modalId, {
    type: 'EDIT',
    title: 'Editar Publicación'
  });
};

const openDeleteModal = (post: SocialPost) => {
  socialStore.setData(post);
  modalStore.open(socialStore.modalId, {
    type: 'DELETE',
    title: 'Eliminar Publicación'
  });
};

// 5. El manejador de envío del formulario, ahora más robusto
const handleSubmit = async (formData: any) => {
  isSubmitting.value = true;
  try {
    const modalState = modalStore.modals[socialStore.modalId];
    if (!modalState) return;

    if (modalState.type === 'EDIT') await editPost(formData);
    else if (modalState.type === 'CREATE') await createPost(formData);
    else if (modalState.type === 'DELETE') await deletePost();
    
    modalStore.close(socialStore.modalId);
    await fetchData(); // Refresca los datos después de cualquier operación
  } catch (error) {
    console.error("Error al procesar la acción:", error);
    
  } finally {
    isSubmitting.value = false;
  }
};

const handleClose = () => {
  socialStore.setData(); 
};
// --- FIN DE CAMBIOS ---

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};
</script>

<template>
  <div class="p-6 space-y-6">
    <BaseTitle title="Coordinador de Redes Sociales" subtitle="Planifica, programa y gestiona publicaciones en todas tus redes sociales." />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openCreateModal">
        <span class="material-symbols-outlined">add</span>
        Nueva Publicación
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="card bg-base-100 shadow-xl lg:col-span-1">
        <div class="card-body">
          <h2 class="card-title">Calendario</h2>
          <BaseCalendar v-model="selectedDate" />
          <p class="mt-4 text-sm text-center">
            Fecha seleccionada: {{ selectedDate ? selectedDate.toLocaleDateString('es-MX') : 'Ninguna' }}
          </p>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl lg:col-span-2">
        <div class="card-body">
          <h2 class="card-title">Publicaciones Programadas</h2>
          <div class="space-y-4 mt-4">
            <p v-if="posts.length === 0" class="text-center text-gray-500 py-8">
              No hay publicaciones programadas.
            </p>
            <div v-else v-for="post in posts" :key="post.id" class="card card-compact bg-white shadow-md">
              <div class="card-body">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium">{{ formatDate(post.date) }}</p>
                    <div class="flex gap-2 mt-2">
                      <span v-if="post.networks?.facebook" class="font-bold text-blue-600">FB</span>
                      <span v-if="post.networks?.instagram" class="font-bold text-pink-500">IG</span>
                      <span v-if="post.networks?.twitter" class="font-bold text-sky-500">TW</span>
                    </div>
                  </div>
                  <div class="badge" :class="getBadgeProps(post.status).class">
                    {{ getBadgeProps(post.status).label }}
                  </div>
                </div>
                <p class="text-sm text-gray-600 line-clamp-2 mt-2">
                  {{ post.caption }}
                </p>
                <div class="card-actions justify-end mt-4">
                  <button @click="openEditModal(post)" class="btn btn-sm btn-ghost">Editar</button>
                  <button @click="openDeleteModal(post)" class="btn btn-sm btn-ghost text-error">Eliminar</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      :modal-id="socialStore.modalId"
      :is-submitting="isSubmitting"
      :on-submit="handleSubmit"
      :on-close="handleClose"
    >
      <template #modalBody>
        <div v-if="modalStore.modals[socialStore.modalId]?.type === 'DELETE'">
          <p class="text-center">¿Estás seguro de que quieres eliminar esta publicación?</p>
          <p class="text-center font-bold mt-2">{{ socialStore.selectedPost.caption }}</p>
        </div>
        <AddEditSocialPostForm v-else />
      </template>
    </BaseModal>
    </div>
</template>
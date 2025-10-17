<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
// Importa los componentes base que ya tienes
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
// Importa tu store de modales
import { useModalStore } from '@/shared/stores/modal.store';
// Importa los iconos
import { Plus, Building2, Image, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-vue-next';

// --- Tipos de Datos (Definidos aquí para la simulación) ---
interface Brand {
  id: string;
  name: string;
  logo: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  emailDomain?: string;
}

// --- Estado de la Vista ---
const brands = ref<Brand[]>([
  {
    id: "1",
    name: "Empresa A",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
    socials: {
      facebook: "empresa-a",
      instagram: "empresaa",
    },
    emailDomain: "empresaa.com"
  }
]);

// --- Lógica del Modal y Formulario ---
const modalStore = useModalStore();
const modalId = 'add-brand-modal';

// VeeValidate se encarga del estado del formulario
const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    name: "",
    logo: "",
    emailDomain: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  }
});

// La función que se ejecuta al enviar el formulario del modal
const handleAddBrand = handleSubmit(async (values) => {
  if (!values.name) {
    // Aquí podrías usar tu sistema de notificaciones
    alert("El nombre de la marca es requerido");
    return;
  }

  const newBrand: Brand = {
    id: Date.now().toString(),
    name: values.name,
    logo: values.logo || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
    socials: {
      facebook: values.facebook,
      instagram: values.instagram,
      twitter: values.twitter,
      linkedin: values.linkedin,
    },
    emailDomain: values.emailDomain
  };

  brands.value.push(newBrand);
  modalStore.close(modalId);
  resetForm();
  // Aquí podrías mostrar una notificación de éxito
  alert("Marca agregada exitosamente");
});

const openModal = () => {
  modalStore.open(modalId, { title: 'Agregar Nueva Marca' });
};
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Gestión de Marcas</h1>
        <p class="text-gray-500 mt-2">
          Configura y administra las marcas que gestionarás en el módulo de Marketing
        </p>
      </div>
      <button class="btn btn-primary" @click="openModal">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Marca
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="brand in brands" :key="brand.id" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-4">
            <img :src="brand.logo" :alt="brand.name" class="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h2 class="card-title">{{ brand.name }}</h2>
              <p v-if="brand.emailDomain" class="flex items-center gap-1 mt-1 text-sm text-gray-500">
                <Mail class="h-3 w-3" />
                {{ brand.emailDomain }}
              </p>
            </div>
          </div>
          <div class="divider my-2"></div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Redes Sociales Conectadas:</p>
            <div class="flex flex-wrap gap-2">
              <div v-if="brand.socials.facebook" class="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded">
                <Facebook class="h-3 w-3" />
                {{ brand.socials.facebook }}
              </div>
              <div v-if="brand.socials.instagram" class="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded">
                <Instagram class="h-3 w-3" />
                {{ brand.socials.instagram }}
              </div>
              <div v-if="brand.socials.twitter" class="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded">
                <Twitter class="h-3 w-3" />
                {{ brand.socials.twitter }}
              </div>
              <div v-if="brand.socials.linkedin" class="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded">
                <Linkedin class="h-3 w-3" />
                {{ brand.socials.linkedin }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseModal
    :modal-id="modalId"
    :is-submitting="isSubmitting"
    :on-submit="handleAddBrand"
    @on-close="resetForm"
  >
    <template #modalBody>
      <div class="space-y-4">
        <BaseFormInput name="name" label="Nombre de la Marca *" placeholder="Ej: Mi Empresa" />
        <BaseFormInput name="logo" label="URL del Logotipo" placeholder="https://ejemplo.com/logo.png" />
        <BaseFormInput name="emailDomain" label="Dominio de E-mail" placeholder="miempresa.com" />

        <div class="border-t pt-4">
          <h4 class="font-semibold mb-3">Redes Sociales</h4>
          <div class="grid grid-cols-2 gap-4">
            <BaseFormInput name="facebook" label="Facebook" placeholder="usuario" />
            <BaseFormInput name="instagram" label="Instagram" placeholder="@usuario" />
            <BaseFormInput name="twitter" label="Twitter/X" placeholder="@usuario" />
            <BaseFormInput name="linkedin" label="LinkedIn" placeholder="company/usuario" />
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
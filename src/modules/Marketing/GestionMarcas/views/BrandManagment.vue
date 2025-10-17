<script setup lang="ts">
import { 
  createBrandService, 
  generateConnectionLinkService,
  // ... importa las otras si las necesitas aquí
} from '../services/brandServices';
import { ref, onMounted } from 'vue'; // MODIFICADO: Añadido onMounted
import { useForm } from 'vee-validate';
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import { useModalStore } from '@/shared/stores/modal.store';
import { Plus, Link, Mail } from 'lucide-vue-next'; // MODIFICADO: Icono de enlace
// NUEVO: Importa los iconos de redes sociales que usarás dinámicamente
import FacebookIcon from '@/assets/icons/icons8-facebook.svg';
import InstagramIcon from '@/assets/icons/icons8-instagram.svg';
import TwitterIcon from '@/assets/icons/icons8-x.svg';
import LinkedinIcon from '@/assets/icons/icons8-linkedin.svg';
import YoutubeIcon from '@/assets/icons/icons8-youtube.svg';
import TiktokIcon from '@/assets/icons/icons8-tiktok.svg';

// --- Tipos de Datos (MODIFICADOS para reflejar la API de Ayrshare) ---

// NUEVO: Define la estructura de una cuenta social conectada
interface SocialAccount {
  platform: string; // 'facebook', 'instagram', etc.
  username: string;
  profileImage?: string; // La imagen de perfil de la red social
}

interface Brand {
  id: string; // El ID de tu base de datos
  name: string;
  logo: string;
  // MODIFICADO: 'socials' ahora es un array de objetos
  socials: SocialAccount[];
  emailDomain?: string;
  // NUEVO: El campo más importante para la conexión con Ayrshare
  ayrshareProfileKey?: string | null;
}

// --- Estado de la Vista ---
const brands = ref<Brand[]>([]);
const isLoading = ref(true);

// --- Lógica de la API (Simulada) ---

// NUEVO: Simula la carga inicial de marcas desde tu backend
const fetchBrands = async () => {
  isLoading.value = true;
  // En una aplicación real, aquí harías una llamada a tu API:
  // const response = await axios.get('/api/marcas');
  // brands.value = response.data;
  
  // Datos de ejemplo simulando una llamada a la API
  brands.value = [
    {
      id: "1",
      name: "Empresa A",
      logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop",
      socials: [
        { platform: 'facebook', username: 'empresa-a', profileImage: '...' },
        { platform: 'instagram', username: 'empresaa', profileImage: '...' }
      ],
      emailDomain: "empresaa.com",
      ayrshareProfileKey: "a1b2-c3d4-e5f6" // Este es el ID de Ayrshare
    },
    {
      id: "2",
      name: "Empresa B (Sin redes)",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      socials: [], // Esta marca aún no ha conectado nada
      emailDomain: "empresab.com",
      ayrshareProfileKey: "g7h8-i9j0-k1l2"
    }
  ];
  isLoading.value = false;
};

// Se ejecuta cuando el componente se monta en la página
onMounted(() => {
  fetchBrands();
});


// --- Lógica del Modal y Formulario ---
const modalStore = useModalStore();
const modalId = 'add-brand-modal';

// MODIFICADO: El formulario ahora es mucho más simple
const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    name: "",
    logo: "",
    emailDomain: "",
  }
});

// MODIFICADO: La función para agregar una marca ahora solo crea la marca
const handleAddBrand = handleSubmit(async (values) => {
  const result = await createBrandService({
    name: values.name,
    logo: values.logo,
    emailDomain: values.emailDomain
  });

  if (result.success && result.data) {
    brands.value.push(result.data);
    modalStore.close(modalId);
    resetForm();
    alert(result.message);
  } else {
    alert(result.message);
  }
});

// NUEVO: Función para iniciar la conexión de redes sociales
// Ejemplo de cómo usar el servicio para conectar redes
const handleConnectSocials = async (brand: Brand) => {
  const result = await generateConnectionLinkService(brand.id);

  if (result.success && result.data) {
    window.location.href = result.data.url;
  } else {
    alert(result.message);
  }
};

const openModal = () => {
  modalStore.open(modalId, { title: 'Agregar Nueva Marca' });
};

// NUEVO: Objeto para mapear nombres de plataforma a componentes de íconos
const socialIcons: Record<string, any> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
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

    <div v-if="isLoading">Cargando marcas...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="brand in brands" :key="brand.id" class="card bg-base-100 shadow-xl flex flex-col">
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

          <div class="space-y-3">
            <p class="text-sm font-medium">Redes Sociales Conectadas:</p>
            <div v-if="brand.socials.length > 0" class="flex flex-wrap gap-2">
              <div v-for="social in brand.socials" :key="social.platform" class="flex items-center gap-1.5 text-xs bg-base-200 px-2 py-1 rounded">
                <component :is="socialIcons[social.platform]" class="h-3.5 w-3.5" />
                <span>{{ social.username }}</span>
              </div>
            </div>
            <p v-else class="text-xs text-gray-400">
              No hay redes sociales conectadas.
            </p>
          </div>
        </div>

        <div class="card-actions justify-end p-4 mt-auto border-t border-base-200">
          <button class="btn btn-ghost btn-sm" @click="handleConnectSocials(brand)">
            <Link class="h-4 w-4 mr-1" />
            Conectar / Gestionar Redes
          </button>
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
        <p class="text-sm text-gray-500">
          Crea una nueva marca. Podrás conectar sus redes sociales en el siguiente paso.
        </p>
        <BaseFormInput name="name" label="Nombre de la Marca *" placeholder="Ej: Mi Empresa" />
        <BaseFormInput name="logo" label="URL del Logotipo" placeholder="https://ejemplo.com/logo.png" />
        <BaseFormInput name="emailDomain" label="Dominio de E-mail" placeholder="miempresa.com" />
      </div>
    </template>
  </BaseModal>
</template>
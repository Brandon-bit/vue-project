<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
// Importa los componentes base que ya tienes
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseTextArea from '@/shared/components/BaseTextArea.vue';
// Importa tu store de modales
import { useModalStore } from '@/shared/stores/modal.store';
// Importa los iconos
import { Plus, Target, Calendar, DollarSign } from 'lucide-vue-next';
import BaseTitle from '@/shared/components/BaseTitle.vue';

// --- Tipos de Datos (Definidos aquí para la simulación) ---
type CampaignStatus = "planning" | "active" | "completed";

interface Campaign {
  id: string;
  name: string;
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
}

// --- Estado de la Vista ---
const campaigns = ref<Campaign[]>([
  {
    id: "1",
    name: "Lanzamiento Producto X",
    objective: "Generar 1000 leads calificados",
    budget: 50000,
    startDate: "2025-02-01",
    endDate: "2025-03-31",
    status: "planning",
  },
]);

// --- Lógica del Modal y Formulario ---
const modalStore = useModalStore();
const modalId = 'add-campaign-modal';

// VeeValidate se encarga del estado del formulario
const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    name: "",
    objective: "",
    budget: 0,
    startDate: "",
    endDate: "",
  }
});

// La función que se ejecuta al enviar el formulario del modal
const handleCreateCampaign = handleSubmit(async (values) => {
  if (!values.name || !values.objective) {
    alert("Nombre y objetivo son requeridos");
    return;
  }

  const newCampaign: Campaign = {
    id: Date.now().toString(),
    name: values.name,
    objective: values.objective,
    budget: Number(values.budget) || 0,
    startDate: values.startDate,
    endDate: values.endDate,
    status: "planning",
  };

  campaigns.value.push(newCampaign);
  modalStore.close(modalId);
  resetForm();
  alert("Campaña creada exitosamente");
});

const openModal = () => {
  modalStore.open(modalId, { title: 'Crear Nueva Campaña' });
};

// --- Lógica para Estilos y Datos Computados ---
const getStatusProps = (status: CampaignStatus) => {
  switch (status) {
    case 'planning':
      return { label: 'En Planeación', class: 'badge-warning' };
    case 'active':
      return { label: 'Activa', class: 'badge-success' };
    case 'completed':
      return { label: 'Completada', class: 'badge-info' };
    default:
      return { label: '', class: '' };
  }
};

const activeCampaigns = computed(() => campaigns.value.filter((c) => c.status === "active").length);
const planningCampaigns = computed(() => campaigns.value.filter((c) => c.status === "planning").length);
const totalBudget = computed(() => campaigns.value.reduce((sum, c) => sum + c.budget, 0));
</script>

<template>
  <div class="">
    <BaseTitle title="Estrategia de Campañas" subtitle="Planifica y gestiona tus campañas de marketing estratégicas" />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openModal">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Campaña
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title text-sm font-medium">Campañas Activas</h3>
            <Target class="h-4 w-4 text-gray-400" />
          </div>
          <p class="text-2xl font-bold mt-2">{{ activeCampaigns }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title text-sm font-medium">En Planeación</h3>
            <Calendar class="h-4 w-4 text-gray-400" />
          </div>
          <p class="text-2xl font-bold mt-2">{{ planningCampaigns }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <h3 class="card-title text-sm font-medium">Presupuesto Total</h3>
            <DollarSign class="h-4 w-4 text-gray-400" />
          </div>
          <p class="text-2xl font-bold mt-2">${{ totalBudget.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow hover:shadow-md transition-shadow">
      <div class="card-body">
        <h2 class="card-title">Campañas</h2>
        <p class="text-sm text-gray-500">Vista general de todas tus campañas</p>
        <div class="space-y-4 mt-4">
          <div v-for="campaign in campaigns" :key="campaign.id" class="card card-compact bg-base-100 shadow hover:shadow-md transition-shadow">
            <div class="card-body bg-base-100 shadow hover:shadow-md transition-shadow rounded-2xl p-4">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-semibold text-lg">{{ campaign.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ campaign.objective }}</p>
                </div>
                <span class="badge" :class="getStatusProps(campaign.status).class">
                  {{ getStatusProps(campaign.status).label }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-4 pt-4 border-t">
                <div class="flex items-center gap-2">
                  <DollarSign class="h-4 w-4 text-gray-400" />
                  <div>
                    <p class="text-xs text-gray-500">Presupuesto</p>
                    <p class="font-semibold">${{ campaign.budget.toLocaleString() }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4 text-gray-400" />
                  <div>
                    <p class="text-xs text-gray-500">Inicio</p>
                    <p class="font-semibold">{{ campaign.startDate }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4 text-gray-400" />
                  <div>
                    <p class="text-xs text-gray-500">Fin</p>
                    <p class="font-semibold">{{ campaign.endDate }}</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mt-4">
                <button class="btn btn-sm btn-outline">Ver Detalle</button>
                <button class="btn btn-sm btn-outline">Cronograma</button>
                <button class="btn btn-sm btn-outline">Ir a Proyecto</button>
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
    :on-submit="handleCreateCampaign"
    @on-close="resetForm"
  >
    <template #modalBody>
      <div class="space-y-4">
        <BaseFormInput name="name" label="Nombre de la Campaña *" placeholder="Ej: Lanzamiento Producto X" />
        <BaseTextArea name="objective" label="Objetivo Principal *" placeholder="Describe el objetivo principal..." />
        <BaseFormInput name="budget" label="Presupuesto (MXN)" type="number" placeholder="50000" />
        <div class="grid grid-cols-2 gap-4">
          <BaseFormInput name="startDate" label="Fecha de Inicio" type="date" />
          <BaseFormInput name="endDate" label="Fecha de Fin" type="date" />
        </div>
      </div>
    </template>
  </BaseModal>
</template>
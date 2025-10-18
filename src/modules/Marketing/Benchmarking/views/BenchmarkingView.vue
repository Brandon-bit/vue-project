<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
// Importa los componentes base que ya tienes
import BaseModal from '@/shared/components/BaseModal.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';
import BaseTextArea from '@/shared/components/BaseTextArea.vue';
// Importa tu store de modales
import { useModalStore } from '@/shared/stores/modal.store';
// Importa los iconos
import { Plus, BarChart3, FileText, Link as LinkIcon } from 'lucide-vue-next';
import BaseTitle from '@/shared/components/BaseTitle.vue';

// --- Tipos de Datos (Definidos aquí para la simulación) ---
type SurveyStatus = "draft" | "active" | "closed";
type SurveyType = "benchmarking" | "mystery";

interface Survey {
  id: string;
  title: string;
  description: string;
  type: SurveyType;
  responses: number;
  status: SurveyStatus;
  createdAt: Date;
}

// --- Estado de la Vista ---
const surveys = ref<Survey[]>([
  {
    id: "1",
    title: "Análisis de Competencia Q1 2025",
    description: "Evaluación de precios y servicios de competidores directos",
    type: "benchmarking",
    responses: 24,
    status: "active",
    createdAt: new Date("2025-01-15"),
  },
]);

// --- Lógica del Modal y Formulario ---
const modalStore = useModalStore();
const modalId = 'add-survey-modal';

// VeeValidate se encarga del estado del formulario
const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    title: "",
    description: "",
    type: "benchmarking",
  }
});

// La función que se ejecuta al enviar el formulario del modal
const handleCreateSurvey = handleSubmit(async (values) => {
  if (!values.title) {
    alert("El título es requerido");
    return;
  }

  const newSurvey: Survey = {
    id: Date.now().toString(),
    title: values.title,
    description: values.description,
    type: values.type as SurveyType,
    responses: 0,
    status: "draft",
    createdAt: new Date(),
  };

  surveys.value.push(newSurvey);
  modalStore.close(modalId);
  resetForm();
  alert("Estudio creado exitosamente");
});

const openModal = () => {
  modalStore.open(modalId, { title: 'Crear Nuevo Estudio' });
};

// --- Lógica para Estilos y Etiquetas ---
const getStatusProps = (status: SurveyStatus) => {
  switch (status) {
    case 'draft':
      return { label: 'Borrador', class: 'badge-ghost' };
    case 'active':
      return { label: 'Activo', class: 'badge-success' };
    case 'closed':
      return { label: 'Cerrado', class: 'badge-info' };
    default:
      return { label: '', class: '' };
  }
};
</script>

<template>
  <div class="">
    <BaseTitle title="Benchmarking & Mystery Shopper" subtitle="Crea estudios de mercado y análisis de competencia" />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openModal">
        <Plus class="mr-2 h-4 w-4" />
        Nuevo Estudio
      </button>
    </div>

    <div v-if="surveys.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="survey in surveys" :key="survey.id" class="card bg-base-100 shadow-xl hover:shadow-lg transition-shadow">
        <div class="card-body">
          <div class="flex justify-between items-start">
            <div class="space-y-1 flex-1 pr-4">
              <h2 class="card-title line-clamp-2">{{ survey.title }}</h2>
              <p class="text-sm text-gray-500 line-clamp-2">{{ survey.description }}</p>
            </div>
            <span class="badge" :class="getStatusProps(survey.status).class">
              {{ getStatusProps(survey.status).label }}
            </span>
          </div>
          <div class="divider my-2"></div>
          <div class="space-y-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Respuestas:</span>
              <span class="font-semibold">{{ survey.responses }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Tipo:</span>
              <span class="font-medium capitalize">{{ survey.type }}</span>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-outline btn-sm flex-1">
                <FileText class="mr-2 h-4 w-4" />
                Editar
              </button>
              <button v-if="survey.status === 'active'" class="btn btn-outline btn-sm flex-1">
                <LinkIcon class="mr-2 h-4 w-4" />
                Compartir
              </button>
              <button v-if="survey.responses > 0" class="btn btn-outline btn-sm flex-1">
                <BarChart3 class="mr-2 h-4 w-4" />
                Resultados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="surveys.length === 0" class="card bg-base-100">
      <div class="card-body flex flex-col items-center justify-center py-12">
        <BarChart3 class="h-12 w-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-semibold mb-2">No hay estudios creados</h3>
        <p class="text-gray-500 text-center mb-4">
          Crea tu primer estudio de Benchmarking o Mystery Shopper
        </p>
        <button class="btn btn-primary" @click="openModal">
          <Plus class="mr-2 h-4 w-4" />
          Crear Primer Estudio
        </button>
      </div>
    </div>
  </div>

  <BaseModal
    :modal-id="modalId"
    :is-submitting="isSubmitting"
    :on-submit="handleCreateSurvey"
    @on-close="resetForm"
  >
    <template #modalBody>
      <div class="space-y-4">
        <BaseFormSelect
          name="type"
          label="Tipo de Estudio"
          :options="[
            { id: 'benchmarking', label: 'Benchmarking' },
            { id: 'mystery', label: 'Mystery Shopper' }
          ]"
        />
        <BaseFormInput name="title" label="Título del Estudio *" placeholder="Ej: Análisis de Competencia Q1" />
        <BaseTextArea name="description" label="Descripción" placeholder="Describe el objetivo de este estudio..." />
      </div>
    </template>
  </BaseModal>
</template>
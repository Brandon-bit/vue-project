<script setup lang="ts">
import { ref, computed } from 'vue';
// Importa los iconos
import { Plus, Mail, Users, BarChart, Send } from 'lucide-vue-next';
import BaseTitle from '@/shared/components/BaseTitle.vue';
// --- Tipos de Datos (Definidos aquí para la simulación) ---
interface Campaign {
  id: string;
  name: string;
  subject: string;
  sent: number;
  opened: number;
  clicked: number;
  status: "sent";
}

interface AudienceList {
  id: string;
  name: string;
  subscribers: number;
  active: number;
}

// --- Estado de la Vista ---
const campaigns = ref<Campaign[]>([
  {
    id: "1",
    name: "Newsletter Enero 2025",
    subject: "Novedades del mes",
    sent: 1250,
    opened: 875,
    clicked: 234,
    status: "sent",
  },
]);

const lists = ref<AudienceList[]>([
  {
    id: "1",
    name: "Clientes VIP",
    subscribers: 450,
    active: 432,
  },
  {
    id: "2",
    name: "Leads 2025",
    subscribers: 1200,
    active: 1156,
  },
]);

// --- Lógica para las Pestañas (Tabs) ---
const activeTab = ref('campaigns'); // 'campaigns', 'lists', 'templates'

// --- Lógica para los Datos Computados de las Tarjetas ---
const totalSubscribers = computed(() => lists.value.reduce((sum, list) => sum + list.subscribers, 0));
const totalSent = computed(() => campaigns.value.reduce((sum, c) => sum + c.sent, 0));
const totalOpened = computed(() => campaigns.value.reduce((sum, c) => sum + c.opened, 0));
const totalClicked = computed(() => campaigns.value.reduce((sum, c) => sum + c.clicked, 0));

const openRate = computed(() => {
  if (totalSent.value === 0) return '0.0%';
  return ((totalOpened.value / totalSent.value) * 100).toFixed(1) + '%';
});

const clickThroughRate = computed(() => {
  if (totalOpened.value === 0) return '0.0%';
  return ((totalClicked.value / totalOpened.value) * 100).toFixed(1) + '%';
});
</script>

<template>
  <div class="">
    <!-- Encabezado de la Página -->
    <BaseTitle title="E-mailing" subtitle="Gestiona campañas de email marketing y audiencias" />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Campaña
      </button>
    </div>

    <!-- Cards de Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Campañas Enviadas</h3><Send class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ campaigns.length }}</p><p class="text-xs text-gray-500">Este mes</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Tasa de Apertura</h3><Mail class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ openRate }}</p><p class="text-xs text-green-600">+5% vs mes anterior</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Click-Through Rate</h3><BarChart class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ clickThroughRate }}</p><p class="text-xs text-green-600">+2.1% vs mes anterior</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Suscriptores Totales</h3><Users class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ totalSubscribers.toLocaleString() }}</p><p class="text-xs text-gray-500">En todas las listas</p>
        </div>
      </div>
    </div>

    <!-- Sistema de Pestañas (Tabs) -->
    <div>
      <div role="tablist" class="tabs tabs-boxed">
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'campaigns'}" @click="activeTab = 'campaigns'">Campañas</a>
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'lists'}" @click="activeTab = 'lists'">Listas de Audiencias</a>
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'templates'}" @click="activeTab = 'templates'">Plantillas</a>
      </div>

      <div class="mt-4">
        <!-- Contenido de la Pestaña "Campañas" -->
        <div v-if="activeTab === 'campaigns'" class="space-y-4">
          <div class="card bg-white shadow-xl">
            <div class="card-body bg-white shadow hover:shadow-md transition-shadow">
              <h2 class="card-title">Campañas Recientes</h2>
              <p class="text-sm text-gray-500">Historial de tus campañas de email marketing</p>
              <div class="space-y-4 mt-4">
                <div v-for="campaign in campaigns" :key="campaign.id" class="card bg-base-100 shadow hover:shadow-md transition-shadow">
                  <div class="card-body">
                    <div class="flex justify-between items-start"><div class="space-y-1"><h3 class="font-semibold">{{ campaign.name }}</h3><p class="text-sm text-gray-500">{{ campaign.subject }}</p></div><span class="badge badge-success">Enviada</span></div>
                    <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div><p class="text-xs text-gray-500">Enviados</p><p class="text-lg font-semibold">{{ campaign.sent }}</p></div>
                      <div><p class="text-xs text-gray-500">Aperturas</p><p class="text-lg font-semibold">{{ campaign.opened }}</p><p class="text-xs text-green-600">{{ ((campaign.opened / campaign.sent) * 100).toFixed(1) }}%</p></div>
                      <div><p class="text-xs text-gray-500">Clics</p><p class="text-lg font-semibold">{{ campaign.clicked }}</p><p class="text-xs text-green-600">{{ ((campaign.clicked / campaign.sent) * 100).toFixed(1) }}%</p></div>
                    </div>
                    <div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-outline">Ver Reporte</button><button class="btn btn-sm btn-outline">Duplicar</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido de la Pestaña "Listas de Audiencias" -->
        <div v-if="activeTab === 'lists'" class="space-y-4">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex justify-between items-center"><h2 class="card-title">Listas de Audiencias</h2><button class="btn btn-sm btn-primary"><Plus class="mr-2 h-4 w-4" /> Nueva Lista</button></div>
              <div class="space-y-4 mt-4">
                <div v-for="list in lists" :key="list.id" class="card card-compact bg-base-200">
                  <div class="card-body"><div class="flex justify-between items-start"><div class="space-y-1"><h3 class="font-semibold">{{ list.name }}</h3><p class="text-sm text-gray-500">{{ list.subscribers }} suscriptores</p></div><span class="badge badge-success">{{ list.active }} activos</span></div><div class="card-actions justify-end mt-4"><button class="btn btn-sm btn-outline">Ver Contactos</button><button class="btn btn-sm btn-outline">Importar</button></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contenido de la Pestaña "Plantillas" -->
        <div v-if="activeTab === 'templates'">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex justify-between items-center"><h2 class="card-title">Plantillas de Email</h2><button class="btn btn-sm btn-primary"><Plus class="mr-2 h-4 w-4" /> Nueva Plantilla</button></div>
              <div class="text-center py-12 text-gray-500"><Mail class="h-12 w-12 mx-auto mb-4 opacity-50" /><p class="font-semibold">No hay plantillas creadas aún</p><p class="text-sm mt-2">Crea tu primera plantilla para empezar</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import BaseCard from '@/shared/components/BaseCard.vue';
import DonutChart from '../components/charts/donutChart.vue';
import LineChart from '../components/charts/lineChart.vue';
import { getMarketingData, getBrands } from '../services/marketingServices';
import type { Brand } from '../types/marketingTypes'; // Asegúrate que la importación del tipo Brand sea correcta

// --- ESTADO ---
const brands = ref<Brand[]>([]);
const selectedBrandId = ref<string | null>(null);

// MODIFICADO: Ahora tenemos dos estados de carga independientes
const isLoadingBrands = ref(true); // Para el selector de marcas
const isLoadingData = ref(false);  // Para las gráficas y tarjetas de datos

// --- Estado para las gráficas (sin cambios) ---
const revenueSeries = ref<number[]>([]);
const revenueLabels = ref<string[]>([]);
const salesSeries = ref<any[]>([]);
const salesCategories = ref<string[]>([]);

// --- Propiedad computada (sin cambios) ---
const selectedBrand = computed(() => {
  return brands.value.find(brand => brand.id === selectedBrandId.value);
});

// --- Lógica de Carga de Datos (sin cambios, pero ahora usa isLoadingData) ---
const fetchDashboardData = async (brandId: string) => {
  if (!brandId) return;

  isLoadingData.value = true;
  try {
    const cleanMarketingData = await getMarketingData(brandId);

    revenueSeries.value = cleanMarketingData.revenue.map(item => item.value);
    revenueLabels.value = cleanMarketingData.revenue.map(item => item.label);
    
    const salesValues = cleanMarketingData.sales.map(item => item.value);
    const expensesValues = cleanMarketingData.expenses.map(item => item.value);
    salesSeries.value = [
      { name: 'Ventas', data: salesValues },
      { name: 'Gastos', data: expensesValues }
    ];
    salesCategories.value = cleanMarketingData.sales.map(item => item.label);

  } catch (error) {
    console.error("Error al cargar los datos del dashboard:", error);
  } finally {
    isLoadingData.value = false;
  }
};

// --- Watcher (sin cambios) ---
watch(selectedBrandId, (newBrandId) => {
  if (newBrandId) {
    fetchDashboardData(newBrandId);
  }
});

// --- Carga Inicial (onMounted, sin cambios) ---
onMounted(async () => {
  isLoadingBrands.value = true;
  try {
    brands.value = await getBrands();
    if (brands.value.length > 0) {
      selectedBrandId.value = brands.value[0].id;
    }
  } catch (error) {
    console.error("Error al cargar las marcas:", error);
  } finally {
    isLoadingBrands.value = false;
  }
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold">
          {{ selectedBrand?.name || 'Marketing' }} Dashboard
        </h1>
        <p class="text-muted-foreground mt-2">
          Monitorea el rendimiento de todas tus iniciativas de marketing.
        </p>
      </div>

      <div class="w-full sm:w-64">
        <div v-if="isLoadingBrands" class="text-sm text-gray-500">
          Cargando marcas...
        </div>
        <select
          v-else-if="brands.length > 0"
          id="brand-selector"
          v-model="selectedBrandId"
          class="select select-bordered w-full"
        >
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
        <div v-else class="text-sm text-gray-500">
          No se encontraron marcas.
        </div>
      </div>
    </div>
  </div>

  <div v-if="selectedBrandId">
    <div v-if="isLoadingData" class="p-6 text-center text-gray-500">
      <span class="loading loading-spinner loading-lg"></span>
      <p>Cargando datos para {{ selectedBrand?.name }}...</p>
    </div>
    
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <BaseCard :number="42" title="Usuarios Activos" subtitle="+12.5% vs mes anterior" icon="group" />
        <BaseCard :number="1200" title="Nuevos Leads" subtitle="+5% vs semana anterior" icon="person_add" />
        <BaseCard :number="85.2" title="Tasa de Apertura" subtitle="-1.2% vs campaña anterior" icon="mail" />
        <BaseCard :number="42" title="Usuarios Activos" subtitle="+12.5% vs mes anterior" icon="group" />
        <BaseCard :number="1200" title="Nuevos Leads" subtitle="+5% vs semana anterior" icon="person_add" />
        <BaseCard :number="85.2" title="Tasa de Apertura" subtitle="-1.2% vs campaña anterior" icon="mail" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <DonutChart
          title="Ingresos por Producto"
          subtitle="seguidores nuevos por mes"
          :series="revenueSeries"
          :labels="revenueLabels"
        />
        <LineChart
          title="Ventas Mensuales"
          subtitle="Tasas de aperturas y clic semanales"
          :series="salesSeries"
          :categories="salesCategories"
        />
      </div>
    </template>
  </div>
  
  <div v-else-if="!isLoadingBrands" class="p-6 text-center text-gray-400">
    <p>Por favor, selecciona una marca para ver sus datos.</p>
    <p class="text-sm">Si no tienes marcas, puedes crear una en "Gestión de Marcas".</p>
  </div>
</template>
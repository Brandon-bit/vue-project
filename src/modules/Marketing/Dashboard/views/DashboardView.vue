<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseCard from '@/shared/components/BaseCard.vue';
import DonutChart from '../components/charts/donutChart.vue';
import LineChart from '../components/charts/lineChart.vue';
import { getMarketingData } from '../services/marketingServices';

// --- Estado para la gráfica de Donut ---
const revenueSeries = ref<number[]>([]);
const revenueLabels = ref<string[]>([]);

// --- Estado para la gráfica de Líneas ---
const salesSeries = ref<any[]>([]);
const salesCategories = ref<string[]>([]);

const isLoading = ref(true);

onMounted(async () => {
  const cleanMarketingData = await getMarketingData();
  
 // datos para la gráfica de Donut 
  if (cleanMarketingData.revenue) {
    revenueSeries.value = cleanMarketingData.revenue.map(item => item.value);
    revenueLabels.value = cleanMarketingData.revenue.map(item => item.label);
  }

  // datos para la GRÁFICA DE LÍNEAS (esto es lo que cambia)
  if (cleanMarketingData.sales && cleanMarketingData.expenses) {
    // Procesa los valores para la primera línea (Ventas)
    const salesValues = cleanMarketingData.sales.map(item => item.value);
    
    // Procesa los valores para la segunda línea (Gastos)
    const expensesValues = cleanMarketingData.expenses.map(item => item.value);

    salesSeries.value = [
      { 
        name: 'Ventas', 
        data: salesValues 
      },
      { 
        name: 'Gastos', 
        data: expensesValues 
      }
    ];
    
    // Las categorías (meses) son las mismas, solo las tomamos una vez
    salesCategories.value = cleanMarketingData.sales.map(item => item.label);
  }

  isLoading.value = false;
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-3xl font-bold">Dashboard de Marketing</h1>
      <p class="text-muted-foreground mt-2">
        Monitorea el rendimiento de todas tus iniciativas de marketing
      </p>
    </div>
  </div>

  <!-- Falta cards que muestren datos importantes de marketing -->

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <BaseCard :number="42" title="Usuarios Activos" subtitle="+12.5% vs mes anterior" icon="group" />
    <BaseCard :number="1200" title="Nuevos Leads" subtitle="+5% vs semana anterior" icon="person_add" />
    <BaseCard :number="85.2" title="Tasa de Apertura" subtitle="-1.2% vs campaña anterior" icon="mail" />
    <BaseCard :number="42" title="Usuarios Activos" subtitle="+12.5% vs mes anterior" icon="group" />
    <BaseCard :number="1200" title="Nuevos Leads" subtitle="+5% vs semana anterior" icon="person_add" />
    <BaseCard :number="85.2" title="Tasa de Apertura" subtitle="-1.2% vs campaña anterior" icon="mail" />
  </div>

  <div v-if="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    
    <DonutChart
    subtitle="seguidores nuevos por mes"
      title="Ingresos por Producto"
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
  <div v-else class="p-6 text-center text-gray-500">
    Cargando gráficas...
  </div>
</template>
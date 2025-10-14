<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";

// Define las props que el componente recibirá desde afuera.
const props = defineProps<{
  title: string;
  subtitle?: string;
  series: number[]; // El arreglo de datos numéricos.
  labels: string[]; // El arreglo de etiquetas.
}>();

// Usamos 'computed' para que las opciones reaccionen a los cambios en las props.
const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 300,
    fontFamily: 'inherit',
  },
  labels: props.labels,
  colors: ['#3b82f6', '#ec4899', '#333', '#10b981', '#f59e0b'],
  legend: {
    position: 'bottom'
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: '100%'
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}));
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-6">
    <h2 class="text-xl md:text-base font-bold">{{ props.title }}</h2>
    <p class="text-sm md:text-base">{{ props.subtitle }}</p>
    <VueApexCharts
      type="donut"
      height="300"
      :options="chartOptions"
      :series="props.series"
    />
  </div>
</template>
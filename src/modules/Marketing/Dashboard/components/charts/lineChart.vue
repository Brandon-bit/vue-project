<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";

const props = defineProps<{
  title: string;
  subtitle?: string;
  series: any[]; // ApexCharts espera un formato como [{ name: 'Visitas', data: [10, 20] }]
  categories: string[]; // Etiquetas del eje X
}>();

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 300,
    fontFamily: 'inherit',
    toolbar: { show: false }
  },
  xaxis: {
    categories: props.categories
  },
  stroke: {
    curve: 'smooth'
  },
  colors: ['#10b981'], // Verde
}));
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-6">
     <h2 class="text-xl md:text-base font-bold">{{ props.title }}</h2>
    <p class="text-sm md:text-base">{{ props.subtitle }}</p>
    <VueApexCharts
      type="line"
      height="300"
      :options="chartOptions"
      :series="props.series"
    />
  </div>
</template>
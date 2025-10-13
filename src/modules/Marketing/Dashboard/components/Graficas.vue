<script setup lang="ts">
import ApexCharts from "vue3-apexcharts";
import { defineProps } from "vue";

defineProps({
  type: { type: String, required: true },
  series: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  height: { type: Number, default: 350 }
});
</script>

<template>
  <div class="card p-4 rounded-lg shadow-md bg-white w-full">
    <apexchart
      :type="type"
      :height="height"
      :series="series"
      :options="options"
    />
  </div>
</template>
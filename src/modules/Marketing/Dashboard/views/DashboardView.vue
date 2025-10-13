<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from "vue3-apexcharts";
import BaseCard from '@/shared/components/BaseCard.vue'





</script>

<template>
      <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard de Marketing</h1>
              <p className="text-muted-foreground mt-2">
                Monitorea el rendimiento de todas tus iniciativas de marketing
              </p>
            </div>
    </div>
    
    <div class="flex justify-center-safe  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <BaseCard
           :number="42"
                title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
        <BaseCard
           :number="42"
             title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
        <BaseCard
           :number="42"
             title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
        <BaseCard
           :number="42"
             title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
        <BaseCard
           :number="42"
             title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
        <BaseCard
           :number="42"
             title="Usuarios Activos"
           subtitle="+12.5% vs mes anterior"
           iconSubtitle="trending_up"
           icon="group"
           bgColor="color-base-200 text-primary-content"
         />
    </div>
    
    
    
    
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <div class="w-full p-6 space-y-6">
            <h1 className="text-3xl font-bold">Crecimiento en redes sociales</h1>
              <p className="text-muted-foreground mt-2">
               Seguidores nuevos por mes
              </p>


            <VueApexCharts
                type="donut"
                height="300"
                :options="faceBookData"
                :series="faceBookSeries"
            />
        </div>
        <div class="w-full p-6 space-y-6">
             <h1 className="text-3xl font-bold">Rendimiento de E-mailing</h1>
              <p className="text-muted-foreground mt-2">
                Tasa de apertura y clics
              </p>

            <VueApexCharts
                type="donut"
                height="300"
                :options="faceBookData"
                :series="faceBookSeries"
            />
        </div>

   </div>


</template>

<template>
    <BaseTitle title="Dashboard" subtitle="Accede a tus paneles de control"/>

    <div class="dashboards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between">
      <router-link :to="dashboard.url" v-for="dashboard in inSessionStore.dashboards">
        <div class="card justify-center items-center w-full py-5 shadow-2xl bg-gray-500 group hover:cursor-pointer">
          <figure class="flex items-center transition-transform duration-300 group-hover:scale-105">
            <span class="material-symbols-outlined text-white" style="font-size: 100px;">
                {{ dashboard.icon }}
            </span>
          </figure>
          <div class="py-0 transition-transform duration-300 group-hover:scale-105 text-white">
            <h3 class="text-2xl text-center mb-2">{{dashboard.name}}</h3>
            <div class="flex justify-center">
              <p class="text-center items-center">Ir al dashboard</p>
              <span class="material-symbols-outlined">
                arrow_right_alt
              </span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script setup lang="ts">
import useInSessionStore from "@core/InSessionLayout/store/inSessionStore";
import BaseTitle from "@/shared/components/BaseTitle.vue";
import { onMounted, ref } from "vue";
import { useInSessionActions } from "@core/InSessionLayout/composables/useInSessionActions";

const inSessionStore = useInSessionStore()

//const isLoading = ref<boolean>(true)

// onMounted(async () => {
//     isLoading.value = true
//     await useInSessionActions().getDashboards()
//     isLoading.value = false
// })

</script>

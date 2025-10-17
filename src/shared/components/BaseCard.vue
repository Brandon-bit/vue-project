<script setup lang="ts">

import { Component } from "vue";



const props = defineProps<{
    number?: number
    title?: string
    subtitle?: string
    class?: string
    style?: string
    icon?: string;
    iconSubtitle?: string;
    bgColor?: string;
    className?: string;
}>()




</script>

<template>
  <div
    :class="[
      'card relative flex flex-col justify-between p-4 rounded-[18px] shadow-md w-full max-w-[600px] ',
      'sm:max-w-[600px] md:max-w-[600px] lg:max-w-[400px] transition-all duration-300 hover:scale-[1.03]',
      'hover:shadow-lg',

      bgColor || 'bg-base-100',
      className,
    ]"
  >
    <!-- Ícono (Material Symbols) -->
    <span
      v-if="icon"
      class="material-symbols-outlined absolute top-3 right-3 text-gray-600 text-[20px]"
    >
      {{ icon }}
    </span>

    <!-- Contenido principal -->
    <div class="flex flex-col">
            <span v-if="title" class="text-sm md:text-base font-extrabold text-black mb-3">
                {{ title }}
            </span>
                <span class="text-2x1 md:text-3xl font-bold text-gray-800 mb-3">
                    {{ number }}
                </span>      
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-green-500 text-xl">
                            {{ iconSubtitle }}
                        </span>
                            <span class="text-xs md:text-sm text-green-600">
                                {{ subtitle }}
                            </span>
                    </div>
    </div>
</div>

</template>
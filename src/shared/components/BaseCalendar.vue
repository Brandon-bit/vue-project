<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// --- Importación Local ---
// Se importa el componente 'Calendar' y se le da el alias 'VCalendar' para usarlo en el template.
// También se importan sus estilos base directamente aquí.
import { Calendar as VCalendar } from 'v-calendar'
import 'v-calendar/style.css'

// --- Props y Emits para v-model ---
const props = defineProps<{
  modelValue: Date | null
}>()

const emit = defineEmits(['update:modelValue'])

// Propiedad computada para manejar v-model
const date = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <VCalendar
    v-model="date"
    class="custom-calendar"
    borderless
    transparent
  >
    <template #header-left-button>
      <ChevronLeft class="h-6 w-6" />
    </template>
    <template #header-right-button>
      <ChevronRight class="h-6 w-6" />
    </template>
  </VCalendar>
</template>

<style>
/* Estilos Generales del Calendario */
.custom-calendar.vc-container {
  padding: 0.75rem; /* p-3 */
  width: 100%;      /* w-full */
}

/* Encabezado (Mes y Año) */
.custom-calendar .vc-header {
  padding-top: 0.25rem; /* pt-1 */
  margin-bottom: 0.5rem; /* mb-2 */
}
.custom-calendar .vc-title {
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;   /* font-medium */
}

/* Flechas de Navegación */
.custom-calendar .vc-arrow {
  height: 1.75rem;         /* h-7 */
  width: 1.75rem;          /* w-7 */
  background-color: transparent; /* bg-transparent */
  padding: 0;              /* p-0 */
  opacity: 0.5;            /* opacity-50 */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #e5e7eb; /* border (color gris claro) */
  transition: opacity 150ms;
}
.custom-calendar .vc-arrow:hover {
  opacity: 1;              /* hover:opacity-100 */
}

/* Días de la Semana (Lun, Mar, etc.) */
.custom-calendar .vc-weeks {
  width: 100%; /* w-full */
}
.custom-calendar .vc-weekday {
  color: #6b7280;         /* text-gray-500 */
  border-radius: 0.375rem; /* rounded-md */
  width: 2.25rem;          /* w-9 */
  font-weight: 400;        /* font-normal */
  font-size: 0.875rem;     /* text-sm */
}

/* Celda de cada Día */
.custom-calendar .vc-day {
  height: 2.25rem;     /* h-9 */
  width: 2.25rem;      /* w-9 */
  text-align: center;  /* text-center */
  font-size: 0.875rem; /* text-sm */
  padding: 0;          /* p-0 */
}
.custom-calendar .vc-day-content {
  height: 2.25rem;     /* h-9 */
  width: 2.25rem;      /* w-9 */
  padding: 0;          /* p-0 */
  font-weight: 400;    /* font-normal */
  border-radius: 0.375rem; /* rounded-md */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms;
}
.custom-calendar .vc-day-content:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
}

/* Estilos de los diferentes estados de los días */
.custom-calendar .vc-day.is-not-in-month .vc-day-content {
  color: #9ca3af; /* text-gray-400 */
  opacity: 0.5;  /* opacity-50 */
}
.custom-calendar .vc-highlight {
  background-color: #3B82F6; /* bg-primary (azul como placeholder) */
  color: white;              
  border-radius: 0.375rem;
}
.custom-calendar .vc-day-content.vc-today {
 
  background-color: #f3f4f6; 
  color: #111827;            
}
</style>
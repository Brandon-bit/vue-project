<script setup lang="ts">
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { searchProductsByName } from '@/modules/Inventario/Stock/TransferenciaStock/services/transferStockServices';
import { ProductTypeApi } from '@/modules/Inventario/ConfiguracionDeInventario/Producto/types/productTypes'; 

const props = defineProps<{
  name: string
  label: string
  placeholder?: string
  required?: boolean
}>()

// VeeValidate maneja el VALOR FINAL (el ID del producto seleccionado)
const { value, errorMessage } = useField<string>(props.name)

// --- ESTADO LOCAL DEL COMPONENTE ---
const searchTerm = ref('') 
const options = ref<ProductTypeApi[]>([]) // La lista de resultados del API
const isLoading = ref(false) 
const isOpen = ref(false) 

// --- LÓGICA DE BÚSQUEDA ---
let debounceTimer: number 


watch(searchTerm, (newTerm) => {
  
  if (!newTerm) {
    isOpen.value = false
    options.value = []
    return
  }

  
  isOpen.value = true
  isLoading.value = true

  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    try {
      const response = await searchProductsByName(newTerm)

      console.log('AAAAAA', response)
      // La lista de productos está en response.data.productos
      options.value = response.data.productos
    } catch (error) {
      console.error("Error en la búsqueda:", error)
      options.value = [] // Limpia las opciones en caso de error
    } finally {
      isLoading.value = false
    }
  }, 500)
})

// --- LÓGICA DE SELECCIÓN ---
const selectOption = (option: ProductTypeApi) => {
  console.log('IDDDDD', option)
  value.value = option.id 
  console.log('AHHHH', value.value)
  searchTerm.value = option.nombre // Muestra el nombre del producto en el input
  isOpen.value = false 
}
</script>

<template>
  <div class="flex flex-col space-y-2 mb-4 relative">
    <label :for="name" class="font-semibold">
      {{ label }}
      <span v-if="props.required" class="text-error"> *</span>
    </label>
    
    <input
      type="text"
      v-model="searchTerm"
      :placeholder="placeholder || 'Escribe para buscar...'"
      class="input w-full"
      :class="{ 'input-error': errorMessage }"
      autocomplete="off"
    />

    <ul v-if="isOpen" class="absolute top-full left-0 right-0 z-10 bg-base-100 border rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
      <li v-if="isLoading" class="px-4 py-2 text-gray-500">Buscando...</li>
      <li v-else-if="options.length === 0" class="px-4 py-2 text-gray-500">No se encontraron resultados.</li>
      <li 
        v-else 
        v-for="option in options" 
        :key="option.id" 
        @click="selectOption(option)" 
        class="px-4 py-2 hover:bg-base-200 cursor-pointer"
      >
        {{ option.nombre }}
      </li>
    </ul>

    <div v-if="errorMessage" class="text-error text-sm">{{ errorMessage }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

// --- Componentes de UI ---
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

import BaseFormSelectFilter from '@/shared/components/BaseFormSelectFilter.vue'



// --- Lógica de Estado y Acciones ---
import useTransferStore from '../store/transferStore'
import { useTransferActions } from '../composables/useTransfeActions'
import { getListWarehouse, searchProductsByName } from '../services/transferStockServices'


import type { 
  WarehouseType, 
  TransferFormType,
  TrasladodetalleRequestType 
} from '@/modules/Inventario/Stock/TransferenciaStock/Types/transferStock'




// .


// --- 1. CONFIGURACIÓN INICIAL ---
const router = useRouter()
const transferStore = useTransferStore()
const { createTransfer } = useTransferActions()
const warehouseOptions = ref<{ id: string; label: string; }[]>([])

// --- 2. DATOS INICIALES DEL FORMULARIO ("LIENZO EN BLANCO") ---
// Usa tu tipo 'TransferFormType'
const emptyForm: TransferFormType = {
  idWarehouseOrigin: '',
  idWarehouseDestination: '',
  transferDate: new Date().toISOString().split('T')[0],
  driver: '',
  remarks: '',
  idProduct: null,
  quantity: '1',
  Trasladodetalles: []
};

// --- 3. CONFIGURACIÓN DE VEE-VALIDATE ---
const { handleSubmit, isSubmitting, setFieldValue, values, resetField } = useForm<TransferFormType>({
  initialValues: emptyForm
})

// --- 4. CARGA DE DATOS (PARA SELECTS) ---
onMounted(async () => {
  transferStore.clearDetails();
  try {
    const warehousesFromApi = await getListWarehouse();
    warehouseOptions.value = warehousesFromApi.map((warehouse: WarehouseType) => ({
      id: warehouse.id,
      label: warehouse.nombre 
    }));
  } catch (error) {
    console.error("Error al cargar los almacenes:", error);
  }
});

// --- 5. SINCRONIZACIÓN DE DETALLES ---
// Sincroniza la lista de detalles del store con el campo del formulario
watch(() => transferStore.detailItems, (newDetails) => {
  setFieldValue('Trasladodetalles', newDetails);
}, { deep: true });

// --- 6. LÓGICA DE DETALLES EN LÍNEA ---
const addProductToList = () => {
  // 'values' viene de useForm y contiene los datos actuales del formulario
  if (!values.idProduct) {
    alert('Debes seleccionar un producto.');
    return;
  }
  
  // Llama a la acción del store para añadir el producto a la lista
  transferStore.addProduct({
  idProducto: values.idProduct ?? "",       // nunca null
  nombreProducto: "Producto Seleccionado",
  cantidad: Number(values.quantity) || 0    // nunca undefined
});

  // Limpia solo los campos del detalle en el formulario
  resetField('idProduct');
  setFieldValue('quantity', '1');
}

// --- 7. LÓGICA DE ENVÍO DEL FORMULARIO ---
const onSubmit = handleSubmit(async (formValues) => {
  try {
    const result = await createTransfer(formValues);
    if (result.status === 'success') {
      transferStore.clearDetails();
      // CORRECCIÓN: Ruta de navegación ajustada a tu estructura de proyecto
      router.push('/inventario/stock/transferencias'); // <-- VERIFICA ESTA RUTA
    } else { 
      alert(result.message || 'Ocurrió un error');
    }
  } catch (error) {
     alert('Error de conexión al enviar el formulario.');
  }
});
</script>

<template>
  <div class="xl:max-w-[70%] mx-auto p-4 md:p-8">
    <h2 class="text-center mb-10">Crear Nuevo Traslado</h2>

    <form @submit="onSubmit" class="space-y-8">
      
      <div class="p-6 border rounded-lg ">
        <h3 class="text-lg font-semibold mb-4">Datos Generales</h3>
        <div class="grid grid-cols-12 gap-4">
          <BaseFormSelect name="idWarehouseOrigin" label="Almacén de Origen" :options="warehouseOptions" class="col-span-12 md:col-span-6" />
          <BaseFormSelect name="idWarehouseDestination" label="Almacén de Destino" :options="warehouseOptions" class="col-span-12 md:col-span-6" />
          <BaseFormInput name="driver" label="Conductor" class="col-span-12 md:col-span-6" />
          <BaseFormInput name="transferDate" label="Fecha de Traslado" type="date" class="col-span-12 md:col-span-6" />
          <BaseTextArea name="remarks" label="Observaciones Generales" class="col-span-12" />
        </div>
      </div>

      <div class="p-6 border rounded-lg  space-y-4">
        <h3 class="text-lg font-semibold">Productos a Trasladar</h3>
        
        <div class="grid grid-cols-12 gap-4 items-start">
          <BaseFormSelectFilter 
            name="idProduct"
            label="Buscar Producto"
            class="col-span-12 md:col-span-6"
          />
          <BaseFormInput 
            name="quantity" 
            label="Cantidad" 
            type="number" 
            class="col-span-12 md:col-span-3"
          />
          <div class="col-span-12 md:col-span-3 pt-7">
            <button 
              type="button" 
              class="btn btn-secondary w-full" 
              @click="addProductToList"
              :disabled="!values.idProduct"
            >
              Añadir a la Lista
            </button>
          </div>
        </div>
        
        <hr class="my-4">

        
      </div>

      <div class="flex justify-end gap-4 mt-10">
        <router-link to="/inventario/stock/transferencias" class="btn"> Regresar
        </router-link>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="loading loading-spinner"></span>
          Guardar Traslado
        </button>
      </div>
    </form>
  </div>
</template>
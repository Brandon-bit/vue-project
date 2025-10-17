<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { z } from 'zod'

// --- Componentes de UI ---
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormSelectFilter from '@/shared/components/BaseFormSelectFilter.vue'

// --- Estado y servicios ---
import useTransferStore from '../store/transferStore'
import { useTransferActions } from '../composables/useTransfeActions'
import { getListWarehouse } from '../services/transferStockServices'
import { TransferFormType, TransferRequestType, TransferResponseType, TransferType,TrasladodetalleRequestType } from "../Types/transferStock";

// --- Tipos ---
import type {
  WarehouseType
} from '@/modules/Inventario/Stock/TransferenciaStock/Types/transferStock'

// --- 1. SCHEMA DE VALIDACIÓN ---
const transferSchema = z.object({
  idWarehouseOrigin: z.string().min(1, 'El almacén de origen es obligatorio'),
  idWarehouseDestination: z.string().min(1, 'El almacén de destino es obligatorio'),
  transferDate: z.string().min(1, 'La fecha de traslado es obligatoria'),
  driver: z.string().min(1, 'El nombre del conductor es obligatorio'),
  remarks: z.string().optional(),
  idProduct: z.string().nullable(),
  quantity: z.string().min(1, 'La cantidad es obligatoria'),
  Trasladodetalles: z
    .array(
      z.object({
        idProducto: z.string(),
        nombreProducto: z.string(),
        cantidad: z.number().min(1, 'Cantidad inválida')
      })
    )
    .min(1, 'Debe agregar al menos un producto')
})

// --- 2. FORMULARIO INICIAL ---
const emptyForm: TransferFormType = {
  idWarehouseOrigin: '',
  idWarehouseDestination: '',
  transferDate: new Date().toISOString().split('T')[0],
  driver: '',
  remarks: '',
  idProduct: null,
  quantity: '1',
  Trasladodetalles: []
}

// --- 3. CONFIGURACIÓN DEL FORMULARIO ---
const { handleSubmit, isSubmitting, setFieldValue, values, resetForm } = useForm<TransferFormType>({
  validationSchema: toFormValidator(transferSchema),
  initialValues: emptyForm
})

// --- 4. ESTADO Y DATOS INICIALES ---
const router = useRouter()
const transferStore = useTransferStore()
const { createTransfer } = useTransferActions()
const warehouseOptions = ref<{ id: string; label: string }[]>([])

onMounted(async () => {
  transferStore.clearDetails()
  try {
    const warehouses = await getListWarehouse(1, 100)

    // Ajusta según tu estructura de respuesta real
    const warehouseList = warehouses.data.items ?? warehouses.data ?? []

    warehouseOptions.value = warehouseList.map((w: WarehouseType) => ({
      id: w.id,
      label: w.nombre
    }))
  } catch (err) {
    console.error('Error al cargar almacenes:', err)
  }
})

// --- 5. SINCRONIZACIÓN DE DETALLES CON EL STORE ---
watch(
  () => transferStore.detailItems,
  (newDetails) => {
    setFieldValue('Trasladodetalles', newDetails)
  },
  { deep: true }
)

// --- 6. MANEJO DE PRODUCTOS ---
const filterKey = ref(0)
const selectedProductName = ref<string>('')

const onProductSelected = (product: any) => {
  if (typeof product === 'object' && product !== null) {
    setFieldValue('idProduct', product.id)
    selectedProductName.value = product.label
  } else {
    setFieldValue('idProduct', product)
    selectedProductName.value = ''
  }
}

const addProductToList = () => {
  if (!values.idProduct) {
    alert('Debes seleccionar un producto.')
    return
  }

  const cantidad = Number(values.quantity)
  if (isNaN(cantidad) || cantidad <= 0) {
    alert('La cantidad debe ser mayor que 0.')
    setFieldValue('quantity', '1')
    return
  }

  transferStore.addProduct({
    idProducto: values.idProduct ?? '',
    nombreProducto: selectedProductName.value || 'Sin nombre',
    cantidad
  })

  // Limpieza
  setFieldValue('quantity', '1')
  setFieldValue('idProduct', null)
  selectedProductName.value = ''
  filterKey.value++
}

// --- 7. ENVÍO DEL FORMULARIO ---
const onSubmit = handleSubmit(async (formValues) => {
  try {
    // Validación final (extra seguridad)
    transferSchema.parse(formValues)

    const result = await createTransfer(formValues)
    if (result.status === 'success') {
      alert('Traslado creado correctamente.')
      transferStore.clearDetails()
      resetForm({ values: emptyForm })
      router.push('/inventario/stock/transferencias')
    } else {
      alert(result.message || 'Ocurrió un error al guardar el traslado.')
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Errores de validación:', error.errors)
      alert('Por favor, verifica los campos marcados antes de continuar.')
    } else {
      console.error('Error al enviar formulario:', error)
      alert('Error de conexión al enviar el formulario.')
    }
  }
})
</script>

<template> 
  <div class="xl:max-w-[70%] mx-auto p-4 md:p-8"> 
    <h2 class="text-center mb-10">Crear Nuevo Traslado</h2> 
    <form @submit="onSubmit" class="space-y-8"> 
      <div class="p-6 rounded-lg "> 
        <h3 class="text-lg font-semibold mb-4">Datos Generales</h3> 
        <div class="grid grid-cols-12 gap-4"> 
          <BaseFormSelect 
            name="idWarehouseOrigin" 
            label="Almacén de Origen" :options="warehouseOptions" 
            class="col-span-12 md:col-span-6" 
          /> 
          <BaseFormSelect 
            name="idWarehouseDestination" 
            label="Almacén de Destino" :options="warehouseOptions" 
            class="col-span-12 md:col-span-6" 
          /> 
          <BaseFormInput 
            name="driver" 
            label="Conductor" 
            class="col-span-12 md:col-span-6" 
          /> 
          <BaseFormInput 
            name="transferDate" 
            label="Fecha de Traslado" 
            type="date" 
            class="col-span-12 md:col-span-6" 
          /> 
          <BaseTextArea 
            name="remarks" 
            label="Observaciones Generales" 
            class="col-span-12" 
          /> 
        </div> 
      </div> 
      <div class="p-6 rounded-lg space-y-4"> 
        <h3 class="text-lg font-semibold">Productos a Trasladar</h3> 
        <div class="grid grid-cols-12 gap-4 items-start"> 
          <BaseFormSelectFilter 
            :key="filterKey" 
            name="idProduct" 
            label="Buscar Producto" 
            class="col-span-12 md:col-span-6" 
            @update:modelValue="onProductSelected" 
          /> 
          <BaseFormInput 
            name="quantity" 
            label="Cantidad" 
            min="0" 
            type="number" 
            class="col-span-12 md:col-span-3" 
          /> 
          <div class="col-span-12 md:col-span-3 pt-7"> 
            <button 
              type="button" 
              class="btn btn-secondary w-full" 
              @click="addProductToList" 
              :disabled="!values.idProduct" 
            > Añadir a la Lista </button> 
          </div> 
        </div> 
        <hr class="my-4"> 
          <!-- Lista de productos añadidos --> 
          <div v-if="transferStore.detailItems.length > 0" class="mt-6"> 
            <h4 class="text-md font-semibold mb-3">Productos Añadidos</h4> 
            <table class="border border-gray-200 dark:border-black rounded-lg border-separate border-spacing-0 bg-base-100 bg-base w-full"> 
              <thead class="bg-base text-base-content"> 
                <tr> 
                  <th class="text-left px-4 py-2 border-b border-gray-300 bg-base w-full">#</th> 
                  <th class="text-left px-4 py-2 border-b border-gray-300 bg-base w-full">Producto</th> 
                  <th class="text-left px-4 py-2 border-b border-gray-300 bg-base w-full">Cantidad</th> 
                  <th class="text-center px-4 py-2 border-b border-gray-300 bg-base w-full">Acciones</th> 
                </tr> 
              </thead> 

              <tbody class="bg-base text-base-content"> 
                <tr v-for="(item, index) in transferStore.detailItems" :key="index" > 
                  <td class="px-4 py-2 ">{{ index + 1 }}</td> 
                  <td class="px-4 py-2 ">{{ item.nombreProducto }}</td> 
                  <td class="px-4 py-2 ">{{ item.cantidad }}</td> 
                  <td class="px-4 py-2 text-center"> 
                    <button 
                      class="btn btn-sm btn-error" t
                      ype="button" 
                      @click="transferStore.removeProduct(item.idProducto)" > 
                      Eliminar
                    </button> 
                  </td> 
                </tr> 
              </tbody> 
            </table> 
          </div> 
        </div>
      <div class="flex justify-end gap-4 mt-10"> 
        <router-link to="/inventario/stock/transferir-stock" class="btn"> Regresar </router-link> 
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
         <span v-if="isSubmitting" class="loading loading-spinner"></span> Guardar Traslado 
        </button> 
      </div> 
    </form> 
  </div> 
</template>
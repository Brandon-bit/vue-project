<script setup lang="ts">
import { ref, onMounted } from 'vue'

import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormSelectFilter from '@/shared/components/BaseFormSelectFilter.vue'

import { WarehouseType } from '../Types/transferStock'
import { getListWarehouse } from '../services/transferStockServices'
import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'

// --- Store y variables reactivas ---
const transferStock = useTransferStore()
const warehouseOptions = ref<{ id: string | number; label: string }[]>([])

// --- Ciclo de vida ---
onMounted(async () => {
  console.log("El modal se ha montado. Obteniendo lista de almacenes...")

  try {
    // Llamas a la API con los parámetros requeridos
    const warehousesFromApi = await getListWarehouse(1, 100)

    // Accedes correctamente al arreglo de almacenes
    const warehouseList =
      warehousesFromApi.data?.items ??
      warehousesFromApi.data ??
      []

    // Mapeas el resultado al formato que usa tu <BaseFormSelect>
    warehouseOptions.value = warehouseList.map((warehouse: WarehouseType) => ({
      id: warehouse.id,
      label: warehouse.nombre
    }))

    console.log("Almacenes cargados:", warehouseOptions.value)
  } catch (error) {
    console.error("Error al cargar los almacenes:", error)
  }
})
</script>

<template>
  <BaseFormSelect
    name="idWarehouseOrigin"
    label="Almacén de origen"
    :options="warehouseOptions"
    required
  />

  <BaseFormSelect
    name="idWarehouseDestination"
    label="Almacén de destino"
    :options="warehouseOptions"
    required
  />

  <BaseFormInput
    name="driver"
    label="Persona responsable"
    required
  />

  <BaseFormInput
    name="remarks"
    label="Notas"
    required
  />

  <BaseFormSelectFilter
    name="idProducto"
    label="Producto"
    placeholder="Busca por nombre de producto..."
    required
  />
</template>

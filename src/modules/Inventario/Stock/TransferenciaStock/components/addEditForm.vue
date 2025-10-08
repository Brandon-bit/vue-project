<script setup lang="ts">
import { ref, onMounted } from 'vue';

import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';
import { WarehouseType } from '../Types/transferStock'
import { getListWarehouse } from '../services/transferStockServices'
import { getProductDetailService } from '@/modules/Inventario/ConfiguracionDeInventario/Producto/services/productService';
import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'
import BaseFormSelectFilter from '@/shared/components/BaseFormSelectFilter.vue';


const transferStock = useTransferStore()
const warehouseOptions = ref<{ id: string; label: string; }[]>([])

onMounted(async () => {
  console.log("El modal se ha montado. Obteniendo lista de almacenes...");
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
            label="Almacén de Destino"
            :options="warehouseOptions"
            required
            />

            <BaseFormInput
            name="driver"
            label="persona responsable"
            required
            />
            <BaseFormInput
            name="remarks"
            label="Notas"
            required
            />

            <BaseFormSelectFilter
      name="idProducto"  label="Producto"
      placeholder="Busca por nombre de producto..."
      required
    />
      




    </template>
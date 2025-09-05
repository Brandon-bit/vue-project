<script setup lang="ts">

import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useSubCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/store/subcategory.store'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { ref } from 'vue'

const modalStore = useModalStore()
const subCategoryStore = useSubCategoryStore()

const isSubmitting = ref(false) 



const onSubmit = () => {
  console.log('Formulario enviado (lógica pendiente)');
}


const openCreateModal = () => {
  console.log('¡El botón fue presionado!'); // <-- AÑADE ESTA LÍNEA

  subCategoryStore.setData();
  modalStore.open(subCategoryStore.modalId, {
    type: 'CREATE',
    title: 'Crear Subcategoría'
  });
}

const getTableColumns = (): ColumnDef<SubCategory>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'description',
      header: 'Descripción'
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => (info.getValue() ? 'Activo' : 'Inactivo') // Ejemplo para mostrar texto en lugar de true/false
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: (info) => {
        // Aquí podrías renderizar botones de Editar/Eliminar
        return 'Botones...' 
      }
    }
  ]
}



</script>


<template>
<h2 class="text-center mb-8">SubCategorías</h2>
<div class="mb-10 text-right">
        <BaseButton text="Crear categoría" @click="openCreateModal" />
    </div>

     <BaseModal :modalId="subCategoryStore.modalId"
       :onSubmit="onSubmit"                 
    :isSubmitting="isSubmitting">
    <template v-slot:modalBody>
      <p>El formulario para crear una subcategoría aparecerá aquí.</p>
    </template>
  </BaseModal>

   <BaseTable
      v-if="subCategoryStore.subcategories.length > 0"
      :data="subCategoryStore.subcategories"
      :headers="getTableColumns()"
    />

</template> 
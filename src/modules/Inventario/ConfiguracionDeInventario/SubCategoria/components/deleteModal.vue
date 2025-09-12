<template>
    <div class="text-center">
        <div class="mb-4">
            <svg class="mx-auto mb-4 w-14 h-14 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
                ¿Está seguro que desea eliminar la subcategoría 
                <span class="font-semibold text-gray-900">"{{ subCategoryStore.selectedSubCategory?.label }}"</span>?
            </h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">
            Esta acción no se puede deshacer.
        </p>
    </div>
</template>

<script setup lang="ts">
import useSubCategoryStore from '../store/subcategory.store'

const subCategoryStore = useSubCategoryStore()
</script>
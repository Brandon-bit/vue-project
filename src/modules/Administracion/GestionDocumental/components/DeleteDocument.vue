<script setup lang="ts">
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'
const documentStore = useDocumentStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el documento
        <span class="!font-semibold"> "{{ documentStore.selectedDocument?.name }}"</span>?
        Esta acción no se puede deshacer.
    </p>
</template>

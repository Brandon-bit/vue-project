<script setup lang="ts">
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import DownloadFileButton from '@inventario/ConfiguracionDeInventario/Productos/components/DownloadFileButton.vue'
</script>

<template>
    <BaseFormInputFile
        name="archivo"
        label="Archivo CSV"
        accept="text/csv"
        :multiple="false"
    ></BaseFormInputFile>
    <DownloadFileButton />
</template>

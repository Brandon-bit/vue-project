<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'

const downloadTemplate = () => {
    const template = `empleado_id,concepto_id,monto`
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plantilla_nomina.csv'
    a.click()
    window.URL.revokeObjectURL(url)
}
</script>

<template>
    <BaseFormInputFile
        name="csvFile"
        label="Selecciona el archivo CSV"
        :multiple="false"
        accept=".csv"
    />
    <div class="w-full">
        <BaseButton
            @click="downloadTemplate"
            icon="download"
            variant="outline"
            text="Descargar plantilla CSV"
            class-name="w-full mt-5"
        />
    </div>
</template>

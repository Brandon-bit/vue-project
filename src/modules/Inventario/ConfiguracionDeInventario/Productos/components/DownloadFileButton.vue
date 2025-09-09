<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'

const downloadLayoutBulkUpload = () => {
    const headers = ['sku', 'nombre', 'numero_codigo_barras', 'marca']

    const csvContent = headers.join(',') + '\n'

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'carga_masiva_productos.csv')
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
</script>

<template>
    <div>
        <BaseButton
            text="Descargar layout"
            icon="download"
            className="w-full btn-outline"
            @click="downloadLayoutBulkUpload"
        />
    </div>
</template>

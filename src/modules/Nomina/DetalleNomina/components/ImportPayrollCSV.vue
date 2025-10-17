<script setup lang="ts">
import { ref } from 'vue'
import { showNotification } from '@/utils/toastNotifications'

const emit = defineEmits<{
    onImportSuccess: []
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isProcessing = ref(false)
const fileName = ref('')

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    if (!file.name.endsWith('.csv')) {
        showNotification('Por favor selecciona un archivo CSV válido', 'error')
        return
    }

    fileName.value = file.name
    isProcessing.value = true

    try {
        const text = await file.text()
        const lines = text.split('\n').filter(line => line.trim())

        // Validar formato
        if (lines.length < 2) {
            throw new Error('El archivo está vacío o no tiene datos')
        }

        // Validar encabezados
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
        const requiredHeaders = ['empleado_id', 'concepto_id', 'monto']
        
        const hasAllHeaders = requiredHeaders.every(h => headers.includes(h))
        if (!hasAllHeaders) {
            throw new Error(`El archivo debe contener las columnas: ${requiredHeaders.join(', ')}`)
        }

        // Procesar datos
        const data = []
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim())
            if (values.length >= 3) {
                data.push({
                    empleado_id: parseInt(values[0]),
                    concepto_id: parseInt(values[1]),
                    monto: parseFloat(values[2])
                })
            }
        }

        console.log('Datos procesados:', data)
        
        // Simular guardado
        await new Promise(resolve => setTimeout(resolve, 1000))

        showNotification(`${data.length} registros importados exitosamente`, 'success')
        emit('onImportSuccess')
        
        // Reset
        fileName.value = ''
        if (fileInput.value) fileInput.value.value = ''

    } catch (error: any) {
        showNotification(error.message || 'Error al procesar el archivo', 'error')
    } finally {
        isProcessing.value = false
    }
}

const downloadTemplate = () => {
    const template = `empleado_id,concepto_id,monto
1,1,10000
1,8,1500
2,1,12000
2,3,2000`

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
    <div class="card bg-base-100 shadow-xl p-6">
        <h3 class="text-xl font-bold mb-4">Importar Nómina desde CSV</h3>
        
        <!-- Instructions -->
        <div class="alert alert-info mb-4">
            <span class="material-symbols-outlined">info</span>
            <div>
                <p class="font-semibold">Formato del archivo CSV:</p>
                <ul class="list-disc list-inside text-sm mt-2">
                    <li>Columnas: <code>empleado_id, concepto_id, monto</code></li>
                    <li>Una fila por cada concepto de cada empleado</li>
                    <li>Sin encabezados adicionales</li>
                </ul>
            </div>
        </div>

        <!-- Download Template -->
        <div class="mb-4">
            <button @click="downloadTemplate" class="btn btn-outline btn-sm">
                📥 Descargar Plantilla CSV
            </button>
        </div>

        <!-- File Input (Hidden) -->
        <input
            ref="fileInput"
            type="file"
            accept=".csv"
            class="hidden"
            @change="handleFileChange"
        />

        <!-- Upload Button -->
        <div class="flex items-center gap-4">
            <button 
                @click="triggerFileInput" 
                class="btn btn-primary"
                :disabled="isProcessing"
            >
                <span v-if="!isProcessing">📂 Seleccionar Archivo CSV</span>
                <span v-else class="loading loading-spinner"></span>
            </button>
            
            <span v-if="fileName" class="text-sm text-gray-600">
                {{ fileName }}
            </span>
        </div>

        <!-- Processing Status -->
        <div v-if="isProcessing" class="mt-4">
            <progress class="progress progress-primary w-full"></progress>
            <p class="text-sm text-center mt-2">Procesando archivo...</p>
        </div>
    </div>
</template>

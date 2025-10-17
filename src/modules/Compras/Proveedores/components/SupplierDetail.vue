<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import useSupplierStore from '@/modules/Compras/Proveedores/store/supplierStore'
import { useSupplierActions } from '@/modules/Compras/Proveedores/composables/useSupplierActions'
import type { SupplierOrderHistoryType, SupplierEvaluationType, SupplierDocumentType } from '@/modules/Compras/Proveedores/types/supplierTypes'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import { showNotification } from '@/utils/toastNotifications'

const supplierStore = useSupplierStore()
const { getSupplierOrderHistory, getSupplierEvaluation, getSupplierDocuments, uploadDocument } = useSupplierActions()

const supplier = computed(() => supplierStore.selectedSupplier)
const activeTab = ref('general')

const orderHistory = ref<SupplierOrderHistoryType[]>([])
const evaluation = ref<SupplierEvaluationType>({
    calidad: 0,
    tiempoEntrega: 0,
    precio: 0,
    servicio: 0,
    promedio: 0
})
const documents = ref<SupplierDocumentType[]>([])
const isLoadingHistory = ref(false)
const isLoadingEvaluation = ref(false)
const isLoadingDocuments = ref(false)
const isUploadingDocument = ref(false)

// Schema de validación para subida de archivos
const fileUploadSchema = z.object({
    documentos: z.any().refine((files) => files && files.length > 0, {
        message: 'Debes seleccionar al menos un archivo'
    })
})

const { handleSubmit: handleFileSubmit, resetForm: resetFileForm } = useForm({
    validationSchema: toTypedSchema(fileUploadSchema),
    initialValues: {
        documentos: []
    }
})

const loadOrderHistory = async () => {
    if (!supplier.value || orderHistory.value.length > 0) return
    isLoadingHistory.value = true
    try {
        orderHistory.value = await getSupplierOrderHistory(supplier.value.id)
    } catch (error) {
        console.error('Error loading order history:', error)
    } finally {
        isLoadingHistory.value = false
    }
}

const loadEvaluation = async () => {
    if (!supplier.value) return
    isLoadingEvaluation.value = true
    try {
        evaluation.value = await getSupplierEvaluation(supplier.value.id)
    } catch (error) {
        console.error('Error loading evaluation:', error)
    } finally {
        isLoadingEvaluation.value = false
    }
}

const loadDocuments = async () => {
    if (!supplier.value || documents.value.length > 0) return
    isLoadingDocuments.value = true
    try {
        documents.value = await getSupplierDocuments(supplier.value.id)
    } catch (error) {
        console.error('Error loading documents:', error)
    } finally {
        isLoadingDocuments.value = false
    }
}

const handleTabChange = (tab: string) => {
    activeTab.value = tab
    if (tab === 'historial') loadOrderHistory()
    if (tab === 'evaluacion') loadEvaluation()
    if (tab === 'documentos') loadDocuments()
}

const getStatusBadge = (estatus: string): string => {
    const badgeMap: Record<string, string> = {
        'Entregada': 'badge-success',
        'En Proceso': 'badge-info',
        'Confirmada': 'badge-warning',
        'Cancelada': 'badge-error'
    }
    return badgeMap[estatus] || 'badge-neutral'
}

const onSubmitDocuments = handleFileSubmit(async (values) => {
    if (!supplier.value) return
    
    isUploadingDocument.value = true
    try {
        const files = values.documentos as File[]
        
        for (const file of files) {
            await uploadDocument(supplier.value.id, file)
        }
        
        showNotification('Documentos subidos exitosamente', 'success')
        resetFileForm()
        
        // Recargar la lista de documentos
        documents.value = []
        await loadDocuments()
    } catch (error) {
        console.error('Error uploading documents:', error)
        showNotification('Error al subir los documentos', 'error')
    } finally {
        isUploadingDocument.value = false
    }
})

onMounted(() => {
    if (supplier.value) {
        loadEvaluation()
    }
})
</script>

<template>
    <div v-if="supplier" class="space-y-4">
        <!-- Header con Nombre y Badge -->
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-3xl text-primary">business</span>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold">{{ supplier.nombre }}</h4>
                            <p class="text-sm text-gray-500 flex items-center gap-2">
                                <span class="badge badge-outline">{{ supplier.categoria }}</span>
                                <span>RFC: {{ supplier.rfc }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span :class="['badge badge-lg', supplier.estatus === 'Activo' ? 'badge-success' : 'badge-error']">
                            {{ supplier.estatus }}
                        </span>
                        <div class="flex items-center gap-1 text-yellow-500 mt-2">
                            <span class="material-symbols-outlined">star</span>
                            <span class="font-semibold text-lg">{{ supplier.puntuacion }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-bordered">
            <a 
                role="tab" 
                :class="['tab', activeTab === 'general' ? 'tab-active' : '']"
                @click="handleTabChange('general')"
            >
                General
            </a>
            <a 
                role="tab" 
                :class="['tab', activeTab === 'historial' ? 'tab-active' : '']"
                @click="handleTabChange('historial')"
            >
                Historial
            </a>
            <a 
                role="tab" 
                :class="['tab', activeTab === 'evaluacion' ? 'tab-active' : '']"
                @click="handleTabChange('evaluacion')"
            >
                Evaluación
            </a>
            <a 
                role="tab" 
                :class="['tab', activeTab === 'documentos' ? 'tab-active' : '']"
                @click="handleTabChange('documentos')"
            >
                Documentos
            </a>
        </div>

        <!-- Tab Content: General -->
        <div v-show="activeTab === 'general'" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <!-- Información Fiscal -->
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body">
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">business</span>
                            Información Fiscal
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div>
                                <p class="text-gray-500">RFC</p>
                                <p class="font-semibold">{{ supplier.rfc }}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Razón Social</p>
                                <p class="font-semibold">{{ supplier.nombre }}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">Categoría</p>
                                <p class="font-semibold">{{ supplier.categoria }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Información de Contacto -->
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body">
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">contact_phone</span>
                            Contacto
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-gray-500">phone</span>
                                <span>{{ supplier.telefono || 'No registrado' }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-gray-500">mail</span>
                                <span>{{ supplier.email || 'No registrado' }}</span>
                            </div>
                            <div v-if="supplier.direccion" class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-gray-500">location_on</span>
                                <span>{{ supplier.direccion }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Información Bancaria -->
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">account_balance</span>
                        Información Bancaria
                    </h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-500">Banco</p>
                            <p class="font-semibold">{{ supplier.banco || 'No registrado' }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">CLABE</p>
                            <p class="font-semibold font-mono">{{ supplier.clabe || 'No registrado' }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Estadísticas -->
            <div class="grid grid-cols-3 gap-4">
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body text-center">
                        <span class="material-symbols-outlined text-4xl text-blue-500 mb-2">shopping_cart</span>
                        <div class="text-2xl font-bold">{{ supplier.ordenes }}</div>
                        <p class="text-sm text-gray-500">Órdenes de Compra</p>
                    </div>
                </div>
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body text-center">
                        <span class="material-symbols-outlined text-4xl text-green-500 mb-2">payments</span>
                        <div class="text-2xl font-bold">${(supplier.montoTotal / 1000).toFixed(0)}K</div>
                        <p class="text-sm text-gray-500">Total Comprado</p>
                    </div>
                </div>
                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body text-center">
                        <span class="material-symbols-outlined text-4xl text-yellow-500 mb-2">star</span>
                        <div class="text-2xl font-bold">{{ supplier.puntuacion }}</div>
                        <p class="text-sm text-gray-500">Calificación</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Content: Historial -->
        <div v-show="activeTab === 'historial'" class="space-y-3">
            <div v-if="isLoadingHistory" class="space-y-3">
                <div v-for="n in 3" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                    <div class="card-body">
                        <div class="h-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
            <div v-else-if="orderHistory.length === 0" class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">receipt_long</span>
                    <p class="text-gray-500">No hay órdenes de compra registradas</p>
                </div>
            </div>
            <div v-else class="space-y-2">
                <div
                    v-for="order in orderHistory"
                    :key="order.id"
                    class="card bg-base-100 border border-base-content/10"
                >
                    <div class="card-body p-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-semibold">{{ order.folio }}</p>
                                <p class="text-sm text-gray-500">{{ new Date(order.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold text-lg">${{ order.monto.toLocaleString() }}</p>
                                <span :class="['badge', getStatusBadge(order.estatus)]">
                                    {{ order.estatus }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Content: Evaluación -->
        <div v-show="activeTab === 'evaluacion'" class="space-y-4">
            <div v-if="isLoadingEvaluation" class="grid grid-cols-3 gap-4">
                <div v-for="n in 3" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                    <div class="card-body">
                        <div class="h-24 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="grid grid-cols-4 gap-4">
                    <div class="card bg-base-100 border border-base-content/10">
                        <div class="card-body text-center">
                            <div class="text-4xl font-bold text-green-500 mb-2">{{ evaluation.calidad }}</div>
                            <p class="text-sm text-gray-500">Calidad</p>
                        </div>
                    </div>
                    <div class="card bg-base-100 border border-base-content/10">
                        <div class="card-body text-center">
                            <div class="text-4xl font-bold text-blue-500 mb-2">{{ evaluation.tiempoEntrega }}</div>
                            <p class="text-sm text-gray-500">Tiempo de Entrega</p>
                        </div>
                    </div>
                    <div class="card bg-base-100 border border-base-content/10">
                        <div class="card-body text-center">
                            <div class="text-4xl font-bold text-yellow-500 mb-2">{{ evaluation.precio }}</div>
                            <p class="text-sm text-gray-500">Precio</p>
                        </div>
                    </div>
                    <div class="card bg-base-100 border border-base-content/10">
                        <div class="card-body text-center">
                            <div class="text-4xl font-bold text-purple-500 mb-2">{{ evaluation.servicio }}</div>
                            <p class="text-sm text-gray-500">Servicio</p>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-100 border border-base-content/10">
                    <div class="card-body">
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">trending_up</span>
                            Tendencia de Desempeño
                        </h4>
                        <div class="h-48 flex items-center justify-center text-gray-400">
                            <div class="text-center">
                                <span class="material-symbols-outlined text-6xl mb-2">show_chart</span>
                                <p>Gráfico de tendencia próximamente</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <div>
                        <p class="font-semibold">Promedio General: {{ evaluation.promedio }}</p>
                        <p class="text-sm">Basado en {{ supplier.ordenes }} órdenes de compra completadas</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Content: Documentos -->
        <div v-show="activeTab === 'documentos'" class="space-y-4">
            <form @submit.prevent="onSubmitDocuments" class="space-y-4">
                <BaseFormInputFile
                    name="documentos"
                    label="Subir Documentos"
                    :multiple="true"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
                
                <button 
                    type="submit" 
                    class="btn btn-primary w-full"
                    :disabled="isUploadingDocument"
                >
                    <span v-if="isUploadingDocument" class="loading loading-spinner"></span>
                    <span v-else class="material-symbols-outlined">upload</span>
                    {{ isUploadingDocument ? 'Subiendo...' : 'Subir Documentos' }}
                </button>
            </form>

            <div class="divider">Documentos Registrados</div>

            <div v-if="isLoadingDocuments" class="space-y-2">
                <div v-for="n in 2" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                    <div class="card-body">
                        <div class="h-12 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
            <div v-else-if="documents.length === 0" class="card bg-base-100 border border-base-content/10">
                <div class="card-body text-center py-8">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p class="text-gray-500">No hay documentos registrados</p>
                </div>
            </div>
            <div v-else class="space-y-2">
                <div
                    v-for="doc in documents"
                    :key="doc.id"
                    class="card bg-base-100 border border-base-content/10"
                >
                    <div class="card-body p-4 flex flex-row items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-2xl text-red-500">picture_as_pdf</span>
                            <div>
                                <p class="font-semibold">{{ doc.nombre }}</p>
                                <p class="text-xs text-gray-500">Subido el {{ new Date(doc.fechaSubida).toLocaleDateString('es-MX') }}</p>
                            </div>
                        </div>
                        <button class="btn btn-ghost btn-sm">
                            <span class="material-symbols-outlined">visibility</span>
                            Ver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

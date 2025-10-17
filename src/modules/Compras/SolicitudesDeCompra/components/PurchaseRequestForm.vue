<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextarea from '@/shared/components/BaseTextArea.vue'
import usePurchaseRequestStore from '@/modules/Compras/SolicitudesDeCompra/store/purchaseRequestStore'
import { usePurchaseRequestActions } from '@/modules/Compras/SolicitudesDeCompra/composables/usePurchaseRequestActions'
import type { CatalogProductType, BudgetValidationType } from '@/modules/Compras/SolicitudesDeCompra/types/purchaseRequestTypes'

const requestStore = usePurchaseRequestStore()
const { getCatalogProducts, validateBudget } = usePurchaseRequestActions()

const areas = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'operaciones', label: 'Operaciones' },
    { id: 'administracion', label: 'Administración' }
]

const catalogProducts = ref<CatalogProductType[]>([])
const searchTerm = ref('')
const budgetValidation = ref<BudgetValidationType | null>(null)
const isLoadingProducts = ref(false)
const isValidatingBudget = ref(false)

const filteredProducts = computed(() => {
    if (!searchTerm.value) return catalogProducts.value
    return catalogProducts.value.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        p.codigo.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

const total = computed(() => requestStore.calculateTotal())

const loadCatalogProducts = async () => {
    isLoadingProducts.value = true
    try {
        catalogProducts.value = await getCatalogProducts()
    } catch (error) {
        console.error('Error loading products:', error)
    } finally {
        isLoadingProducts.value = false
    }
}

const addProduct = (product: CatalogProductType) => {
    requestStore.addItem({
        productoId: product.id,
        codigo: product.codigo,
        nombre: product.nombre,
        cantidad: 1,
        precio: product.precio,
        subtotal: product.precio
    })
}

const removeProduct = (index: number) => {
    requestStore.removeItem(index)
}

const updateQuantity = (index: number, cantidad: number) => {
    requestStore.updateItemQuantity(index, cantidad)
}

const validateBudgetForArea = async () => {
    if (!requestStore.formData.area || total.value === 0) return
    
    isValidatingBudget.value = true
    try {
        budgetValidation.value = await validateBudget(requestStore.formData.area, total.value)
    } catch (error) {
        console.error('Error validating budget:', error)
    } finally {
        isValidatingBudget.value = false
    }
}

watch(() => requestStore.currentStep, (step) => {
    if (step === 2 && catalogProducts.value.length === 0) {
        loadCatalogProducts()
    }
    if (step === 3) {
        validateBudgetForArea()
    }
})
</script>

<template>
    <div class="space-y-4">
        <!-- Indicador de Pasos -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium">Paso {{ requestStore.currentStep }} de 4</span>
                <span class="text-sm text-gray-500">
                    {{ requestStore.currentStep === 1 ? 'Información General' : 
                       requestStore.currentStep === 2 ? 'Selección de Productos' : 
                       requestStore.currentStep === 3 ? 'Validación de Presupuesto' : 
                       'Resumen' }}
                </span>
            </div>
            <div class="w-full bg-base-200 rounded-full h-2">
                <div 
                    class="bg-primary h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${(requestStore.currentStep / 4) * 100}%` }"
                />
            </div>
        </div>

        <!-- Paso 1: Información General -->
        <div v-show="requestStore.currentStep === 1" class="space-y-4">
            <div class="alert alert-info">
                <span class="material-symbols-outlined">info</span>
                <span>Complete la información general de la solicitud</span>
            </div>

            <BaseInput
                name="solicitante"
                label="Solicitante"
                :value="'Usuario Actual'"
                disabled
            />

            <BaseSelect
                name="area"
                label="Área o Departamento"
                placeholder="Seleccionar área"
                :options="areas"
                required
            />

            <BaseTextarea
                name="justificacion"
                label="Justificación"
                placeholder="Describe la necesidad y justificación de esta compra..."
                :rows="4"
                required
            />
        </div>

        <!-- Paso 2: Selección de Productos -->
        <div v-show="requestStore.currentStep === 2" class="space-y-4">
            <div class="alert alert-info">
                <span class="material-symbols-outlined">shopping_cart</span>
                <span>Busca y agrega productos del catálogo</span>
            </div>

            <!-- Buscador -->
            <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    search
                </span>
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Buscar productos o servicios..."
                    class="input input-bordered w-full pl-10"
                />
            </div>

            <!-- Catálogo de Productos -->
            <div class="card bg-base-100 border border-base-content/10 max-h-48 overflow-y-auto">
                <div class="card-body p-3 space-y-2">
                    <div v-if="isLoadingProducts" class="text-center py-4">
                        <span class="loading loading-spinner"></span>
                    </div>
                    <div v-else-if="filteredProducts.length === 0" class="text-center py-4 text-gray-500">
                        No se encontraron productos
                    </div>
                    <div
                        v-else
                        v-for="product in filteredProducts"
                        :key="product.id"
                        class="flex justify-between items-center p-2 hover:bg-base-200 rounded cursor-pointer"
                    >
                        <div>
                            <p class="font-medium text-sm">{{ product.nombre }}</p>
                            <p class="text-xs text-gray-500">{{ product.codigo }} - ${{ product.precio.toLocaleString() }}</p>
                        </div>
                        <button @click="addProduct(product)" class="btn btn-sm btn-primary">
                            <span class="material-symbols-outlined text-sm">add</span>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Productos Seleccionados -->
            <div class="space-y-2">
                <label class="font-semibold">Productos/Servicios Seleccionados</label>
                <div class="card bg-base-100 border border-base-content/10 min-h-[100px]">
                    <div class="card-body p-3">
                        <div v-if="requestStore.formData.items.length === 0" class="text-center py-4 text-gray-500">
                            No hay items seleccionados
                        </div>
                        <div v-else class="space-y-2">
                            <div
                                v-for="(item, index) in requestStore.formData.items"
                                :key="index"
                                class="flex items-center gap-2 p-2 bg-base-200 rounded"
                            >
                                <div class="flex-1">
                                    <p class="font-medium text-sm">{{ item.nombre }}</p>
                                    <p class="text-xs text-gray-500">{{ item.codigo }}</p>
                                </div>
                                <input
                                    type="number"
                                    :value="item.cantidad"
                                    @input="updateQuantity(index, parseInt(($event.target as HTMLInputElement).value) || 1)"
                                    class="input input-sm input-bordered w-20"
                                    min="1"
                                />
                                <span class="text-sm font-semibold w-24 text-right">
                                    ${{ item.subtotal.toLocaleString() }}
                                </span>
                                <button @click="removeProduct(index)" class="btn btn-ghost btn-sm btn-circle">
                                    <span class="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                        
                        <div v-if="requestStore.formData.items.length > 0" class="divider my-2"></div>
                        
                        <div v-if="requestStore.formData.items.length > 0" class="flex justify-end items-center gap-2">
                            <span class="font-semibold">Total:</span>
                            <span class="text-xl font-bold text-primary">
                                ${{ total.toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paso 3: Validación de Presupuesto -->
        <div v-show="requestStore.currentStep === 3" class="space-y-4">
            <div v-if="isValidatingBudget" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-gray-500">Validando presupuesto...</p>
            </div>
            
            <div v-else-if="budgetValidation" class="space-y-4">
                <div class="card bg-base-100 border-2 border-base-content/10">
                    <div class="card-body">
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">account_balance</span>
                            Validación de Presupuesto
                        </h4>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Presupuesto disponible:</span>
                                <span class="font-bold text-green-500">
                                    ${{ budgetValidation.presupuestoDisponible.toLocaleString() }}
                                </span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Monto de esta solicitud:</span>
                                <span class="font-bold">
                                    ${{ budgetValidation.montoSolicitud.toLocaleString() }}
                                </span>
                            </div>
                            <div class="divider my-2"></div>
                            <div class="flex justify-between items-center">
                                <span class="font-semibold">Saldo restante:</span>
                                <span :class="['text-lg font-bold', budgetValidation.suficiente ? 'text-green-500' : 'text-red-500']">
                                    ${{ budgetValidation.saldoRestante.toLocaleString() }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="budgetValidation.suficiente" class="alert alert-success">
                    <span class="material-symbols-outlined">check_circle</span>
                    <div>
                        <p class="font-semibold">Presupuesto Suficiente</p>
                        <p class="text-sm">La solicitud está dentro del presupuesto asignado</p>
                    </div>
                </div>
                <div v-else class="alert alert-error">
                    <span class="material-symbols-outlined">error</span>
                    <div>
                        <p class="font-semibold">Presupuesto Insuficiente</p>
                        <p class="text-sm">El monto excede el presupuesto disponible para esta área</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paso 4: Resumen -->
        <div v-show="requestStore.currentStep === 4" class="space-y-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">summarize</span>
                        Resumen de Solicitud
                    </h4>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <span class="text-gray-500">Solicitante:</span>
                        <span class="font-medium">Usuario Actual</span>
                        <span class="text-gray-500">Área:</span>
                        <span class="font-medium">{{ requestStore.formData.area }}</span>
                        <span class="text-gray-500">Items:</span>
                        <span class="font-medium">{{ requestStore.formData.items.length }} productos/servicios</span>
                        <span class="text-gray-500">Total:</span>
                        <span class="font-bold text-primary">${{ total.toLocaleString() }}</span>
                    </div>
                </div>
            </div>

            <div class="alert alert-info">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <p class="font-semibold">Flujo de Aprobación</p>
                    <p class="text-sm">
                        Esta solicitud será enviada a tu supervisor para aprobación. 
                        Recibirás una notificación con la decisión.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

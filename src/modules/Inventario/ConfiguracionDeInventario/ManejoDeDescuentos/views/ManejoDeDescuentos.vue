<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">Manejo de Descuentos</h2>
            <button @click="openCreateModal" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Descuento
            </button>
        </div>

        <!-- Filtros -->
        <div class="bg-base-200 p-4 rounded-lg">
            <h3 class="font-semibold mb-4">Filtros</h3>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Buscar</span>
                    </label>
                    <input 
                        v-model="discountStore.filters.searchTerm"
                        type="text" 
                        placeholder="Nombre o descripción"
                        class="input input-bordered input-sm w-full"
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Tipo</span>
                    </label>
                    <select v-model="discountStore.filters.type" class="select select-bordered select-sm w-full">
                        <option value="">Todos los tipos</option>
                        <option value="PERCENTAGE">Porcentaje</option>
                        <option value="FIXED_AMOUNT">Monto Fijo</option>
                        <option value="VOLUME">Por Volumen</option>
                        <option value="MIN_QUANTITY">Cantidad Mínima</option>
                        <option value="MIN_AMOUNT">Monto Mínimo</option>
                    </select>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Estado</span>
                    </label>
                    <select v-model="discountStore.filters.status" class="select select-bordered select-sm w-full">
                        <option value="">Todos los estados</option>
                        <option value="ACTIVE">Activo</option>
                        <option value="INACTIVE">Inactivo</option>
                        <option value="EXPIRED">Expirado</option>
                    </select>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Fecha Inicio</span>
                    </label>
                    <input 
                        v-model="discountStore.filters.startDate"
                        type="date" 
                        class="input input-bordered input-sm w-full"
                    />
                </div>

                <div class="flex items-end">
                    <button @click="clearFilters" class="btn btn-outline btn-sm w-full">
                        Limpiar Filtros
                    </button>
                </div>
            </div>
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="stat bg-primary text-primary-content rounded-lg">
                <div class="stat-title text-primary-content/70">Total Descuentos</div>
                <div class="stat-value text-2xl">{{ discountStore.discounts.length }}</div>
            </div>
            <div class="stat bg-success text-success-content rounded-lg">
                <div class="stat-title text-success-content/70">Activos</div>
                <div class="stat-value text-2xl">{{ activeDiscountsCount }}</div>
            </div>
            <div class="stat bg-warning text-warning-content rounded-lg">
                <div class="stat-title text-warning-content/70">Próximos a Expirar</div>
                <div class="stat-value text-2xl">{{ soonToExpireCount }}</div>
            </div>
            <div class="stat bg-error text-error-content rounded-lg">
                <div class="stat-title text-error-content/70">Expirados</div>
                <div class="stat-value text-2xl">{{ expiredDiscountsCount }}</div>
            </div>
        </div>

        <!-- Tabla -->
        <div class="bg-base-100 rounded-lg shadow">
            <p v-if="loading" class="text-center py-8">Cargando descuentos...</p>
            <BaseTable 
                v-else 
                :data="discountStore.filteredDiscounts" 
                :headers="getDiscountsTableColumns()"
                @row-click="onRowClick"
            />
        </div>

        <!-- Modal -->
        <BaseModal
            :onSubmit="onSubmit"
            :modalId="discountStore.modalId"
            :isSubmitting="isSubmitting"
            :onClose="onClose"
        >
            <template v-slot:modalBody>
                <component :is="currentModalComponent" />
            </template>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useDiscount } from '../composables/useDiscount'
import { useDiscountActions } from '../composables/useDiscountActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useDiscountStore from '../store/discount.store'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { createDiscountSchema } from '../validations/discountValidation'
import AddEditDiscountForm from '../components/AddEditDiscountForm.vue'
import DeleteDiscount from '../components/DeleteDiscount.vue'

// Stores y composables
const discountStore = useDiscountStore()
const modalStore = useModalStore()
const { getDiscounts, getDiscountsTableColumns } = useDiscount()
const { createDiscount, updateDiscount, deleteDiscount, openEditModal, openDeleteModal, openCreateModal } = useDiscountActions()

// Estado
const loading = ref(false)

// Configuración del formulario
const initialValues = computed(() => ({
    name: discountStore.selectedDiscount.name || '',
    description: discountStore.selectedDiscount.description || '',
    type: discountStore.selectedDiscount.type || 'PERCENTAGE',
    value: discountStore.selectedDiscount.value || 0,
    minQuantity: discountStore.selectedDiscount.minQuantity || undefined,
    minAmount: discountStore.selectedDiscount.minAmount || undefined,
    maxUses: discountStore.selectedDiscount.maxUses || undefined,
    couponCode: discountStore.selectedDiscount.couponCode || '',
    startDate: discountStore.selectedDiscount.startDate ? 
        new Date(discountStore.selectedDiscount.startDate).toISOString().slice(0, 16) : '',
    endDate: discountStore.selectedDiscount.endDate ? 
        new Date(discountStore.selectedDiscount.endDate).toISOString().slice(0, 16) : '',
    status: discountStore.selectedDiscount.status || 'ACTIVE',
    applicationType: discountStore.selectedDiscount.applicationType || 'ALL_PRODUCTS',
    canCombine: discountStore.selectedDiscount.canCombine || false,
    active: discountStore.selectedDiscount.active !== undefined ? 
        discountStore.selectedDiscount.active : true
}))

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createDiscountSchema),
    validateOnMount: false,
    initialValues
})

// Mapeo de componentes del modal
const modalMap = {
    CREATE: { component: AddEditDiscountForm, action: createDiscount },
    EDIT: { component: AddEditDiscountForm, action: updateDiscount },
    DELETE: { component: DeleteDiscount, action: deleteDiscount }
}

// Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[discountStore.modalId]?.type
    return modalMap[modalType]?.component
})

const activeDiscountsCount = computed(() => {
    return discountStore.discounts.filter(d => d.status === 'ACTIVE' && d.active).length
})

const expiredDiscountsCount = computed(() => {
    return discountStore.discounts.filter(d => d.status === 'EXPIRED').length
})

const soonToExpireCount = computed(() => {
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return discountStore.discounts.filter(d => 
        d.status === 'ACTIVE' && 
        new Date(d.endDate) <= nextWeek && 
        new Date(d.endDate) > now
    ).length
})

// Métodos
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[discountStore.modalId].type
    const action = modalMap[modalType]?.action
    
    if (!action) return
    
    try {
        // Convertir fechas string a Date objects
        const processedValues = {
            ...formValues,
            startDate: new Date(formValues.startDate),
            endDate: new Date(formValues.endDate),
            ...(modalType === 'EDIT' && { id: discountStore.selectedDiscount.id })
        }
        
        const result = await action(processedValues)
        
        if (result.success) {
            console.log(result.message)
        }
    } catch (error) {
        console.error('Error en la operación:', error)
    }
})

const onClose = () => {
    resetForm()
    discountStore.setData()
}

const onRowClick = (discount: any) => {
    // Aquí puedes manejar el click en una fila si es necesario
}

const clearFilters = () => {
    discountStore.clearFilters()
}

// Watchers
watch(
    () => discountStore.selectedDiscount,
    (discount) => {
        if (discount && discount.id) {
            setValues(initialValues.value)
        }
    },
    { immediate: true }
)

// Lifecycle
onMounted(async () => {
    loading.value = true
    try {
        await getDiscounts()
    } catch (error) {
        console.error('Error loading discounts:', error)
    } finally {
        loading.value = false
    }
})

// Configurar event listeners para los botones de la tabla
const setupTableEventListeners = () => {
    // Este método se puede llamar después de que se renderice la tabla
    // Para manejar los clicks en los botones de editar y eliminar
}
</script>
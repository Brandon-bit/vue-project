<script setup lang="ts">
import { computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useModalStore } from '@/shared/stores/modal.store'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { usePayrollDetailActions } from '@/modules/Nomina/DetalleNomina/composables/usePayrollDetailActions'
import { showNotification } from '@/utils/toastNotifications'

// Componentes de contenido
import PayrollDetailForm from '@/modules/Nomina/DetalleNomina/components/PayrollDetailForm.vue'
import DeletePayrollDetail from '@/modules/Nomina/DetalleNomina/components/DeletePayrollDetail.vue'
import ImportPayrollCSV from '@/modules/Nomina/DetalleNomina/components/ImportPayrollCSV.vue'
import PayrollDispersionContent from '@/modules/Nomina/DetalleNomina/components/PayrollDispersionContent.vue'

// Validaciones
import { 
    createUpdatePayrollDetailSchema, 
    deletePayrollDetailSchema,
    importPayrollSchema,
    payrollDispersionSchema
} from '@/modules/Nomina/DetalleNomina/validations/payrollDetailValidation'

const props = defineProps<{
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const payrollDetailStore = usePayrollDetailStore()
const { createPayrollDetail, updatePayrollDetail, deletePayrollDetail, importPayrollFromCSV, processPayrollDispersion } = usePayrollDetailActions()

const mode = computed(() => modalStore.modals[payrollDetailStore.modalId]?.type)

// Mapa de componentes y acciones según el tipo de modal
const modalMap = {
    CREATE: {
        component: PayrollDetailForm,
        action: createPayrollDetail,
        schemaValidation: createUpdatePayrollDetailSchema,
        showFooter: true
    },
    UPDATE: {
        component: PayrollDetailForm,
        action: updatePayrollDetail,
        schemaValidation: createUpdatePayrollDetailSchema,
        showFooter: true
    },
    DELETE: {
        component: DeletePayrollDetail,
        action: deletePayrollDetail,
        schemaValidation: deletePayrollDetailSchema,
        showFooter: true
    },
    IMPORT: {
        component: ImportPayrollCSV,
        action: importPayrollFromCSV,
        schemaValidation: importPayrollSchema,
        showFooter: true
    },
    DISPERSION: {
        component: PayrollDispersionContent,
        action: processPayrollDispersion,
        schemaValidation: payrollDispersionSchema,
        showFooter: true
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || createUpdatePayrollDetailSchema
})

const currentModalComponent = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const initialValues = {
    payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
    employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0,
    conceptId: payrollDetailStore.selectedPayrollDetail?.conceptId || 0,
    amount: payrollDetailStore.selectedPayrollDetail?.amount || 0,
    type: payrollDetailStore.selectedPayrollDetail?.type || 'percepcion',
    notes: payrollDetailStore.selectedPayrollDetail?.notes || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => 
        currentSchema.value ? toTypedSchema(currentSchema.value) : undefined
    ),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => payrollDetailStore.selectedPayrollDetail,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ 
                payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
                employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0,
                conceptId: 0,
                amount: 0,
                type: 'percepcion',
                notes: ''
            })
        }
    }
)

watch(
    () => mode.value,
    (newMode) => {
        if (newMode === 'DISPERSION') {
            resetForm()
            setValues({ selectedBank: 0 })
        } else if (newMode === 'IMPORT') {
            resetForm()
            setValues({ csvFile: [] })
        }
    }
)

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = mode.value as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    if (!action) return

    try {
        let dataToSend: any

        if (modalType === 'IMPORT') {
            dataToSend = formValues
        } else if (modalType === 'DISPERSION') {
            const modalData = modalStore.modals[payrollDetailStore.modalId]?.data
            dataToSend = {
                ...formValues,
                periodId: modalData?.periodId || payrollDetailStore.currentPayrollPeriodId || 0,
                periodName: modalData?.periodName || 'Nómina',
                employees: modalData?.employees || []
            }
        } else {
            dataToSend = {
                ...formValues,
                id: payrollDetailStore.selectedPayrollDetail?.id,
                payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
                employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0
            }
        }

        const { message, status } = await action(dataToSend as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(payrollDetailStore.modalId)
    } catch (error: any) {
        showNotification(error.message || 'Error al procesar', 'error')
    }
})

const onClose = () => {
    resetForm()
    payrollDetailStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="payrollDetailStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

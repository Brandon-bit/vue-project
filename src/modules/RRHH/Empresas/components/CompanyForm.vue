<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { nextTick, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormSelectMultiple from '@/shared/components/BaseFormSelectMultiple.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import { companySchema } from '@/modules/RRHH/Empresas/validations/companyValidation'
import { useCompanyActions } from '@/modules/RRHH/Empresas/composables/useCompanyActions'
import { DepartmentDTO } from '@/modules/RRHH/Empresas/types/companyTypes'

const route = useRoute()
const isEditMode = computed(() => route.name === 'Actualizar empresa')
const pageTitle = computed(() => (isEditMode.value ? 'Actualizar empresa' : 'Crear nueva empresa'))

interface SelectOptionsType {
    id: number
    label: string
}

const payrollPolicies: SelectOptionsType[] = [
    { id: 1, label: 'Semanal' },
    { id: 2, label: 'Quincenal' },
    { id: 3, label: 'Mensual' }
]

const { createCompany, updateCompany, getCompanyById, getDepartments } = useCompanyActions()

const departments = ref<DepartmentDTO[]>([])

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(companySchema),
    validateOnMount: false,
    initialValues: {
        businessName: '',
        taxId: '',
        fiscalAddress: '',
        initialVacationDays: 12,
        payrollPolicy: undefined,
        departments: [],
        csdPassword: ''
    }
})

onMounted(async () => {
    // Load departments
    departments.value = await getDepartments()

    // Load company data if editing
    if (isEditMode.value) {
        const companyId = parseInt(route.params.id as string)
        if (companyId) {
            const companyData = await getCompanyById(companyId)
            resetForm({ values: companyData })
        }
    }
})

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log('Form Values:', formValues)
        let result
        if (isEditMode.value) {
            const companyId = parseInt(route.params.id as string)
            result = await updateCompany(companyId, formValues)
        } else {
            result = await createCompany(formValues)
        }
        console.log('Result:', result)
    },
    async () => {
        await nextTick()

        const firstErrorElement = document.querySelector(
            '.select-error,.input-error,.textarea-error'
        )

        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            const focusableElement = firstErrorElement as HTMLElement
            focusableElement.focus?.()
        }
    }
)
</script>

<template>
    <div>
        <BaseFormPageTitle :title="pageTitle" />
        <div class="lg:max-w-[70%] lg:mx-auto">
            <form @submit="onSubmit">
                <!-- COLLAPSE DATOS GENERALES -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="company-general-data" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Datos Generales
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Business Name -->
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="businessName"
                                label="Razón Social"
                                :required="true"
                                placeholder="Nombre legal de la empresa"
                            />
                            <!-- Tax ID (RFC) -->
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="taxId"
                                label="RFC"
                                :required="true"
                                placeholder="RFC de la empresa"
                            />
                            <!-- Fiscal Address -->
                            <BaseTextArea
                                class="col-span-12"
                                name="fiscalAddress"
                                label="Domicilio Fiscal"
                                placeholder="Dirección completa"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE CONFIGURACIÓN LABORAL -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="company-labor-config" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Configuración Laboral
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Initial Vacation Days -->
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="initialVacationDays"
                                type="number"
                                label="Días de Vacaciones Iniciales"
                                :required="true"
                            />
                            <!-- Payroll Policy -->
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="payrollPolicy"
                                label="Política de Nómina"
                                :options="payrollPolicies"
                                :required="true"
                            />
                            <!-- Holiday Info -->
                            <div class="col-span-12">
                                <label class="font-semibold">Días Festivos</label>
                                <div class="text-sm text-base-content/70 mt-2">
                                    Se aplicarán los días festivos oficiales de México por defecto.
                                    Puedes personalizarlos después.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE ESTRUCTURA ORGANIZACIONAL -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="company-organizational-structure" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Estructura Organizacional
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Departments Multi-Select -->
                            <BaseFormSelectMultiple
                                class="col-span-12"
                                name="departments"
                                label="Departamentos"
                                :options="departments"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE DATOS FISCALES -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="company-fiscal-data" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Datos Fiscales
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- CSD Certificate Upload -->
                            <BaseFormInputFile
                                class="col-span-12"
                                name="satCertificate"
                                label="Certificado de Sello Digital (CSD)"
                                :multiple="true"
                                accept=".cer,.key"
                            />
                            <!-- CSD Password -->
                            <BaseFormInput
                                class="col-span-12"
                                name="csdPassword"
                                type="password"
                                label="Contraseña del CSD"
                                placeholder="Ingresa la contraseña"
                            />
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <BaseFormActionButtons
                    :is-submitting="isSubmitting"
                    :is-edit-mode="isEditMode"
                    submit-text="empresa"
                />
            </form>
        </div>
    </div>
</template>

<style>
/* Allow multiselect dropdown to be visible inside accordion */
.collapse-arrow:has(.multiselect--active) {
    overflow: visible !important;
}

.collapse-arrow:has(.multiselect--active) .collapse-content {
    overflow: visible !important;
    min-height: 350px !important;
}

/* Ensure proper spacing for the multiselect */
.collapse-content:has(.multiselect) {
    padding-bottom: 250px !important;
}

/* Reset padding when multiselect is closed */
.collapse-content:has(.multiselect:not(.multiselect--active)) {
    padding-bottom: 1rem !important;
}

/* Ensure the multiselect dropdown has proper z-index */
.multiselect__content-wrapper {
    z-index: 50 !important;
}
</style>

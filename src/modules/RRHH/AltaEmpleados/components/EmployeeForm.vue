<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { nextTick, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { employeeSchema } from '@/modules/RRHH/AltaEmpleados/validations/employeeValidation'
import { useEmployeeActions } from '@/modules/RRHH/AltaEmpleados/composables/useEmployeeActions'
import { SelectOptionDTO } from '@/modules/RRHH/AltaEmpleados/types/employeeTypes'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar empleado')
const pageTitle = computed(() => 
    isEditMode.value ? 'Actualizar Empleado' : 'Registrar Nuevo Empleado'
)

const { 
    createEmployee, 
    updateEmployee, 
    getEmployeeById, 
    getCompanies,
    getDepartments,
    getContractTypes,
    getSupervisors
} = useEmployeeActions()

const companies = ref<SelectOptionDTO[]>([])
const departments = ref<SelectOptionDTO[]>([])
const contractTypes = ref<SelectOptionDTO[]>([])
const supervisors = ref<SelectOptionDTO[]>([])

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(employeeSchema),
    validateOnMount: false,
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        taxId: '',
        address: '',
        hireDate: '',
        company: undefined,
        department: undefined,
        position: '',
        salary: undefined,
        contractType: undefined,
        reportsTo: undefined
    }
})

onMounted(async () => {
    // Load select options
    companies.value = await getCompanies()
    departments.value = await getDepartments()
    contractTypes.value = await getContractTypes()
    supervisors.value = await getSupervisors()
    
    // Load employee data if editing
    if (isEditMode.value) {
        const employeeId = parseInt(route.params.id as string)
        if (employeeId) {
            const employeeData = await getEmployeeById(employeeId)
            resetForm({ values: employeeData })
        }
    }
})

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log('Form Values:', formValues)
        let result
        if (isEditMode.value) {
            const employeeId = parseInt(route.params.id as string)
            result = await updateEmployee(employeeId, formValues)
        } else {
            result = await createEmployee(formValues)
        }
        console.log('Result:', result)
        
        // Redirect to list after successful submission
        if (result.success) {
            router.push('/rrhh/empleados')
        }
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
        <h2 class="text-center mb-10">{{ pageTitle }}</h2>
        <form @submit="onSubmit">
            <!-- COLLAPSE DATOS PERSONALES -->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="employee-personal-data" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Datos Personales
                </div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- First Name -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="firstName"
                            label="Nombre(s)"
                            :required="true"
                            placeholder="Nombre completo"
                        />
                        <!-- Last Name -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="lastName"
                            label="Apellidos"
                            :required="true"
                            placeholder="Apellido paterno y materno"
                        />
                        <!-- Email -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="email"
                            type="email"
                            label="Correo Electrónico"
                            :required="true"
                            placeholder="correo@empresa.com"
                        />
                        <!-- Phone -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="phone"
                            label="Teléfono"
                            :required="true"
                            placeholder="+52 555 123 4567"
                        />
                        <!-- Birth Date -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="birthDate"
                            type="date"
                            label="Fecha de Nacimiento"
                            :required="true"
                        />
                        <!-- Tax ID (RFC) -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="taxId"
                            label="RFC"
                            :required="true"
                            placeholder="RFC del empleado"
                        />
                        <!-- Address -->
                        <BaseFormInput
                            class="col-span-12"
                            name="address"
                            label="Dirección"
                            :required="true"
                            placeholder="Calle, número, colonia, ciudad"
                        />
                    </div>
                </div>
            </div>

            <!-- COLLAPSE INFORMACIÓN LABORAL -->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="employee-work-info" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Información Laboral
                </div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- Hire Date -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="hireDate"
                            type="date"
                            label="Fecha de Ingreso"
                            :required="true"
                        />
                        <!-- Company -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="company"
                            label="Empresa"
                            :options="companies"
                            :required="true"
                        />
                        <!-- Department -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="department"
                            label="Departamento"
                            :options="departments"
                            :required="true"
                        />
                        <!-- Position -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="position"
                            label="Puesto"
                            :required="true"
                            placeholder="Título del puesto"
                        />
                        <!-- Salary -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="salary"
                            type="number"
                            label="Salario Mensual"
                            :required="true"
                            placeholder="0.00"
                        />
                        <!-- Contract Type -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="contractType"
                            label="Tipo de Contrato"
                            :options="contractTypes"
                            :required="true"
                        />
                        <!-- Reports To -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="reportsTo"
                            label="Reporta a"
                            :options="supervisors"
                        />
                    </div>
                </div>
            </div>

            <!-- COLLAPSE DOCUMENTOS -->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="employee-documents" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Documentos
                </div>
                <div class="collapse-content text-sm">
                    <div class="space-y-4">
                        <div class="border-2 border-dashed rounded-lg p-8 text-center">
                            <span class="material-symbols-outlined text-5xl text-base-content/50 mb-2">
                                upload_file
                            </span>
                            <p class="text-sm text-base-content/70 mb-4">
                                Arrastra archivos aquí o haz clic para seleccionar
                            </p>
                            <button type="button" class="btn btn-outline btn-sm">
                                Seleccionar Archivos
                            </button>
                        </div>
                        <div class="space-y-2">
                            <h4 class="font-semibold text-sm">Documentos Requeridos:</h4>
                            <ul class="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                                <li>Identificación oficial (INE/IFE)</li>
                                <li>Comprobante de domicilio (no mayor a 3 meses)</li>
                                <li>Acta de nacimiento</li>
                                <li>Comprobante de estudios</li>
                                <li>RFC</li>
                                <li>CURP</li>
                                <li>NSS (Número de Seguro Social)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-12 justify-end gap-4 mt-10">
                <button 
                    type="button" 
                    @click="router.back()" 
                    class="btn col-span-6"
                >
                    Regresar
                </button>
                <button 
                    type="submit" 
                    class="btn btn-primary col-span-6" 
                    :disabled="isSubmitting"
                >
                    <template v-if="isSubmitting">
                        <span class="loading loading-spinner"></span>
                        Procesando...
                    </template>
                    <template v-else>
                        {{ isEditMode ? 'Actualizar' : 'Crear Empleado' }}
                    </template>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { nextTick, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import { employeeSchema } from '@/modules/RRHH/Empleados/validations/employeeValidation'
import { useEmployeeActions } from '@/modules/RRHH/Empleados/composables/useEmployeeActions'
import { SelectOptionDTO } from '@/modules/RRHH/Empleados/types/employeeTypes'
import { usePositionActions } from '@/modules/RRHH/Puestos/composables/usePositionActions'
import { useBranchActions } from '@/modules/RRHH/Sucursales/composables/useBranchActions'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar empleado')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar empleado' : 'Crear nuevo empleado'
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

const { getPositionsByDepartment } = usePositionActions()
const { getBranchesByCompany } = useBranchActions()

const companies = ref<SelectOptionDTO[]>([])
const departments = ref<SelectOptionDTO[]>([])
const contractTypes = ref<SelectOptionDTO[]>([])
const supervisors = ref<SelectOptionDTO[]>([])
const filteredPositions = ref<SelectOptionDTO[]>([])
const filteredBranches = ref<SelectOptionDTO[]>([])

const { handleSubmit, isSubmitting, resetForm, values } = useForm({
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
        company: 0,
        department: 0,
        position: 0,
        branch: 0,
        salary: undefined,
        contractType: 0,
        reportsTo: 0
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

// Watch department changes to filter positions
watch(
    () => values.department,
    async (selectedDepartment) => {
        console.log('Department changed:', selectedDepartment, 'type:', typeof selectedDepartment)
        // Convert to number if it's a string
        const departmentId = typeof selectedDepartment === 'string' ? parseInt(selectedDepartment) : selectedDepartment
        
        if (departmentId && departmentId !== 0 && !isNaN(departmentId)) {
            try {
                const positions = await getPositionsByDepartment(departmentId)
                console.log('Positions received:', positions)
                filteredPositions.value = positions.map((pos) => ({
                    id: pos.id,
                    label: pos.name
                }))
                console.log('Filtered positions:', filteredPositions.value)
            } catch (error) {
                console.error('Error loading positions:', error)
                filteredPositions.value = []
            }
        } else {
            filteredPositions.value = []
        }
        // Reset position if department changes
        if (values.position && departmentId) {
            const positionExists = filteredPositions.value.find(
                (pos: any) => pos.id === values.position
            )
            if (!positionExists) {
                values.position = 0
            }
        }
    }
)

// Watch company changes to filter branches
watch(
    () => values.company,
    async (selectedCompany) => {
        console.log('Company changed:', selectedCompany, 'type:', typeof selectedCompany)
        // Convert to number if it's a string
        const companyId = typeof selectedCompany === 'string' ? parseInt(selectedCompany) : selectedCompany
        
        if (companyId && companyId !== 0 && !isNaN(companyId)) {
            try {
                const branches = await getBranchesByCompany(companyId)
                console.log('Branches received:', branches)
                filteredBranches.value = branches.map((branch) => ({
                    id: branch.id,
                    label: branch.name
                }))
                console.log('Filtered branches:', filteredBranches.value)
            } catch (error) {
                console.error('Error loading branches:', error)
                filteredBranches.value = []
            }
        } else {
            filteredBranches.value = []
        }
        // Reset branch if company changes
        if (values.branch && companyId) {
            const branchExists = filteredBranches.value.find(
                (branch: any) => branch.id === values.branch
            )
            if (!branchExists) {
                values.branch = 0
            }
        }
    }
)

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
        <BaseFormPageTitle :title="pageTitle" />
        <div class="lg:max-w-[70%] lg:mx-auto">
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
                            <!-- Branch -->
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="branch"
                                label="Sucursal"
                                :options="filteredBranches"
                                :required="true"
                                :disabled="!values.company || values.company === 0"
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
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="position"
                                label="Puesto"
                                :options="filteredPositions"
                                :required="true"
                                :disabled="!values.department || values.department === 0"
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
                    <input type="checkbox" name="employee-documents" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Documentos
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Employee Documents Upload -->
                            <BaseFormInputFile
                                class="col-span-12"
                                name="employeeDocuments"
                                label="Documentos del Empleado"
                                :multiple="true"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <!-- Required Documents Info -->
                            <div class="col-span-12">
                                <h4 class="font-semibold text-sm mb-2">Documentos Requeridos:</h4>
                                <ul
                                    class="text-sm text-base-content/70 space-y-1 list-disc list-inside"
                                >
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
                <BaseFormActionButtons
                    :is-submitting="isSubmitting"
                    :is-edit-mode="isEditMode"
                    submit-text="empleado"
                />
            </form>
        </div>
    </div>
</template>

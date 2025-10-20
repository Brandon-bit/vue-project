<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import { useDepartmentActions } from '@/modules/RRHH/Departamentos/composables/useDepartmentActions'

interface SelectOptionsType {
    id: number
    label: string
}

const { getDepartmentsForSelect } = useDepartmentActions()
const departments = ref<SelectOptionsType[]>([])
const loadingDepartments = ref(true)

onMounted(async () => {
    try {
        // Load all departments for the select
        const response = await getDepartmentsForSelect()
        departments.value = response.map((dept: any) => ({
            id: dept.id,
            label: dept.label
        }))
    } catch (error) {
        console.error('Error loading departments:', error)
    } finally {
        loadingDepartments.value = false
    }
})
</script>

<template>
    <div class="grid grid-cols-12 gap-5">
        <!-- Department Select -->
        <BaseFormSelect
            class="col-span-12"
            name="departmentId"
            label="Departamento"
            :options="departments"
            :required="true"
            :disabled="loadingDepartments"
        />

        <!-- Position Name -->
        <BaseFormInput
            class="col-span-12"
            name="name"
            label="Nombre del Puesto"
            :required="true"
            placeholder="Ej: Gerente de Ventas"
        />

        <!-- Description -->
        <BaseTextArea
            class="col-span-12"
            name="description"
            label="Descripción"
            :required="true"
            placeholder="Descripción de las responsabilidades del puesto"
        />

        <!-- Status -->
        <BaseFormCheckbox
            class="col-span-12 mt-4"
            name="active"
            label="Estado"
        />
    </div>
</template>

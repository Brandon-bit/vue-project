<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import { useCompanyActions } from '@/modules/RRHH/Empresas/composables/useCompanyActions'
import { CompanyDTO } from '@/modules/RRHH/Empresas/types/companyTypes'

interface SelectOptionsType {
    id: number
    label: string
}

const { getCompanies } = useCompanyActions()
const companies = ref<SelectOptionsType[]>([])
const loadingCompanies = ref(true)

onMounted(async () => {
    try {
        // Load all companies for the select
        const response = await getCompanies(1, 100) // Get first 100 companies
        companies.value = response.items.map((company: CompanyDTO) => ({
            id: company.id,
            label: company.businessName
        }))
    } catch (error) {
        console.error('Error loading companies:', error)
    } finally {
        loadingCompanies.value = false
    }
})
</script>

<template>
    <div class="grid grid-cols-12 gap-5">
        <!-- Company Select -->
        <BaseFormSelect
            class="col-span-12"
            name="companyId"
            label="Empresa"
            :options="companies"
            :required="true"
            :disabled="loadingCompanies"
        />

        <!-- Branch Name -->
        <BaseFormInput
            class="col-span-12"
            name="name"
            label="Nombre de la Sucursal"
            :required="true"
            placeholder="Ej: Sucursal Centro"
        />

        <!-- Address -->
        <BaseTextArea
            class="col-span-12"
            name="address"
            label="Dirección"
            :required="true"
            placeholder="Dirección completa de la sucursal"
        />

        <!-- Phone -->
        <BaseFormInput
            class="col-span-12"
            name="phone"
            label="Teléfono"
            :required="true"
            placeholder="10 dígitos"
            type="tel"
        />

        <!-- Status -->
        <BaseFormCheckbox
            class="col-span-12 mt-4"
            name="active"
            label="Estado"
        />
    </div>
</template>

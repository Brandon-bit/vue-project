<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useCompanies } from '@rrhh/Empresas/composables/useCompanies'
import { useCompanyActions } from '@rrhh/Empresas/composables/useCompanyActions'
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useCompanies()
const { getCompanies } = useCompanyActions()

const tablaRef = ref()
</script>

<template>
    <BaseTitle 
        title="Empresas" 
        subtitle="Gestión de empresas"
    />
    <div class="mb-10 flex gap-4 justify-end">
        <router-link to="/rrhh/empresas/crear">
            <BaseButton text="Nueva empresa" icon="add" />
        </router-link>
    </div>
    
    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()" 
        :fetch-callback="getCompanies"
    />
</template>

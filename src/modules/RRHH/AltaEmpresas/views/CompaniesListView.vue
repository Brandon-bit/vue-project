<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useCompanies } from '@rrhh/AltaEmpresas/composables/useCompanies'
import { useCompanyActions } from '@rrhh/AltaEmpresas/composables/useCompanyActions'
import { ref } from 'vue'

const { getTableColumns } = useCompanies()
const { getCompanies } = useCompanyActions()

const tablaRef = ref()
</script>

<template>
    <h2 class="text-center mb-8">Empresas</h2>

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

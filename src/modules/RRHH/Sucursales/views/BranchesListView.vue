<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useBranches } from '@/modules/RRHH/Sucursales/composables/useBranches'
import { useBranchActions } from '@/modules/RRHH/Sucursales/composables/useBranchActions'
import BranchModal from '@/modules/RRHH/Sucursales/components/BranchModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const { getTableColumns, MODAL_ID } = useBranches()
const { getBranches } = useBranchActions()
const modalStore = useModalStore()

const tablaRef = ref()

const handleNewBranch = () => {
    modalStore.open(MODAL_ID, {
        type: 'CREATE',
        title: 'Nueva sucursal',
        data: null
    })
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Sucursales" 
            subtitle="Gestión de sucursales"
        />
        
        <div class="mb-10 flex gap-4 justify-end">
            <BaseButton 
                text="Nueva sucursal" 
                icon="add" 
                @click="handleNewBranch" 
            />
        </div>
        
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()" 
            :fetch-callback="getBranches"
        />

        <BranchModal 
            :modal-id="MODAL_ID" 
            :on-refresh="tablaRef?.fetchData" 
        />
    </div>
</template>

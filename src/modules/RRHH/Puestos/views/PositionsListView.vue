<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { usePositions } from '@/modules/RRHH/Puestos/composables/usePositions'
import { usePositionActions } from '@/modules/RRHH/Puestos/composables/usePositionActions'
import PositionModal from '@/modules/RRHH/Puestos/components/PositionModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'

const { getTableColumns, MODAL_ID } = usePositions()
const { getPositions } = usePositionActions()
const modalStore = useModalStore()

const tablaRef = ref()

const handleNewPosition = () => {
    modalStore.open(MODAL_ID, {
        type: 'CREATE',
        title: 'Nuevo puesto',
        data: null
    })
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Puestos" 
            subtitle="Gestión de puestos de trabajo"
        />
        
        <div class="mb-10 flex gap-4 justify-end">
            <BaseButton 
                text="Nuevo puesto" 
                icon="add" 
                @click="handleNewPosition" 
            />
        </div>
        
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()" 
            :fetch-callback="getPositions"
        />

        <PositionModal 
            :modal-id="MODAL_ID" 
            :on-refresh="tablaRef?.fetchData" 
        />
    </div>
</template>

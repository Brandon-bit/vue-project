<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useDepartmentStore from '@/modules/RRHH/Departamentos/store/departmentStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const departmentStore = useDepartmentStore()

const openCreateModal = () => {
    departmentStore.setData()
    modalStore.open(departmentStore.modalId, { type: 'CREATE', title: 'Nuevo departamento' })
}
</script>

<template>
    <BaseButton text="Nuevo departamento" @click="openCreateModal" icon="add" />
</template>

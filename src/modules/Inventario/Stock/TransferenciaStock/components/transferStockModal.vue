<script setup lang="ts">

import BaseModal from '@/shared/components/BaseModal.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
 

import addEditForm from '@/modules/Inventario/Stock/TransferenciaStock/components/addEditform.vue'
import { showNotification } from '@/utils/toastNotifications'
import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'
import {useTransferActions} from '@/modules/Inventario/Stock/TransferenciaStock/composables/useTransfeActions'


const props = defineProps<{
  onRefresh?: () => void
}>()

//variables que importas 
const transferStore = useTransferStore()
const modalStore = useModalStore()
const {createTransfer } = useTransferActions()


//iniicar valores.Lo que van a mostrar los modales

const initialValues ={
        idWarehouseOrigin: transferStore.selectedTransfer.idWarehouseOrigin,
    idWarehouseDestination: transferStore.selectedTransfer.idWarehouseDestination,
    transferDate: transferStore.selectedTransfer.transferDate,
    driver: transferStore.selectedTransfer.driver,
    remarks: transferStore.selectedTransfer.remarks,
    idProducto: null,
    quantity: 1
}

const { handleSubmit, isSubmitting, resetForm, setValues, values } = useForm({

    
    initialValues: initialValues
})

    
watch(
    () => transferStore.selectedTransfer,
    (transferStock) => {
        if (transferStock) {
            setValues({
                idWarehouseOrigin: transferStock?.idWarehouseOrigin,
            idWarehouseDestination: transferStock?.idWarehouseDestination,
            transferDate: transferStock?.transferDate,
            driver: transferStock?.driver,
            remarks: transferStock?.remarks,
            idProducto: transferStock?.idProduct,
           quantity: transferStock?.quantity
            })  
        }
    },
    { immediate: true }
)


const modalMap = {
  CREATE: {
        component: addEditForm,
        action: createTransfer
    },
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[transferStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[transferStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(transferStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    transferStore.setData()
}




</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="transferStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
            <pre>{{ values }}</pre>
        </template>
    </BaseModal>
</template>


<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useSaleStore from '@/modules/Sales/Sales/online-orders/store/saleStore'
import { computed, ref, watch } from 'vue'
import AddEditForm from '@/modules/Sales/Sales/online-orders/components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useForm } from 'vee-validate'
import { showNotification } from '@/utils/toastNotifications'
import { useSaleActions } from '@/modules/Sales/Sales/online-orders/composables/useSaleActions'
import DeleteSale from "../components/DeleteSale.vue";

const props = defineProps<{
  onRefresh?: () => void
}>()

const saleStore = useSaleStore()
const modalStore = useModalStore()  
const { createSale, editSale, deletSale } = useSaleActions()

//pendiente las actions

const initialValues = {
    name: saleStore.selectedSale?.name,
    reference: saleStore.selectedSale?.reference,
     sale_date: saleStore.selectedSale?.sale_date,
     grand_total: saleStore.selectedSale?.grand_total,
     paid: saleStore.selectedSale?.paid,
     due: saleStore.selectedSale?.due,
     payment_status: saleStore.selectedSale?.payment_status,
     status: saleStore.selectedSale?.status,
     biller_name: saleStore.selectedSale?.biller_name,
    
}


const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
   
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => saleStore.selectedSale,
    (sale) => {
        if (sale) {
            setValues({
                name: sale?.name,
                reference: sale?.reference,
                sale_date: sale?.sale_date,
                grand_total: sale?.grand_total,
                paid: sale?.paid,
                due: sale?.due,
                payment_status: sale?.payment_status,
                status: sale?.status,
                biller_name: sale?.biller_name,
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditForm,
        action: createSale
    },

   EDIT: {
        component: AddEditForm,
        action: editSale
    },

    DELETE: {
        component: DeleteSale,
        action: deletSale
    }

}


///se utilizand despues dentro del componente 
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[saleStore.modalId]?.type
    return modalMap[modalType]?.component
})


//igual esta 
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[saleStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(saleStore.modalId)
    } catch (error) {
        console.error(error)
    }
})


//igual esta
const onClose = () => {
    resetForm()
    saleStore.setData()
}

</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="saleStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
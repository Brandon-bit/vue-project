<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { watch, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'
import useCreateProductStore from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore'
import { addVariantProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import { CreateVariantFormType } from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import useCreateProductActions from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useCreateProductActions'
import { ProductSkuCodeType } from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import { mapVariantAttributeType } from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/composables/mappingCreateProductData'

const initialValues : CreateVariantFormType = useCreateProductStore().currentVariantInfo

const modalId = 'add-variable-product-modal'
const createProductStore = useCreateProductStore()
const modalStore = useModalStore()

const {
    getVariantAttributesOptions,
    getVariantAttributesValues,
} = useCreateProductActions()



const {
    handleSubmit,
    values,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(addVariantProductSchema),
    validateOnMount: false,
    initialValues: initialValues
})


watch(() => values.idVariant, (newValue) => {
    if (newValue !== null && newValue !== undefined && newValue !== "") {
        getVariantAttributesValues(String(newValue))
    }
})

watch(
    () => createProductStore.currentVariantInfo,
    (variant) => {
        if (variant) {
            setValues({
                idVariant: variant?.idVariant,
                variantValue: variant?.variantValue,
                variantPrice: variant?.variantPrice
            })
        }
    },
    { immediate: true }
)

const createVariant = (formValues: CreateVariantFormType) => {
    if(!createProductStore.currentProductInfo) return;
    createProductStore.variantsData.push(mapVariantAttributeType(formValues))
    return 'Variante agregada correctamente'
}

// const editVariant = (formValues: CreateVariantFormType) => {
//     createProductStore.variantsData[createProductStore.currentVariantRef] = formValues
//     createProductStore.variantsData[createProductStore.currentVariantRef].dragDropImage =
//         dragImagesRef.value
//     dragImagesRef.value = []
//     return 'Variante editada correctamente'
// }

const modalMap = {
    CREATE: {
        action: createVariant
    },
    // EDIT: {
    //     action: editVariant
    // }
}
const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
    const modalType = modalStore.modals[createProductStore.modalId]?.type
    const action = modalMap[modalType]?.action
    const messageResult = await action(formValues)
    resetForm()
    showNotification(messageResult, 'success')
    modalStore.close(createProductStore.modalId)
})

onMounted(async () => {
    await getVariantAttributesOptions()
})

const onClose = () => {
    resetForm()
    createProductStore.setVariantData()
}

// const generateSKUOrBarcode = async (option: 'sku' | 'barcode') => {
//     const idCategory = useCreateProductStore().idCategorySelected
//     const isSubcategory = useCreateProductStore().idSubCategorySelected

//     const name = option === 'sku' ? 'skuVariant' : 'variantItemBarcode'

//     if (idCategory == '0') 
//         return setFieldError(name, 'Asegúrate de elegir una categoría')

//     if (isSubcategory == '0') 
//         return setFieldError(name, 'Asegúrate de elegir una subcategoría')

//     const data : ProductSkuCodeType = {
//         idCategory: Number(idCategory),
//         idSubCategory: Number(isSubcategory)
//     }

//     if (option === 'sku') {
//         const sku = await getSku(data)
//         setFieldValue(name, sku)
//     } else {
//         const barcode = await getBarcode(data)
//         setFieldValue(name, barcode)
//     }
// }
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :stepForm="false"
        :onClose="onClose"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
    >
        <template v-slot:modalBody>
            <div>
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="idVariant"
                    label="Variante"
                    :options="createProductStore.variantAttributes"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="variantValue"
                    label="Valor variante"
                    :options="createProductStore.variantValues"
                    :required="true"
                />
                <BaseFormInput name="variantPrice" label="Precio ($)" type="number" :required="true" />
            </div>
        </template>
    </BaseModal>
</template>

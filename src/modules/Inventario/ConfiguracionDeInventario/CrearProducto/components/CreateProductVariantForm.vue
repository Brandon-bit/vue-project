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

const initialValues : CreateVariantFormType | null = useCreateProductStore().currentVariantInfo

const modalId = 'add-variable-product-modal'
const createProductStore = useCreateProductStore()
const modalStore = useModalStore()

const {
    getVariantAttributesOptions,
    getVariantAttributesValues,
    getSku,
    getBarcode
} = useCreateProductActions()



const {
    handleSubmit,
    values,
    isSubmitting,
    setFieldError,
    resetForm,
    setFieldValue
} = useForm({
    validationSchema: toTypedSchema(addVariantProductSchema),
    validateOnMount: false,
    initialValues: initialValues
})


watch(() => values.idVariant, (newValue) => {
    console.log(newValue)
    if (newValue !== null && newValue !== undefined && newValue !== "") {
        getVariantAttributesValues(String(newValue))
    }
    console.log(createProductStore.variantValues)
})

const createVariant = (formValues: CreateVariantFormType) => {
    if(!createProductStore.currentProductInfo) return;
    createProductStore.currentProductInfo.variableProduct.push(formValues)
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
    const modalType = modalStore.modals[createProductStore.modalId]?.type
    const action = modalMap[modalType]?.action
    const messageResult = await action(formValues)

    modalStore.close(createProductStore.modalId)
    resetForm()
    showNotification(messageResult, 'success')
    console.log(createProductStore.currentProductInfo)
})

onMounted(async () => {
    await getVariantAttributesOptions()
})

const onClose = () => {
    resetForm()
    createProductStore.setVariantData()
}

const generateSKUOrBarcode = async (option: 'sku' | 'barcode') => {
    const idCategory = useCreateProductStore().idCategorySelected
    const isSubcategory = useCreateProductStore().idSubCategorySelected

    const name = option === 'sku' ? 'skuVariant' : 'variantItemBarcode'

    if (idCategory == '0') 
        return setFieldError(name, 'Asegúrate de elegir una categoría')

    if (isSubcategory == '0') 
        return setFieldError(name, 'Asegúrate de elegir una subcategoría')

    const data : ProductSkuCodeType = {
        idCategory: Number(idCategory),
        idSubCategory: Number(isSubcategory)
    }

    if (option === 'sku') {
        const sku = await getSku(data)
        setFieldValue(name, sku)
    } else {
        const barcode = await getBarcode(data)
        setFieldValue(name, barcode)
    }
}
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
                <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                    <BaseFormInput
                        class="col-span-9"
                        name="skuVariant"
                        label="SKU"
                        :required="true"
                        :readonly="true"
                    />
                    <BaseButton
                        @click="generateSKUOrBarcode('sku')"
                        className="col-span-3 mt-8 btn-outline"
                        text="Generar"
                    />
                </div>
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="variantBarcodeSimbology"
                    label="Simbología código de barras"
                    :options="createProductStore.barcodeSimbologies"
                    :required="true"
                />
                <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                    <BaseFormInput
                        class="col-span-9"
                        name="variantItemBarcode"
                        label="Código de barras"
                        :required="true"
                        :readonly="true"
                    />
                    <BaseButton
                        @click="generateSKUOrBarcode('barcode')"
                        className="col-span-3 mt-8 btn-outline"
                        text="Generar"
                    />
                </div>
                <BaseFormInput name="variantPrice" label="Precio ($)" type="number" :required="true" />
            </div>
        </template>
    </BaseModal>
</template>

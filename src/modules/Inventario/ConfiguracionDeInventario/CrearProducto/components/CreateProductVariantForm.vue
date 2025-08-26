<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ref, watch, onMounted, provide, nextTick } from 'vue'
import { useForm } from 'vee-validate'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ProgressBar from '@/shared/components/ProgressBar.vue'
import { showNotification } from '@/utils/toastNotifications'
import { useProduct } from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useProduct'
import useGenerateSKU from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateSKU'
import useProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/product.store'
import { addVariantProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import useGenerateBarcodeNumber from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateBarcodeNumber'

const initialValues = {
    variant: '',
    variantValue: '',
    skuVariant: '',
    barcodeSimbology: '',
    itemBarcode: '',
    quantity: '',
    quantityAlert: '',
    price: '',
    taxType: '',
    tax: '',
    discountType: '',
    discountValue: '',
    variantImage: []
}

const isGeneratedSku = ref(false)
const isGeneratedNumberBarcode = ref(false)
const modalId = 'add-variable-product-modal'
const productStore = useProductStore()
const modalStore = useModalStore()
const step = ref(1)
const skipNextVariantReset = ref(false)

const {
    handleSubmit,
    values,
    isSubmitting,
    validateField,
    setFieldError,
    resetForm,
    setFieldValue
} = useForm({
    validationSchema: toTypedSchema(addVariantProductSchema),
    validateOnMount: false,
    validateOnChange: false,
    initialValues: initialValues
})

const onSubmit = handleSubmit(async (formValues) => {
    let message
    if (modalStore.modals[modalId].type == 'CREATE') {
        productStore.variantsData = [...productStore.variantsData, formValues]
        message = 'Variante agregada correctamente'
    } else if (modalStore.modals[modalId].type == 'EDIT') {
        productStore.variantsData[productStore.selectedVariantIndex] = formValues
        message = 'Variante editada correctamente'
    } else {
        return
    }
    modalStore.close(modalId)
    resetForm({ values: initialValues })
    isGeneratedSku.value = false
    isGeneratedNumberBarcode.value = false
    showNotification(message, 'success')
    step.value = 1
    console.log(productStore.variantsData)
})

const { variants, valueVariants, getVariants, getValueVariants } = useProduct()

const currentValueVariants = ref([])
onMounted(async () => {
    await getVariants()
    await getValueVariants()
})

watch(
    () => values.variant,
    (newVariant) => {
        currentValueVariants.value = getNewVariantValues(newVariant)

        if (skipNextVariantReset.value) {
            skipNextVariantReset.value = false
            return
        }

        setFieldValue('variantValue', '')
    }
)

watch(
    () => modalStore.modals[modalId]?.openedAt,
    async () => {
        const modal = modalStore.modals[modalId]

        if (modal?.type == 'EDIT') {
            skipNextVariantReset.value = true
            await nextTick()
            const selectedVariant = productStore.variantsData[productStore.selectedVariantIndex]
            for (const key in selectedVariant) {
                setFieldValue(key, selectedVariant[key], false)
            }
        } else if (modal?.type == 'CREATE') {
            resetForm({ values: initialValues })
        }
    }
)

const getNewVariantValues = (newVariant: string) => {
    return valueVariants.value.filter((el) => {
        if (el.idVariante == newVariant) {
            return { id: el.id, label: el.label }
        }
    })
}

const generateSKU = () => {
    if (!isGeneratedSku.value) {
        const result = useGenerateSKU()
        if (!result) {
            showNotification(
                'Asegúrate llenar los campos categoría, marca, slug y unidad de la sección información',
                'error'
            )
        } else {
            setFieldValue('skuVariant', result)
            isGeneratedSku.value = true
        }
    }
}

const stepsConfig = [
    {
        title: 'Detalle de variante',
        icon: 'category',
        fields: ['variant', 'variantValue', 'skuVariant', 'barcodeSimbology', 'itemBarcode']
    },
    {
        title: 'Inventario y control',
        icon: 'inventory_2',
        fields: ['quantity', 'quantityAlert']
    },
    {
        title: 'Precios, impuestos y descuentos',
        icon: 'attach_money',
        fields: ['price', 'taxType', 'tax', 'discountType', 'discountValue']
    },
    {
        title: 'Imágenes',
        icon: 'image',
        fields: ['variantImage']
    }
]

provide('currentStep', step)
provide('stepsConfig', stepsConfig)
provide('validateField', validateField)

const generateNumberBarcode = async () => {
    if (!isGeneratedNumberBarcode.value) {
        const result = await useGenerateBarcodeNumber()
        setFieldValue('itemBarcode', result)
        isGeneratedNumberBarcode.value = true
    }
}

const onClose = () => {
    resetForm()
    step.value = 1
    if (isGeneratedSku.value) {
        isGeneratedSku.value = false
        productStore.changeSequentialValue(false)
    }
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :stepForm="true"
        :onClose="onClose"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
    >
        <template v-slot:modalBody>
            <ProgressBar :stepsConfig="stepsConfig" :step="step"></ProgressBar>
            <div v-show="step === 1">
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="variant"
                    label="Variante"
                    :options="variants"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="variantValue"
                    label="Valor variante"
                    :options="currentValueVariants"
                    :required="true"
                />
                <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                    <BaseFormInput
                        class="col-span-9"
                        name="skuVariant"
                        label="SKU"
                        :required="true"
                    />
                    <BaseButton
                        @click="generateSKU"
                        className="col-span-3 mt-8 btn-outline"
                        text="Generar"
                    />
                </div>
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="barcodeSimbology"
                    label="Simbología código de barras"
                    :options="productStore.barcodeSimbologies"
                    :required="true"
                />
                <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                    <BaseFormInput
                        class="col-span-9"
                        name="itemBarcode"
                        label="Código de barras"
                        :required="true"
                    />
                    <BaseButton
                        @click="generateNumberBarcode"
                        className="col-span-3 mt-8 btn-outline"
                        text="Generar"
                    />
                </div>
            </div>
            <div v-show="step === 2">
                <BaseFormInput name="quantity" label="Cantidad" type="number" :required="true" />
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="quantityAlert"
                    type="number"
                    label="Alerta de cantidad"
                    :required="true"
                />
            </div>
            <div v-show="step === 3">
                <BaseFormInput name="price" label="Precio" type="number" :required="true" />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="taxType"
                    label="Tipo de impuesto"
                    :options="productStore.taxTypes"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="tax"
                    label="Impuesto"
                    :options="productStore.taxes"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="discountType"
                    label="Tipo de descuento"
                    :options="productStore.discountTypes"
                    :required="true"
                />
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="discountValue"
                    type="number"
                    label="Valor del descuento"
                    :required="true"
                />
            </div>
            <div v-show="step === 4">
                <BaseFormInputFile
                    name="variantImage"
                    label="Imágenes del producto"
                    :multiple="true"
                ></BaseFormInputFile>
            </div>
        </template>
    </BaseModal>
</template>

<style scoped></style>

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
import { useCreateProduct } from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useCreateProduct'
import useGenerateSKU from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateSKU'
import useCreateProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/createProduct.store'
import { addVariantProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import useGenerateBarcodeNumber from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateBarcodeNumber'
import { VueDraggable } from 'vue-draggable-plus'
import { CreateVariantFormType } from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import styles from '@inventario/ConfiguracionDeInventario/CrearProducto/styles/createProduct.module.css'

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
    variantImage: [],
    dragDropImage: []
}

const isGeneratedSku = ref(false)
const isGeneratedNumberBarcode = ref(false)
const modalId = 'add-variable-product-modal'
const createProductStore = useCreateProductStore()
const modalStore = useModalStore()
const step = ref(1)
const skipNextVariantReset = ref(false)
const dragImagesRef = ref([])
const isReadyToDeleteData = ref(false)
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

const createVariant = (formValues: CreateVariantFormType) => {
    formValues.dragDropImage = dragImagesRef.value
    createProductStore.variantsData = [...createProductStore.variantsData, formValues]
    dragImagesRef.value = []
    return 'Variante agregada correctamente'
}

const editVariant = (formValues: CreateVariantFormType) => {
    createProductStore.variantsData[createProductStore.currentVariantRef] = formValues
    createProductStore.variantsData[createProductStore.currentVariantRef].dragDropImage =
        dragImagesRef.value
    dragImagesRef.value = []
    return 'Variante editada correctamente'
}

const modalMap = {
    CREATE: {
        action: createVariant
    },
    EDIT: {
        action: editVariant
    }
}
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[createProductStore.modalId]?.type
    const action = modalMap[modalType]?.action
    const messageResult = await action(formValues)

    modalStore.close(createProductStore.modalId)
    resetForm()
    isGeneratedSku.value = false
    isGeneratedNumberBarcode.value = false
    showNotification(messageResult, 'success')
    step.value = 1
    console.log(createProductStore.variantsData)
})

const { variants, valueVariants, getVariants } = useCreateProduct()

const currentValueVariants = ref([])
onMounted(async () => {
    await getVariants()
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
            const selectedVariant =
                createProductStore.variantsData[createProductStore.selectedVariantIndex]
            for (const key in selectedVariant) {
                setFieldValue(key, selectedVariant[key], false)
            }
        } else if (modal?.type == 'CREATE') {
            resetForm({ values: initialValues })
        }
    }
)

watch(
    () => createProductStore.currentVariant,
    (variantData) => {
        console.log(variantData)
        const modalType = modalStore.modals[createProductStore.modalId]?.type
        if (modalType == 'EDIT') {
            dragImagesRef.value = variantData?.dragDropImage
        } else {
            dragImagesRef.value = []
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
    dragImagesRef.value = []
    isReadyToDeleteData.value = false
    createProductStore.setData()
    if (isGeneratedSku.value) {
        isGeneratedSku.value = false
        createProductStore.changeSequentialValue(false)
    }
}

function getImages() {
    const files = values.variantImage
    if (!files || files.length === 0) return

    dragImagesRef.value = Array.from(files).map((file: any, index) => ({
        id: `${index}-${file.name}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name
    }))
}

const deleteImage = (imageIndex: number) => {
    dragImagesRef.value.splice(imageIndex, 1)
    if (!dragImagesRef.value.length) {
        setFieldValue('variantImage', [])
        dragImagesRef.value = []
        isReadyToDeleteData.value = false
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
                    :options="createProductStore.barcodeSimbologies"
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
                    :options="createProductStore.taxTypes"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="tax"
                    label="Impuesto"
                    :options="createProductStore.taxes"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="discountType"
                    label="Tipo de descuento"
                    :options="createProductStore.discountTypes"
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
                    @change="getImages"
                ></BaseFormInputFile>
                <div v-if="dragImagesRef.length" class="text-right my-4">
                    <BaseButton
                        v-show="!isReadyToDeleteData"
                        @click="isReadyToDeleteData = true"
                        text="Eliminar"
                        variant="outline"
                        className="btn-error"
                    />
                    <BaseButton
                        v-show="isReadyToDeleteData"
                        @click="isReadyToDeleteData = false"
                        text="Cancelar"
                        variant="outline"
                        className="btn-secondary"
                    />
                </div>
                <VueDraggable
                    v-model="dragImagesRef"
                    class="grid grid-cols-12 gap-3 mt-10"
                    :animation="200"
                >
                    <div
                        v-for="(img, index) in dragImagesRef"
                        :key="img.id"
                        class="col-span-12 sm:col-span-6 m-auto"
                    >
                        <div :class="styles['container-product-image']">
                            <div
                                :class="[
                                    'w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-lg flex flex-col indicator transition-shadow duration-300 flex items-center justify-center',
                                    { [styles.wiggle]: isReadyToDeleteData }
                                ]"
                            >
                                <img
                                    class="object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-115"
                                    :src="img.url"
                                    alt=""
                                />
                                <span
                                    v-show="!isReadyToDeleteData"
                                    class="indicator-item badge badge-secondary"
                                >
                                    {{ index + 1 }}
                                </span>
                                <span
                                    v-show="isReadyToDeleteData"
                                    class="indicator-item badge badge-error text-white cursor-pointer p-1"
                                    @click="() => deleteImage(index)"
                                >
                                    <span
                                        :class="[
                                            'material-symbols-outlined',
                                            styles['icon-delete-image']
                                        ]"
                                    >
                                        close
                                    </span>
                                </span>
                            </div>
                        </div>
                        <p class="text-center mt-3 mb-2">{{ img.name }}</p>
                    </div>
                </VueDraggable>
            </div>
        </template>
    </BaseModal>
</template>

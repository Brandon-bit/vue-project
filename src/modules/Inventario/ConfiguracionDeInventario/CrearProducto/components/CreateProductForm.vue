<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref, onMounted, watch, nextTick } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseActionButtonTable from '@/shared/components/BaseActionButtonTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'
import useCreateProductStore from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore'
import useCreateProductActions from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useCreateProductActions'
import { createProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import { VueDraggable } from 'vue-draggable-plus'
import styles from '@inventario/ConfiguracionDeInventario/CrearProducto/styles/createProduct.module.css'
import { 
    ProductSkuCodeType,
    imagesDragValues 
} from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'

const singleProduct = ref(true)
const modalStore = useModalStore()
const createProductStore = useCreateProductStore()
const deleteProductVariantModalId = 'delete-product-variant'
const dragImagesRef = ref<imagesDragValues[]>([])
const isReadyToDeleteData = ref(false)

const showProductVariantModal = () => {
    modalStore.open(createProductStore.modalId, { type: 'CREATE', title: 'Añadir variante' })
    createProductStore.setData()
}

const showEditVariantModal = (variantIndex: number) => {
    modalStore.open(createProductStore.modalId, { type: 'EDIT', title: 'Editar variante' })
    createProductStore.setData(variantIndex)
}

const showDeleteProductVariantModal = (variantIndex: number) => {
    modalStore.open(deleteProductVariantModalId, { type: 'DELETE', title: 'Eliminar variante' })
    createProductStore.setData(variantIndex)
}

const { 
    handleSubmit, 
    values, 
    isSubmitting, 
    setFieldError, 
    setFieldValue, 
    validateField 
} = useForm({
    validationSchema: toTypedSchema(createProductSchema),
    validateOnMount: false,
    initialValues: createProductStore.currentProductInfo
})

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log(formValues)
    },
    async () => {
        await nextTick()

        const firstErrorElement = document.querySelector(
            '.select-error,.input-error,.textarea-error'
        )

        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            firstErrorElement.focus?.()
        }
    }
)

function getImages() {
    const files = values.image
    if (!files || files.length === 0) return

    dragImagesRef.value = Array.from(files).map((file: any, index) => ({
        id: `${index}-${file.name}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name
    }))
}

const {
    getCategoryOptions,
    getBrandOptions,
    getUnitOptions,
    getSubCategoryOptions,
    getSku,
    getBarcode,
    getWarrantyOptions,
    getTaxOptions
} = useCreateProductActions()

onMounted(async () => {
    await Promise.all([
        getCategoryOptions(),
        getUnitOptions(),
        getBrandOptions(),
        getWarrantyOptions(),
        getTaxOptions(),
    ])
})

watch(() => values.idCategory, (newValue) => {
    createProductStore.idCategorySelected = String(newValue)
    if (newValue !== null && newValue !== undefined && newValue !== "") {
        getSubCategoryOptions(String(newValue))
    }
})

watch(() => values.idSubCategory, (newValue) => createProductStore.idSubCategorySelected = String(newValue))

const generateSKUOrBarcode = async (option: 'sku' | 'barcode') => {
    const validateCategory = await validateField('idCategory')
    const validateSubCategory = await validateField('idSubCategory')

    if (!validateCategory.valid) setFieldError('idCategory', 'Asegúrate de elegir una categoría')
    if (!validateSubCategory.valid) setFieldError('idSubCategory', 'Asegúrate de elegir una subcategoría')
    if (!validateCategory.valid || !validateSubCategory.valid) return

    const data : ProductSkuCodeType = {
        idCategory: Number(values.idCategory),
        idSubCategory: Number(values.idSubCategory)
    }

    if (option === 'sku') {
        const sku = await getSku(data)
        setFieldValue('sku', sku)
    } else {
        const barcode = await getBarcode(data)
        setFieldValue('itemBarcode', barcode)
    }
}



const deleteImage = (imageIndex: number) => {
    dragImagesRef.value.splice(imageIndex, 1)
    if (!dragImagesRef.value.length) {
        setFieldValue('image', [])
        dragImagesRef.value = []
        isReadyToDeleteData.value = false
    }
}
</script>

<template>
    <div class="lg:max-w-[70%] lg:mx-auto">
        <form @submit="onSubmit">
            <!-- COLLAPSE INFORMACIÓN-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="create-product-information" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Información
                </div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- Name -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="name"
                            label="Nombre"
                            :required="true"
                        />
                        <!-- Slug -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="slug"
                            label="Slug"
                            :required="true"
                        />
                        <!-- SKU -->
                        <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                            <BaseFormInput
                                class="col-span-9"
                                name="sku"
                                label="SKU"
                                :required="true"
                                :readonly="true"
                            />
                            <BaseButton
                                @click="generateSKUOrBarcode('sku')"
                                className="col-span-3 mt-7"
                                text="Generar"
                            />
                        </div>
                        <!-- Category Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="idCategory"
                            label="Categoría"
                            :options="createProductStore.categories"
                            :required="true"
                        />
                        <!-- Subcategory Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="idSubCategory"
                            label="Subcategoría"
                            :options="createProductStore.subcategories"
                            :required="true"
                        />
                        <!-- Brand Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="idBrand"
                            label="Marca"
                            :options="createProductStore.brands"
                            :required="true"
                        />
                        <!-- Unit Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="idUnit"
                            label="Unidad"
                            :options="createProductStore.units"
                            :required="true"
                        />
                        <!-- Barcode Simbology Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="barcodeSimbology"
                            label="Simbología código de barras"
                            :options="createProductStore.barcodeSimbologies"
                            :required="true"
                        />
                        <!-- Barcode -->
                        <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                            <BaseFormInput
                                class="col-span-9"
                                name="itemBarcode"
                                label="Código de barras"
                                :required="true"
                                :readonly="true"
                            />
                            <BaseButton
                                @click="generateSKUOrBarcode('barcode')"
                                className="col-span-3 mt-7"
                                text="Generar"
                            />
                        </div>
                        <!-- Description -->
                        <BaseTextArea class="col-span-12" name="description" label="Descripción" />
                    </div>
                </div>
            </div>
            <!-- COLLAPSE PRICE Y STOCK-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300 collapse-stock">
                <input type="checkbox" name="create-product-price-stock" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Precio y stock
                </div>
                <div class="collapse-content text-sm">
                    <div class="flex gap-4 flex-col sm:flex-row items-center mb-4">
                        <label for="single-variable-product">
                            <input
                                type="radio"
                                name="single-variable-product"
                                class="radio mr-2"
                                :value="true"
                                v-model="singleProduct"
                            />
                            Producto único
                        </label>
                        <label for="single-variable-product">
                            <input
                                type="radio"
                                :value="false"
                                name="single-variable-product"
                                class="radio mr-2"
                                v-model="singleProduct"
                            />
                            Producto variable
                        </label>
                    </div>
                    <!-- SINGLE PRODUCT -->
                    <div v-show="singleProduct">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Price -->
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="singleProduct.price"
                                type="number"
                                label="Precio ($)"
                                :required="true"
                            />
                            <!-- Tax Type -->
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="singleProduct.idTaxType"
                                label="Tipo de impuesto"
                                :options="createProductStore.taxTypes"
                                :required="true"
                            />
                            <!-- Tax -->
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="singleProduct.tax"
                                type="number"
                                label="Impuesto (%)"
                                :required="true"
                            />
                        </div>
                    </div>
                    <!-- VARIANT PRODUCT -->
                    <div v-show="!singleProduct">
                        <div class="grid grid-cols-12 md:gap-5 items-center mb-5">
                            <BaseButton
                                class="col-span-12 lg:col-span-3 mt-3"
                                icon="add_circle"
                                text="Añadir Variante"
                                @click="showProductVariantModal"
                            />
                        </div>
                        <div
                            v-if="createProductStore.variantsData.length"
                            tabindex="0"
                            class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                        >
                            <div class="!block overflow-auto w-full max-w-full">
                                <div class="overflow-x-auto">
                                    <table class="table text-center w-full min-w-[600px]">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Variante</th>
                                                <th>Valor variante</th>
                                                <th>SKU</th>
                                                <th>Numero codigo de barras</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(
                                                    value, index
                                                ) in createProductStore.variantsData"
                                                :key="index"
                                            >
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ value.variantName }}</td>
                                                <td>{{ value.variantValue }}</td>
                                                <td>{{ value.skuVariant }}</td>
                                                <td>{{ value.itemBarcode }}</td>
                                                <td>{{ value.price }}</td>
                                                <td>
                                                    <div class="flex gap-4">
                                                        <BaseActionButtonTable
                                                            icon="edit_square"
                                                            variant="info"
                                                            tooltipText="Editar"
                                                            :onClick="
                                                                () => showEditVariantModal(index)
                                                            "
                                                        >
                                                        </BaseActionButtonTable>
                                                        <BaseActionButtonTable
                                                            icon="delete"
                                                            variant="error"
                                                            tooltipText="Eliminar"
                                                            :onClick="
                                                                () =>
                                                                    showDeleteProductVariantModal(
                                                                        index
                                                                    )
                                                            "
                                                        >
                                                        </BaseActionButtonTable>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- COLLAPSE IMÁGENES-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="create-product-images" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Imágenes
                </div>
                <div class="collapse-content text-sm mb-4">
                    <BaseFormInputFile
                        name="image"
                        label="Imágenes del producto"
                        :multiple="true"
                        @change="getImages"
                        accept="image/*"
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
                            class="col-span-12 sm:col-span-6 lg:col-span-4 m-auto"
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
                                        {{ index + 1 }}</span
                                    >
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
            </div>
            <!-- COLLAPSE EXTRAS-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="create-product-extra-data" checked />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">Extras</div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- Warranty Select -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="extraInfo.idWarranty"
                            label="Garantía"
                            :options="createProductStore.warranties"
                        />
                        <!-- Manufacturing Date -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="extraInfo.manufacturingDate"
                            label="Fecha fabricación"
                            type="date"
                        ></BaseFormInput>
                        <!-- Expiration Date -->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="extraInfo.expirationDate"
                            label="Fecha expiración"
                            type="date"
                        ></BaseFormInput>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-12 justify-end gap-4 mt-10">
                <router-link to="/inventario/configuracion/productos" class="btn col-span-6">
                    <button>Regresar</button>
                </router-link>
                <button type="submit" class="btn btn-primary col-span-6" :disabled="isSubmitting">
                    <template v-if="isSubmitting">
                        <span class="loading loading-spinner"></span>
                        Procesando...
                    </template>
                    <template v-else> Aceptar </template>
                </button>
            </div>
        </form>
    </div>
</template>

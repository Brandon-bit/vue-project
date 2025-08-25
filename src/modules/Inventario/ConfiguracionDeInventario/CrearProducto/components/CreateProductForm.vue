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
import { useProduct } from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useProduct'
import useProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/product.store'
import useGenerateSKU from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateSKU'
import { createProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import useGenerateBarcodeNumber from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateBarcodeNumber'

const singleProduct = ref(true)
const modalStore = useModalStore()
const productStore = useProductStore()
const modalId = 'add-variable-product-modal'
const deleteProductVariantModalId = 'delete-product-variant'
const isGeneratedSku = ref(false)
const changeSelect = ref(false)
const isGeneratedNumberBarcode = ref(false)

const showProductVariantModal = () => {
    modalStore.open(modalId, { type: 'CREATE', title: 'Añadir variante' })
}

const showEditVariantModal = (variantIndex: number) => {
    modalStore.open(modalId, { type: 'EDIT', title: 'Editar variante' })
    productStore.selectedVariantIndex = variantIndex
}

const showDeleteProductVariantModal = (variantIndex: number) => {
    modalStore.open(deleteProductVariantModalId, { title: 'Eliminar variante' })
    productStore.selectedVariantIndex = variantIndex
}

const {
    handleSubmit,
    values,
    isSubmitting,
    errors,
    isValidating,
    setFieldError,
    resetForm,
    setFieldValue
} = useForm({
    validationSchema: toTypedSchema(createProductSchema),
    validateOnMount: false,
    validateOnChange: false,
    keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log(formValues)
        console.log(productStore.variantsData)
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

const {
    stores,
    warehouses,
    sellingTypes,
    categories,
    subcategories,
    units,
    brands,
    barcodeSimbologies,
    taxTypes,
    taxes,
    discountTypes,
    getStores,
    getWareHouses,
    getSellingTypes,
    getCategories,
    getSubcategories,
    getUnits,
    getBrands,
    getBarcodeSimbologies,
    getTaxTypes,
    getTaxes,
    getDiscountTypes
} = useProduct()

onMounted(async () => {
    await Promise.all([
        getStores(),
        getWareHouses(),
        getSellingTypes(),
        getCategories(),
        getSubcategories(),
        getUnits(),
        getBrands(),
        getBarcodeSimbologies(),
        getTaxTypes(),
        getTaxes(),
        getDiscountTypes()
    ])

    await fillSelectValuesStore()
})

const fillSelectValuesStore = async () => {
    productStore.categories = categories
    productStore.brands = brands
    productStore.units = units
    productStore.barcodeSimbologies = barcodeSimbologies
    productStore.taxTypes = taxTypes
    productStore.taxes = taxes
    productStore.discountTypes = discountTypes
}

const fields = ['category', 'brand', 'unit', 'slug']

fields.forEach((field) => {
    watch(
        () => values[field],
        (newValue, previousValue) => {
            productStore[field] = newValue
            changeSelect.value = true
            isGeneratedSku.value = false
        }
    )
})
const generateSKU = () => {
    if (!isGeneratedSku.value && changeSelect) {
        productStore.changeSequentialValue(false)
    }

    if (!isGeneratedSku.value) {
        const result = useGenerateSKU()
        if (!result) {
            showNotification('Asegúrate llenar los campos categoría, marca, slug y unidad', 'error')
        } else {
            setFieldValue('sku', result)
            isGeneratedSku.value = true
        }
    }
}

const generateNumberBarcode = async () => {
    if (!isGeneratedNumberBarcode.value) {
        const result = await useGenerateBarcodeNumber()
        setFieldValue('itemBarcode', result)
        isGeneratedNumberBarcode.value = true
    }
}
</script>

<template>
    <div class="lg:w-5xl mx-auto">
        <form @submit="onSubmit">
            <!-- COLLAPSE INFORMACIÓN-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="create-product-information" checked="checked" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Información
                </div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="store"
                            label="Tienda"
                            :options="stores"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="warehouse"
                            label="Almacén"
                            :options="warehouses"
                            :required="true"
                        />
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="name"
                            label="Nombre"
                            :required="true"
                        />
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="slug"
                            label="Slug"
                            :required="true"
                        />
                        <div class="relative col-span-12 md:col-span-6 grid grid-cols-12 gap-2">
                            <BaseFormInput
                                class="col-span-9"
                                name="sku"
                                label="SKU"
                                :required="true"
                            />
                            <BaseButton
                                @click="generateSKU"
                                className="col-span-3 mt-7"
                                text="Generar"
                            />
                        </div>
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="sellingType"
                            label="Tipo de venta"
                            :options="sellingTypes"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="category"
                            label="Categoría"
                            :options="categories"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="subcategory"
                            label="Subcategoría"
                            :options="subcategories"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="brand"
                            label="Marca"
                            :options="brands"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="unit"
                            label="Unidad"
                            :options="units"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="barcodeSimbology"
                            label="Simbología código de barras"
                            :options="barcodeSimbologies"
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
                                className="col-span-3 mt-7"
                                text="Generar"
                            />
                        </div>
                        <BaseTextArea class="col-span-12" name="description" label="Descripción" />
                    </div>
                </div>
            </div>
            <!-- COLLAPSE PRECIO Y STOCK-->
            <div
                class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300 collapse-stock"
            >
                <input type="checkbox" name="create-product-images" checked="checked" />
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
                    <div v-show="singleProduct">
                        <div class="grid grid-cols-12 gap-5">
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="quantity"
                                type="number"
                                label="Cantidad"
                                :required="true"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="price"
                                type="number"
                                label="Precio"
                                :required="true"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="taxType"
                                label="Tipo de impuesto"
                                :options="taxTypes"
                                :required="true"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="tax"
                                label="Impuesto"
                                :options="taxes"
                                :required="true"
                            />
                            <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="discountType"
                                label="Tipo de descuento"
                                :options="discountTypes"
                                :required="true"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="discountValue"
                                type="number"
                                label="Valor del descuento"
                                :required="true"
                            />
                            <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="quantityAlert"
                                type="number"
                                label="Alerta de cantidad"
                                :required="true"
                            />
                        </div>
                    </div>
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
                            v-if="productStore.variantsData.length"
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
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(value, index) in productStore.variantsData"
                                                :key="index"
                                            >
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ value.variant }}</td>
                                                <td>{{ value.variantValue }}</td>
                                                <td>{{ value.skuVariant }}</td>
                                                <td>{{ value.itemBarcode }}</td>
                                                <td>{{ value.price }}</td>
                                                <td>{{ value.quantity }}</td>
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
                <input type="checkbox" name="create-product-images" checked="checked" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Imágenes
                </div>
                <div class="collapse-content text-sm">
                    <BaseFormInputFile
                        name="image"
                        label="Imágenes del producto"
                        :multiple="true"
                    ></BaseFormInputFile>
                </div>
            </div>
            <!-- COLLAPSE EXTRAS-->
            <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                <input type="checkbox" name="create-product-extra-data" checked="checked" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">Extras</div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="warranty"
                            label="Garantía"
                        ></BaseFormInput>
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="manufacturer"
                            label="Fabricante"
                        ></BaseFormInput>
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="manufacturedDate"
                            label="Fecha fabricación"
                            type="date"
                        ></BaseFormInput>
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="expiryOnDate"
                            label="Fecha expiración"
                            type="date"
                        ></BaseFormInput>
                    </div>
                </div>
            </div>
            <div class="footer-modal grid grid-cols-12 justify-end gap-4 mt-10">
                <button type="button" class="btn col-span-6">Regresar</button>
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

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
import { useCreateProduct } from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useCreateProduct'
import useCreateProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/createProduct.store'
import useGenerateSKU from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateSKU'
import { createProductSchema } from '@inventario/ConfiguracionDeInventario/CrearProducto/validations/productValidation'
import useGenerateBarcodeNumber from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useGenerateBarcodeNumber'
import { VueDraggable } from 'vue-draggable-plus'
import styles from '@inventario/ConfiguracionDeInventario/CrearProducto/styles/createProduct.module.css'

const singleProduct = ref(true)
const modalStore = useModalStore()
const createProductStore = useCreateProductStore()
const deleteProductVariantModalId = 'delete-product-variant'
const isGeneratedSku = ref(false)
const changeSelect = ref(false)
const isGeneratedNumberBarcode = ref(false)
const selectCategories = ref([])
const selectUnits = ref([])
const selectBrands = ref([])
const dragImagesRef = ref([])
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

const { handleSubmit, values, isSubmitting, errors, setFieldError, resetForm, setFieldValue } =
    useForm({
        validationSchema: toTypedSchema(createProductSchema),
        validateOnMount: false,
        keepValuesOnUnmount: true
    })

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log(formValues)
        console.log(createProductStore.variantsData)
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
    stores,
    warehouses,
    sellingTypes,
    subcategories,
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
} = useCreateProduct()

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

    selectCategories.value = createProductStore.categories.map((category: any) => {
        return { id: category.id, label: category.name }
    })

    selectUnits.value = createProductStore.units.map((unit: any) => {
        return { id: unit.id, label: unit.name }
    })

    selectBrands.value = createProductStore.brands.map((brand: any) => {
        return { id: brand.id, label: brand.name }
    })
})

const fields = ['category', 'brand', 'unit', 'slug']

fields.forEach((field) => {
    watch(
        () => values[field],
        (newValue, previousValue) => {
            createProductStore[field] = newValue
            changeSelect.value = true
            isGeneratedSku.value = false
        }
    )
})
const generateSKU = () => {
    if (!isGeneratedSku.value && changeSelect) {
        createProductStore.changeSequentialValue(false)
    }

    if (!isGeneratedSku.value) {
        const result = useGenerateSKU()
        if (!result) {
            showNotification('Asegúrate llenar los campos categoría y marca', 'error')
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
                <input type="checkbox" name="create-product-information" checked="checked" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                    Información
                </div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- <BaseFormSelect
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
                        /> -->
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
                        <!-- <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="sellingType"
                            label="Tipo de venta"
                            :options="sellingTypes"
                            :required="true"
                        /> -->
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="category"
                            label="Categoría"
                            :options="selectCategories"
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
                            :options="selectBrands"
                            :required="true"
                        />
                        <BaseFormSelect
                            class="col-span-12 md:col-span-6"
                            name="unit"
                            label="Unidad"
                            :options="selectUnits"
                            :required="true"
                        />
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
                            <!-- <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="quantity"
                                type="number"
                                label="Cantidad"
                                :required="true"
                            /> -->
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
                            <!-- <BaseFormSelect
                                class="col-span-12 md:col-span-6"
                                name="discountType"
                                label="Tipo de descuento"
                                :options="createProductStore.discountTypes"
                                :required="true"
                            /> -->
                            <!-- <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="discountValue"
                                type="number"
                                label="Valor del descuento"
                                :required="true"
                            /> -->
                            <!-- <BaseFormInput
                                class="col-span-12 md:col-span-6"
                                name="quantityAlert"
                                type="number"
                                label="Alerta de cantidad"
                                :required="true"
                            /> -->
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
                                                <th>Cantidad</th>
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
                <div class="collapse-content text-sm mb-4">
                    <BaseFormInputFile
                        name="image"
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
                <input type="checkbox" name="create-product-extra-data" checked="checked" />
                <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">Extras</div>
                <div class="collapse-content text-sm">
                    <div class="grid grid-cols-12 gap-5">
                        <!-- CAMBIAR A SELECT-->
                        <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="warranty"
                            label="Garantía"
                        ></BaseFormInput>
                        <!-- <BaseFormInput
                            class="col-span-12 md:col-span-6"
                            name="manufacturer"
                            label="Fabricante"
                        ></BaseFormInput> -->
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

<script setup lang="ts">
import { useDomainProduct } from '../composables/useDomainProduct'
import useProductDomainStore from '../store/productDomain.store'
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { productDetailType } from '../types/productTypes'
const route = useRoute()
const loading = ref(true)
const productId = route.params.id
const { getProductDetail } = useDomainProduct()
const productDomainStore = useProductDomainStore()
const currentProduct = ref<productDetailType>({})

onMounted(async () => {
    await getProductDetail(productId)
    currentProduct.value = productDomainStore.currentProduct
    loading.value = false
})
</script>
<template>
    <h2 class="text-center mb-8">Detalle de producto</h2>
    <p v-if="loading">Obteniendo datos ...</p>
    <div v-else class="lg:max-w-[70%] lg:mx-auto">
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table class="table">
                <tbody>
                    <tr>
                        <td class="text-gray-600">Bodega</td>
                        <td>{{ currentProduct?.warehouse }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Slug</td>
                        <td>{{ currentProduct?.slug }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Tipo de venta</td>
                        <td>{{ currentProduct?.sellingType }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Subcategoría</td>
                        <td>{{ currentProduct?.subcategory }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Simbología código de barras</td>
                        <td>{{ currentProduct?.barcodeSimbology }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Número código de barras</td>
                        <td>{{ currentProduct?.itemBarcode }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Tipo de impuesto</td>
                        <td>{{ currentProduct?.taxType }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Impuesto</td>
                        <td>{{ currentProduct?.tax }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Tipo de descuento</td>
                        <td>{{ currentProduct?.discountType }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Valor de descuento</td>
                        <td>{{ currentProduct?.discountValue }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Cantidad de alerta</td>
                        <td>{{ currentProduct?.quantityAlert }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Garantía</td>
                        <td>{{ currentProduct?.warranty }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Fabricante</td>
                        <td>{{ currentProduct?.manufacturer }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Fecha de fabricación</td>
                        <td>{{ currentProduct?.manufacturedDate }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Fecha de expiración</td>
                        <td>{{ currentProduct?.expiryOnDate }}</td>
                    </tr>
                    <tr>
                        <td class="text-gray-600">Imágenes</td>
                        <td>
                            <div class="grid grid-cols-12 gap-3">
                                <div
                                    class="lg:col-span-4 md:col-span-6 col-span-12 p-3 m-auto container-product-image"
                                    v-for="value in currentProduct?.image"
                                >
                                    <div
                                        class="w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center overflow-hidden"
                                    >
                                        <img
                                            class="object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-115"
                                            :src="value"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>
.container-product-image {
    width: 120px;
    height: 120px !important;
}

@media (width >= 40rem) {
    .container-product-image {
        width: 160px;
        height: 160px !important;
    }
}

/* @media (width >= 48rem) {
    .container-product-image {
        width: 160px !important;
    }
} */
</style>

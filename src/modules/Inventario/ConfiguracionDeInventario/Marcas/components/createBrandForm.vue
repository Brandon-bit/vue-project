<script setup lang="ts">
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import { useForm } from 'vee-validate'
import { createBrandSchema } from '../validations/brandValidation';
import { toTypedSchema } from '@vee-validate/zod'
import { BrandType } from '../types/brandType';
import { addNewBrand } from '../services/brandServices';
import { onMounted, watch } from 'vue'
import useBrandStore from '../store/brand.store';
import { useModalStore } from '@/shared/stores/modal.store';
import { useBrand } from '../composables/useBrand'

const { BRAND_MODAL_IDS } = useBrand()

const brandStore = useBrandStore()
const modalStore = useModalStore()

//console.log(brandStore.currentBrand)

const initialValues = {
    name: brandStore.currentBrand?.name,
    image: brandStore.currentBrand?.image,
    active: brandStore.currentBrand?.active
}


// Check if the "editingBrandId" has changed and if it has changed show the modal to edit the selected brand
// watch(() => brandStore.editingBrandId, (newValue) => {
//     if(newValue == 0) return    
//     const brandSelected = brandStore.brands.find(b => b.id == newValue)

//     for (const key in brandSelected) {
//         setFieldValue(key, brandSelected[key], false)
//     }
//     modalStore.open(modalId, { type: 'EDIT', title: 'Editar Marca' })
// })  

watch(
  () => brandStore.currentBrand,
  (newBrand) => {
    if (newBrand) {
      resetForm({
        values: {
          name: newBrand.name,
          image: newBrand.image,
          active: newBrand.active
        }
      })
    }
  },
  { immediate: true }
)


const {
    handleSubmit,
    isSubmitting,
    resetForm,
} = useForm({
    validationSchema: toTypedSchema(createBrandSchema),
    validateOnMount: false,
    initialValues: initialValues
})


const onSubmit = handleSubmit(async (formValues) => {
  try {
    const brandModel : BrandType = {
        name: formValues.name,
        active: formValues.active,
        image: formValues.image,
        creationDate: new Date(),
        imageUrl: '' 
    }
    const response = await addNewBrand(brandModel)
    console.log(response)
    // modalStore.close(modalId)

    // // TODO: mostrar alerta y cerrar modal
    // // nota: actualmente refresca la pagina en lugar de solo agregar el objeto al listado
    // resetForm();
  } catch (error) {}
});

const onClose = () => {
    resetForm()
}

</script>

<template>
    <BaseModal :onSubmit="onSubmit" :modalId="BRAND_MODAL_IDS.CREATE" :isSubmitting="isSubmitting" :onClose="onClose">
        <template v-slot:modalBody>
            <div>
                <BaseFormInput name="name" type="text" label="Marca" :required="true"/>
                <BaseFormInputFile name="image" label="Logo" :multiple="false" accept="image/png, image/jpeg" />
                <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
            </div>
        </template>
    </BaseModal>
</template>
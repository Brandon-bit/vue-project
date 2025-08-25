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
import { watch } from 'vue'
import useBrandStore from '../store/brand.store';
import { useModalStore } from '@/shared/stores/modal.store';

const brandStore = useBrandStore()
const modalStore = useModalStore()
// const props = defineProps<{
//     mode: 'create' | 'edit'
//     model: BrandType
// }>()

const initialValues = {
    name: "",
    image: undefined,
    active: true
}

watch(() => brandStore.editingBrandId, (newValue, oldValue) => {
    console.log(`El id actual es ${newValue}`)
    
    const brandSelected = brandStore.brands.find(b => b.id == newValue)
    console.log(brandSelected)

    for (const key in brandSelected) {
        setFieldValue(key, brandSelected[key], false)
    }

    modalStore.open(modalId, { type: 'EDIT', title: 'Editar Marca' })
})  


const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setFieldValue
} = useForm({
    validationSchema: toTypedSchema(createBrandSchema),
    validateOnMount: false,
    initialValues: initialValues
})

const modalId = 'create-brand-modal'


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

    // TODO: mostrar alerta y cerrar modal
    // nota: actualmente refresca la pagina en lugar de solo agregar el objeto al listado

    resetForm();
  } catch (error) {}
});

const onClose = () => {
    resetForm()
}

</script>

<template>
    <BaseModal :onSubmit="onSubmit" :modalId="modalId" :isSubmitting="isSubmitting" :onClose="onClose">
        <template v-slot:modalBody>
            <div>
                <BaseFormInput name="name" type="text" label="Marca" :required="true"/>
                <BaseFormInputFile name="image" label="Logo" :multiple="false" accept="image/png, image/jpeg" />
                <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
            </div>
        </template>
    </BaseModal>
</template>
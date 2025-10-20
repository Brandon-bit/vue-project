<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { nextTick, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormPageTitle from '@/shared/components/BaseFormPageTitle.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelectMultiple from '@/shared/components/BaseFormSelectMultiple.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseFormActionButtons from '@/shared/components/BaseFormActionButtons.vue'
import { VueDraggable } from 'vue-draggable-plus'
import { communicationSchema } from '@/modules/RRHH/ComunicacionesOrganizacionales/validations/communicationValidation'
import { useCommunicationActions } from '@/modules/RRHH/ComunicacionesOrganizacionales/composables/useCommunicationActions'
import { DepartmentDTO } from '@/modules/RRHH/ComunicacionesOrganizacionales/types/communicationTypes'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'Actualizar comunicado')
const pageTitle = computed(() =>
    isEditMode.value ? 'Actualizar comunicado' : 'Crear nuevo comunicado'
)

const { createCommunication, updateCommunication, getCommunicationById, getDepartments } =
    useCommunicationActions()

const departments = ref<DepartmentDTO[]>([])
const showPreview = ref(false)
const isReadyToDeleteData = ref(false)

interface ImageDragValue {
    id: string
    file: File
    url: string
    name: string
}

const dragImagesRef = ref<ImageDragValue[]>([])

const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(communicationSchema),
    validateOnMount: false,
    initialValues: {
        title: '',
        content: '',
        images: [],
        publicationType: 'publish' as 'publish' | 'departments',
        departments: [],
        distributionMethod: 'email' as 'page' | 'email',
        scheduleDelivery: false,
        deliveryDate: '',
        deliveryTime: ''
    }
})

// Use useField for radio buttons and other fields
const { value: publicationType } = useField<'publish' | 'departments'>('publicationType')
const { value: selectedDepartments } = useField<number[]>('departments')
const { value: scheduleDelivery } = useField<boolean>('scheduleDelivery')

onMounted(async () => {
    // Load departments
    departments.value = await getDepartments()

    // Load communication data if editing
    if (isEditMode.value) {
        const communicationId = parseInt(route.params.id as string)
        if (communicationId) {
            const communicationData = await getCommunicationById(communicationId)

            // Load existing images as previews
            if (communicationData.images && communicationData.images.length > 0) {
                dragImagesRef.value = communicationData.images.map((url, index) => ({
                    id: `existing-${index}`,
                    file: null as any,
                    url: url,
                    name: `Imagen ${index + 1}`
                }))
            }

            // Reset form with loaded data
            resetForm({ values: communicationData })
        }
    }
})

// Watch publicationType to clear departments when switching to 'publish'
watch(publicationType, (newValue) => {
    if (newValue === 'publish') {
        selectedDepartments.value = []
    }
})

const getImages = () => {
    const files = values.images
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
        values.images = []
        dragImagesRef.value = []
        isReadyToDeleteData.value = false
    }
}

const togglePreview = () => {
    showPreview.value = !showPreview.value
}

const onSubmit = handleSubmit(
    async (formValues) => {
        console.log('Form Values:', formValues)

        // Add image URLs to form values
        const dataToSubmit = {
            ...formValues,
            images: dragImagesRef.value.map((img) => img.url)
        }

        let result
        if (isEditMode.value) {
            const communicationId = parseInt(route.params.id as string)
            result = await updateCommunication(communicationId, dataToSubmit)
        } else {
            result = await createCommunication(dataToSubmit)
        }
        console.log('Result:', result)

        // Redirect to list after successful submission
        if (result.success) {
            router.push('/rrhh/comunicaciones-organizacionales')
        }
    },
    async () => {
        await nextTick()

        const firstErrorElement = document.querySelector(
            '.select-error,.input-error,.textarea-error,.radio-error'
        )

        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            const focusableElement = firstErrorElement as HTMLElement
            focusableElement.focus?.()
        }
    }
)
</script>

<template>
    <div>
        <BaseFormPageTitle :title="pageTitle" />
        <div class="lg:max-w-[70%] lg:mx-auto">
            <form @submit="onSubmit">
                <!-- COLLAPSE INFORMACIÓN GENERAL -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="communication-general-info" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Información General
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Title -->
                            <BaseFormInput
                                class="col-span-12"
                                name="title"
                                label="Título del Comunicado"
                                :required="true"
                                placeholder="Ingrese un título descriptivo"
                            />
                            <!-- Content -->
                            <BaseTextArea
                                class="col-span-12"
                                name="content"
                                label="Contenido"
                                :required="true"
                                placeholder="Escriba el contenido del comunicado..."
                                :rows="8"
                            />
                        </div>
                    </div>
                </div>

                <!-- COLLAPSE IMÁGENES -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="communication-images" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Imágenes
                    </div>
                    <div class="collapse-content text-sm mb-4">
                        <BaseFormInputFile
                            name="images"
                            label="Imágenes del comunicado"
                            :multiple="true"
                            @change="getImages"
                            accept="image/*"
                        />
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
                            class="grid grid-cols-12 gap-6 mt-10"
                            :animation="200"
                        >
                            <div
                                v-for="(img, index) in dragImagesRef"
                                :key="img.id"
                                class="col-span-6 sm:col-span-4 lg:col-span-3 m-auto"
                            >
                                <div class="w-full max-w-[200px] mx-auto">
                                    <div
                                        :class="[
                                            'w-full aspect-square bg-white rounded-lg shadow-md hover:shadow-lg flex flex-col indicator transition-all duration-300 flex items-center justify-center',
                                            { 'animate-wiggle': isReadyToDeleteData }
                                        ]"
                                    >
                                        <img
                                            class="object-contain w-full h-full p-2 transition-transform duration-200 hover:scale-105"
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
                                            <span class="material-symbols-outlined text-sm">
                                                close
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <p class="text-center mt-2 mb-1 text-xs truncate">{{ img.name }}</p>
                            </div>
                        </VueDraggable>
                    </div>
                </div>

                <!-- COLLAPSE ALCANCE Y ENVÍO DEL COMUNICADO -->
                <div class="collapse collapse-arrow bg-base-100 mb-5 border border-base-300">
                    <input type="checkbox" name="communication-publication-type" checked />
                    <div class="collapse-title border-b-1 border-base-300 mb-6 !font-bold">
                        Alcance y envío del comunicado
                    </div>
                    <div class="collapse-content text-sm">
                        <div class="grid grid-cols-12 gap-5">
                            <!-- Publication Type Radio Buttons -->
                            <div class="col-span-12">
                                <label class="label mb-3">
                                    <span class="label-text font-semibold">
                                        ¿A quién va dirigido?
                                        <span class="text-error">*</span>
                                    </span>
                                </label>
                                <div class="flex flex-col gap-3">
                                    <label
                                        class="cursor-pointer flex items-center gap-3 p-4 border border-base-300 rounded-lg hover:bg-base-200 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <input
                                            type="radio"
                                            name="publicationType"
                                            value="publish"
                                            v-model="publicationType"
                                            class="radio radio-primary"
                                        />
                                        <div class="flex-1">
                                            <div class="font-semibold">Publicar a todos</div>
                                            <div class="text-xs text-base-content/60">
                                                El comunicado será visible para todos los empleados
                                            </div>
                                        </div>
                                    </label>
                                    <label
                                        class="cursor-pointer flex items-center gap-3 p-4 border border-base-300 rounded-lg hover:bg-base-200 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <input
                                            type="radio"
                                            name="publicationType"
                                            value="departments"
                                            v-model="publicationType"
                                            class="radio radio-primary"
                                        />
                                        <div class="flex-1">
                                            <div class="font-semibold">
                                                Publicar a departamentos específicos
                                            </div>
                                            <div class="text-xs text-base-content/60">
                                                Seleccione los departamentos que verán este
                                                comunicado
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!-- Departments Multi-Select (only shown when 'departments' is selected) -->
                            <BaseFormSelectMultiple
                                v-if="publicationType === 'departments'"
                                class="col-span-12"
                                name="departments"
                                label="Departamentos"
                                :options="departments"
                                :required="true"
                            />

                            <!-- Schedule Delivery Section -->
                            <div class="col-span-12 mt-4">
                                <h3 class="text-base font-semibold mb-1">Programación de Envío</h3>
                            </div>
                            <!-- Schedule Delivery Checkbox -->
                            <div class="col-span-12">
                                <div class="form-control">
                                    <label class="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="scheduleDelivery"
                                            class="checkbox checkbox-primary"
                                        />
                                        <span class="label-text font-semibold">
                                            Programar fecha y hora de envío por correo
                                        </span>
                                    </label>
                                    <p class="text-xs text-base-content/60 mt-2 ml-9">
                                        Active esta opción si desea que el comunicado se envíe por correo electrónico en una fecha y hora específica
                                    </p>
                                </div>
                            </div>

                            <!-- Delivery Date and Time (only shown when scheduleDelivery is true) -->
                            <template v-if="scheduleDelivery">
                                <BaseFormInput
                                    class="col-span-12 md:col-span-6"
                                    name="deliveryDate"
                                    label="Fecha de envío"
                                    type="date"
                                    :required="true"
                                />
                                <BaseFormInput
                                    class="col-span-12 md:col-span-6"
                                    name="deliveryTime"
                                    label="Hora de envío"
                                    type="time"
                                    :required="true"
                                />
                                <div class="col-span-12">
                                    <div class="alert alert-info">
                                        <span class="material-symbols-outlined">info</span>
                                        <span class="text-sm">
                                            El comunicado se enviará automáticamente por correo electrónico en la fecha y hora especificada.
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Preview Button -->
                <div class="mb-5">
                    <button
                        type="button"
                        @click="togglePreview"
                        class="btn btn-outline btn-secondary w-full"
                    >
                        <span class="material-symbols-outlined">
                            {{ showPreview ? 'visibility_off' : 'visibility' }}
                        </span>
                        {{ showPreview ? 'Ocultar Vista Previa' : 'Ver Vista Previa' }}
                    </button>
                </div>

                <!-- Preview Section -->
                <div
                    v-if="showPreview"
                    class="mb-5 p-6 bg-base-200 rounded-lg border border-base-300"
                >
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined">preview</span>
                        Vista Previa del Comunicado
                    </h3>
                    <div class="bg-base-100 p-6 rounded-lg">
                        <h4 class="text-2xl font-bold mb-4">{{ values.title || 'Sin título' }}</h4>
                        <div class="mb-4 flex gap-2 flex-wrap">
                            <span
                                :class="
                                    values.publicationType === 'publish'
                                        ? 'badge badge-primary'
                                        : 'badge badge-secondary'
                                "
                            >
                                {{
                                    values.publicationType === 'publish'
                                        ? 'Publicado a todos'
                                        : 'Por departamentos'
                                }}
                            </span>
                        </div>
                        <p class="whitespace-pre-wrap mb-4">
                            {{ values.content || 'Sin contenido' }}
                        </p>
                        <div
                            v-if="dragImagesRef.length > 0"
                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <img
                                v-for="(img, index) in dragImagesRef"
                                :key="index"
                                :src="img.url"
                                alt="Preview"
                                class="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <BaseFormActionButtons
                    :is-submitting="isSubmitting"
                    :is-edit-mode="isEditMode"
                    submit-text="comunicado"
                />
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Allow multiselect dropdown to be visible inside accordion */
.collapse-arrow:has(.multiselect--active) {
    overflow: visible !important;
}

.collapse-arrow:has(.multiselect--active) .collapse-content {
    overflow: visible !important;
    min-height: 350px !important;
}

/* Ensure proper spacing for the multiselect */
.collapse-content:has(.multiselect) {
    padding-bottom: 250px !important;
}

/* Reset padding when multiselect is closed */
.collapse-content:has(.multiselect:not(.multiselect--active)) {
    padding-bottom: 1rem !important;
}

/* Ensure the multiselect dropdown has proper z-index */
.multiselect__content-wrapper {
    z-index: 50 !important;
}

/* Wiggle animation for delete mode */
@keyframes wiggle {
    0%,
    100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-2deg);
    }
    75% {
        transform: rotate(2deg);
    }
}

.animate-wiggle {
    animation: wiggle 0.3s ease-in-out infinite;
}
</style>

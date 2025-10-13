<script setup lang="ts">
import { ref, watchEffect, onUnmounted, watch } from 'vue'
import { useField } from 'vee-validate'
import styles from '@inventario/ConfiguracionDeInventario/CrearProducto/styles/createProduct.module.css'

const props = defineProps<{
    name: string
    label: string
    imageUrl?: string
}>()

const fileNames = ref<string[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(props.imageUrl ?? null)

const { value : fileValue, errorMessage } = useField(props.name)
const { value : removeImageValue } = useField('removeImage')

watchEffect(() => {
    if ((!fileValue.value || fileValue.value.length === 0) && !errorMessage.value) {
        fileNames.value = []
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    }
})

const handleFileChange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files
    if (!files || files.length === 0) return
    const arr = Array.from(files)
    fileValue.value = arr

    // if single file, we update the preview
    const file = arr[0]
    previewUrl.value = URL.createObjectURL(file)
}

const removeImage = () => {
  previewUrl.value = null
  fileValue.value = [] 
  if (fileInput.value) fileInput.value.value = ''
  removeImageValue.value = true
}

onUnmounted(() => {
  if (previewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value)
  }
})

watch(
  () => props.imageUrl,
  (newUrl) => {
    previewUrl.value = newUrl ?? null
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col space-y-2">
    <p class="font-semibold text-start">{{ props.label }}</p>

    <div v-if="previewUrl">
        <div class="w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-lg flex-col indicator transition-shadow duration-300 flex items-center justify-center">
            <img
                :src="previewUrl"
                alt="Vista previa"
                class="object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-105"
            />
            <span
                class="indicator-item badge badge-error text-white cursor-pointer p-1"
                @click="removeImage"
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

    <div v-else class="flex justify-center items-center">
      <label
        :for="props.name"
        :class="[
          'w-full h-40 border-4 border-dashed rounded-lg flex justify-center items-center cursor-pointer hover:border-gray-400',
          errorMessage
            ? 'border-red-300 hover:border-red-400'
            : 'border-gray-300 hover:border-gray-400'
        ]"
      >
        <div class="text-center px-2">
          <span class="material-symbols-outlined animate-subtle-bounce text-lg">
            cloud_upload
          </span>
          <p class="mt-2 text-gray-500">
            Arrastra y suelta un archivo aquí o haz clic para seleccionar.
          </p>
        </div>
        <input
          ref="fileInput"
          type="file"
          :id="props.name"
          :name="props.name"
          class="hidden"
          @change="handleFileChange"
          :multiple="false"
          :accept="'image/*'"
        />
      </label>
    </div>

    <span v-if="errorMessage" class="text-sm text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
@keyframes subtleBounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}

.animate-subtle-bounce {
    animation: subtleBounce 2s ease-in-out infinite;
}
</style>

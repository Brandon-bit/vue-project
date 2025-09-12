<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
    name: string
    label: string
    multiple: boolean
    accept?: string
}>()

const fileNames = ref<string[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const { value, errorMessage } = useField(props.name)

// watch(value, (newValue) => {
//     if (!newValue.length) {
//         fileNames.value = []
//         value.value = ''
//         fileInput.value.value = ''
//     } else {
//         fileNames.value = newValue
//         value.value = newValue
//     }
// })

watchEffect(() => {
    if ((!value.value || value.value.length === 0) && !errorMessage.value) {
        fileNames.value = []
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    }
})

const handleFileChange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files
    if (!files) return
    const arr = Array.from(files)
    fileNames.value = arr
    value.value = arr
}
</script>

<template>
    <div class="flex flex-col space-y-2">
        <p class="font-semibold text-start">{{ props.label }}</p>
        <div class="flex justify-center items-center">
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
                    <p v-if="!fileNames.length" class="mt-2 text-gray-500">
                        Arrastra y suelta un archivo aquí o haz clic para seleccionar.
                    </p>
                    <div v-if="fileNames.length" class="mt-3 text-gray-600">
                        <div v-for="(file, index) in fileNames" :key="index">
                            {{ file.name }}
                        </div>
                    </div>
                    <p v-else class="mt-3 text-gray-500">No se ha seleccionado ningún archivo.</p>
                </div>
                <input
                    ref="fileInput"
                    type="file"
                    :id="props.name"
                    :name="props.name"
                    class="hidden"
                    :class="{ 'input-error': errorMessage }"
                    @change="handleFileChange"
                    :multiple="props.multiple || false"
                    :accept="accept || '*/*'"
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

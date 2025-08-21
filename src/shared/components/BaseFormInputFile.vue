<script setup lang="ts">
import { ref } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
    name: string
    label: string
    multiple: boolean
}>()

const fileNames = ref([])

const { value, errorMessage } = useField(props.name)
const handleFileChange = (event) => {
    const files = event.target.files
    fileNames.value = Array.from(files)
    value.value = files
}
</script>

<template>
    <div class="flex flex-col space-y-2">
        <p class="font-semibold text-start">{{ props.label }}</p>
        <div class="flex justify-center items-center">
            <label
                :for="props.name"
                class="w-full h-40 border-4 p-3 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer hover:border-gray-400"
            >
                <div class="text-center">
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
                </div>
                <input
                    type="file"
                    :id="props.name"
                    :name="props.name"
                    class="hidden"
                    :class="{ 'input-error': errorMessage }"
                    @change="handleFileChange"
                    :multiple="props.multiple || false"
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

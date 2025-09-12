<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { Ref, ref, computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
const props = defineProps<{
    dragImagesRef: Ref<any[]>
    name: string
    className?: string
    setFieldValue: (field: string, value: any) => void
}>()

const isReadyToDeleteData = ref(false)

const dragImagesValue = computed({
    get: () => props.dragImagesRef.value,
    set: (value) => {
        props.dragImagesRef.value = value
    }
})

const deleteImage = (imageIndex: number) => {
    props.dragImagesRef.value.splice(imageIndex, 1)
    if (!props.dragImagesRef.value.length) {
        props.setFieldValue(props.name, [])
        props.dragImagesRef.value = []
        isReadyToDeleteData.value = false
    }
}
</script>
<template>
    <div v-if="props.dragImagesRef.value?.length" class="text-right my-4">
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
    <VueDraggable v-model="dragImagesValue" class="grid grid-cols-12 gap-3 mt-10" :animation="200">
        <div
            v-for="(img, index) in props.dragImagesRef.value"
            :key="img.id"
            :class="`col-span-12 sm:col-span-6 m-auto ${className}`"
        >
            <div class="container-product-image">
                <div
                    :class="[
                        'w-full aspect-square bg-white rounded-xl shadow-md hover:shadow-lg flex flex-col indicator transition-shadow duration-300 flex items-center justify-center',
                        { wiggle: isReadyToDeleteData }
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
                        <span class="material-symbols-outlined icon-delete-image"> close </span>
                    </span>
                </div>
            </div>
            <p class="text-center mt-3 mb-2">{{ img.name }}</p>
        </div>
    </VueDraggable>
</template>
<style scoped>
@keyframes wiggle {
    0% {
        transform: rotate(-1deg);
    }
    25% {
        transform: rotate(1deg);
    }
    50% {
        transform: rotate(-1deg);
    }
    75% {
        transform: rotate(1deg);
    }
    100% {
        transform: rotate(-1deg);
    }
}

.wiggle {
    animation: wiggle 0.46s ease-in-out infinite;
}
.icon-delete-image {
    font-size: 15px;
}
</style>

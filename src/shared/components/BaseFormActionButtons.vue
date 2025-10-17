<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
    isSubmitting: boolean
    isEditMode: boolean
    submitText?: string
    cancelText?: string
    onCancel?: () => void
}>()

const router = useRouter()

const handleCancel = () => {
    if (props.onCancel) {
        props.onCancel()
    } else {
        router.back()
    }
}

const getSubmitText = () => {
    if (props.submitText) {
        return props.isEditMode ? `Actualizar ${props.submitText}` : `Crear ${props.submitText}`
    }
    return props.isEditMode ? 'Actualizar' : 'Crear'
}
</script>

<template>
    <div class="grid grid-cols-12 justify-end gap-4 mt-10">
        <button 
            type="button" 
            @click="handleCancel" 
            class="btn col-span-6 modern-btn"
            :disabled="isSubmitting"
        >
            {{ cancelText || 'Regresar' }}
        </button>
        <button
            type="submit"
            class="btn btn-primary col-span-6 modern-btn"
            :disabled="isSubmitting"
        >
            <template v-if="isSubmitting">
                <span class="loading loading-spinner"></span>
                Procesando...
            </template>
            <template v-else>
                {{ getSubmitText() }}
            </template>
        </button>
    </div>
</template>

<style scoped>
.modern-btn {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    font-weight: 500;
}

.modern-btn:active {
    transform: scale(0.98);
}

.modern-btn:not(:disabled):hover {
    transform: translateY(-0.0625rem);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.modern-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
}
</style>

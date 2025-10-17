<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModalStore } from '@sharedstore/modal.store'
import StepNavigation from './StepNavigation.vue'

const props = defineProps<{
    stepForm?: boolean
    onSubmit: () => void
    onClose?: () => void
    modalId: string
    isSubmitting: boolean
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const modalStore = useModalStore()

watch(
    () => modalStore.modals[props.modalId]?.status,
    (isOpen) => {
        const dialog = modalRef.value as HTMLDialogElement | null
        if (!dialog) return

        if (isOpen && !dialog.open) {
            dialog.showModal()
        } else if (!isOpen && dialog.open) {
            dialog.close()
        }
    },
    { immediate: true }
)

const close = () => {
    if (props.onClose) {
        props.onClose()
    }
    modalStore.close(props.modalId)
    const dialog = modalRef.value as HTMLDialogElement | null
    if (dialog?.open) dialog.close()
}
</script>

<template>
    <dialog ref="modalRef" class="modal sm:modal-middle modern-modal" @close="false">
        <div class="modal-box overflow-auto scrollbar-hide modern-modal-box">
            <div class="header-modal mb-10 col-span-12 grid grid-cols-12 items-center">
                <div class="col-span-1"></div>
                <p class="text-2xl font-bold text-center col-span-10 modal-title">
                    {{ modalStore.modals[props.modalId]?.title }}
                </p>
                <div class="col-span-1 text-right">
                    <button
                        v-if="stepForm"
                        @click="close"
                        class="btn btn-sm btn-circle btn-ghost right-2 top-2 modern-close-btn"
                    >
                        <span class="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            </div>
            <div class="content-modal col-span-12">
                <form method="dialog" class="space-y-4" @submit.prevent="props.onSubmit">
                    <slot name="modalBody"> </slot>
                    <div class="footer-modal grid grid-cols-12 justify-end gap-4 mt-10">
                        <StepNavigation
                            v-if="stepForm"
                            @submit="onSubmit"
                            :isSubmitting="isSubmitting"
                        />

                        <template v-else>
                            <button type="button" @click="close" class="btn col-span-6 modern-modal-btn">
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary col-span-6 modern-modal-btn modern-submit-btn"
                                :disabled="isSubmitting"
                            >
                                <template v-if="isSubmitting">
                                    <span class="loading loading-spinner"></span>
                                    Procesando...
                                </template>
                                <template v-else> Aceptar </template>
                            </button>
                        </template>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
</template>

<style scoped>
.modern-modal::backdrop {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease-in-out;
}

.modern-modal-box {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    border-radius: 1rem;
    animation: slideIn 0.3s ease-out;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
    color: oklch(var(--color-primary));
    font-weight: 700;
    letter-spacing: -0.02em;
}

.modern-close-btn {
    transition: all 0.3s;
}

.modern-close-btn:hover {
    transform: rotate(90deg);
    background-color: oklch(var(--color-error) / 0.1);
}

.modern-modal-btn {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    font-weight: 500;
}

.modern-modal-btn:hover {
    transform: translateY(-0.0625rem);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.modern-modal-btn:active {
    transform: scale(0.98);
}

.modern-submit-btn:disabled {
    opacity: 0.7;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.header-modal p {
    font-weight: 600;
}

@media (width < 500px) {
    .modal-box {
        width: 100%;
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        place-content: center;
    }
}
</style>

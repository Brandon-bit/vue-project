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
    <dialog ref="modalRef" class="modal sm:modal-middle" @close="false">
        <div class="modal-box overflow-auto scrollbar-hide">
            <div class="header-modal mb-10 col-span-12 grid grid-cols-12">
                <div class="col-span-1"></div>
                <p class="text-2xl font-bold text-center col-span-10">
                    {{ modalStore.modals[props.modalId]?.title }}
                </p>
                <div class="col-span-1 text-right">
                    <button
                        v-if="stepForm"
                        @click="close"
                        class="btn btn-sm btn-circle btn-ghost right-2 top-2"
                    >
                        ✕
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
                            <button type="button" @click="close" class="btn col-span-6">
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary col-span-6"
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

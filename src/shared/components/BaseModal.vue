<script setup lang="ts">
import { ref, watch } from 'vue'
import { useModalStore } from '@sharedstore/modal.store'
import type { Ref } from 'vue'

const props = defineProps<{
    modalId: { type: String; required: true }
    onSubmit: () => void
    modalTitle: String
    isSubmitting: Ref<boolean>
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const modalStore = useModalStore()

watch(
    () => modalStore.modals[props.modalId],
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
    modalStore.close(props.modalId)
    const dialog = modalRef.value as HTMLDialogElement | null
    if (dialog?.open) dialog.close()
}
</script>

<template>
    <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" @close="close">
        <div class="modal-box !px-10 max-w-none w-full">
            <div class="header-modal mb-10">
                <p class="text-2xl font-bold text-center">{{ modalTitle }}</p>
            </div>
            <div class="content-modal">
                <form method="dialog" class="space-y-4" @submit.prevent="props.onSubmit">
                    <slot name="modalBody"> </slot>
                    <div class="footer-modal grid grid-cols-12 justify-end gap-4 mt-10">
                        <button type="button" @click="close" class="btn col-span-6">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="btn btn-primary col-span-6"
                            :disabled="isSubmitting"
                        >
                            {{ isSubmitting ? 'Procesando...' : 'Aceptar' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
</template>

<style>
.header-modal p {
    font-weight: 600;
}
</style>

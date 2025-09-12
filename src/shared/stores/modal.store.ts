import { defineStore } from 'pinia'

type ModalType = 'EDIT' | 'INFO' | 'DELETE' | 'STATUS' | 'CREATE' | 'LOAD'

interface ModalState {
    status: boolean
    data?: any
    title?: string
    type?: ModalType
    openedAt?: number
}

interface ModalOptions {
    data?: any
    title?: string
    type?: ModalType
}

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: {} as Record<string, ModalState>
    }),
    actions: {
        open(modalId: string, options?: ModalOptions) {
            this.modals[modalId] = {
                status: true,
                data: options?.data,
                title: options?.title,
                type: options?.type,
                openedAt: Date.now()
            }
        },
        close(modalId: string) {
            this.modals[modalId].status = false
        },
        toggle(modalId: string) {
            this.modals[modalId].status = !this.modals[modalId].status
        },
        isOpen(modalId: string): boolean {
            return !!this.modals[modalId].status
        },
        closeAll() {
            Object.keys(this.modals).forEach((id) => {
                this.modals[id].status = false
            })
        }
    }
})

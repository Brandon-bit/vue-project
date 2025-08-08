import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: {} as Record<string, boolean>,
  }),
  actions: {
    open(modalId: string) {
      this.modals[modalId] = true
    },
    close(modalId: string) {
      this.modals[modalId] = false
    },
    toggle(modalId: string) {
      this.modals[modalId] = !this.modals[modalId]
    },
    isOpen(modalId: string): boolean {
      return !!this.modals[modalId]
    },
    closeAll() {
      Object.keys(this.modals).forEach(id => {
        this.modals[id] = false
      })
    }
  },
})

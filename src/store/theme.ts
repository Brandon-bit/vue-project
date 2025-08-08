import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'corporate'
  }),
  actions: {
    setTheme(theme: string) {
        this.currentTheme = theme
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    },
    loadTheme() {
      const saved = localStorage.getItem('app-theme') || 'corporate'
      this.setTheme(saved)
    }
  }
})

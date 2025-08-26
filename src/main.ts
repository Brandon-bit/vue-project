import { createApp } from 'vue'
// Styles
import './style.css'
// App
import App from './App.vue'
// Router
import router from './router'
// Pinia
import { createPinia } from 'pinia'
// Toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// Floatin vue
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
// Theme
import { useThemeStore } from './store/theme'
import { nextTick } from 'vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(FloatingVue)
const themeStore = useThemeStore()
themeStore.loadTheme()
app.mount('#app')
nextTick(() => {
    requestAnimationFrame(() => {
        const loader = document.getElementById('initial-loader')
        if (loader) {
            loader.remove()
        }
    })
})

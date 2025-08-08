import { createApp } from 'vue'
// Styles
import './style.css'
// App
import App from './App.vue'
// Router
import router from './router'
<<<<<<< Updated upstream
// Pinia
import { createPinia } from 'pinia'
// Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Floatin vue
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
// Theme
import { useThemeStore } from './store/theme'
=======
import { createPinia } from 'pinia'
>>>>>>> Stashed changes

const app = createApp(App)
app.use(createPinia())
app.use(router)
<<<<<<< Updated upstream
app.use(Toast)
app.use(FloatingVue)
const themeStore = useThemeStore()
themeStore.loadTheme()
=======
app.use(createPinia())
>>>>>>> Stashed changes
app.mount('#app')

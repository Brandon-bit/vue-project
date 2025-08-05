import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            //CORE
            '@core': path.resolve(__dirname, './src/core'),
            //SIDEBAR
            '@administracion': path.resolve(__dirname, './src/modules/administracion'),
            '@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
            '@mantenimiento': path.resolve(__dirname, './src/modules/mantenimiento'),
            '@marketing': path.resolve(__dirname, './src/modules/marketing'),
            '@procesos': path.resolve(__dirname, './src/modules/procesos'),
            '@proyectos': path.resolve(__dirname, './src/modules/proyectos'),
            '@recursosHumanos': path.resolve(__dirname, './src/modules/recursosHumanos'),
            //TOPBAR
            '@exportar': path.resolve(__dirname, './src/shared/topbar/exportar'),
            '@listaPendientes': path.resolve(__dirname, './src/shared/topbar/listaPendientes'),
            '@indicadores': path.resolve(__dirname, './src/shared/topbar/indicadores'),
            '@portafolioProyectos': path.resolve(
                __dirname,
                './src/shared/topbar/portafolioProyectos'
            ),
            '@roadMap': path.resolve(__dirname, './src/shared/topbar/roadMap'),
            '@agenda': path.resolve(__dirname, './src/shared/topbar/agenda'),
            '@tutoriales': path.resolve(__dirname, './src/shared/topbar/tutoriales'),
            '@soporte': path.resolve(__dirname, './src/shared/topbar/soporte'),
            '@perfil': path.resolve(__dirname, './src/shared/topbar/perfil'),
            '@escalaNegocio': path.resolve(__dirname, './src/shared/topbar/escalaNegocio')
        }
    }
})

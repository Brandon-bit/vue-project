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
            //MODULES
            '@administracion': path.resolve(__dirname, './src/modules/administracion'),
            '@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
            '@mantenimiento': path.resolve(__dirname, './src/modules/mantenimiento'),
            '@marketing': path.resolve(__dirname, './src/modules/marketing'),
            '@procesos': path.resolve(__dirname, './src/modules/procesos'),
            '@proyectos': path.resolve(__dirname, './src/modules/proyectos'),
            '@recursosHumanos': path.resolve(__dirname, './src/modules/recursosHumanos'),
            //NAVBAR
            '@exportar': path.resolve(__dirname, './src/navbar/Exportar'),
            '@listaDePendientes': path.resolve(__dirname, './src/navbar/ListaDePendientes'),
            '@indicadores': path.resolve(__dirname, './src/navbar/Indicadores'),
            '@portafolioDeProyectos': path.resolve(__dirname, './src/navbar/PortafolioDeProyectos'),
            '@roadMap': path.resolve(__dirname, './src/navbar/RoadMap'),
            '@agenda': path.resolve(__dirname, './src/navbar/Agenda'),
            '@tutoriales': path.resolve(__dirname, './src/navbar/Tutoriales'),
            '@soporte': path.resolve(__dirname, './src/navbar/Soporte'),
            '@perfil': path.resolve(__dirname, './src/navbar/Perfil'),
            '@escalaTuNegocio': path.resolve(__dirname, './src/navbar/EscalaTuNegocio')
        }
    }
})

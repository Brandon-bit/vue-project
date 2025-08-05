<template>
    <div class="flex bg-[var(--black)] h-screen">
        <div
            :class="['transition-all duration-300', showSidebar && !isSmallScreen ? 'w-64' : 'w-0']"
        >
            <component :is="isSmallScreen ? Drawer : Sidebar" />
        </div>
        <div :class="['flex-1 bg-white rounded m-2']">
            <div>
                <NavBar />
            </div>
            <main class="p-6">
                <router-view />
                <!-- Aquí se renderizan las vistas -->
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import Sidebar from '@core/components/SideBar.vue'
import NavBar from '@core/components/NavBar.vue'
import Drawer from '@core/components/Drawer.vue'

const showSidebar = ref(true)
const isSmallScreen = ref(false)
const modulos = ref([
    {
        icon: '',
        name: '',
        sections: [
            {
                icon: 'fas fa-users',
                name: 'Usuarios',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Lista'
                    },
                    {
                        url: '#',
                        name: 'Nuevo'
                    }
                ]
            },
            {
                icon: 'fas fa-users',
                name: 'Configuración',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Días inhabiles'
                    }
                ]
            }
        ]
    },
    {
        // Proyectos
        icon: 'fas fas fa-paper-plane',
        name: 'Proyectos',
        sections: [
            {
                // Configuracion
                icon: '',
                name: 'Configuración',
                open: false,
                views: [
                    {
                        url: '/proyecto/configuracion',
                        name: 'General'
                    },
                    {
                        url: '/proyecto/plantillas',
                        name: 'Plantillas'
                    }
                ]
            },
            {
                // Gestion de Proyectos
                icon: '',
                name: 'Gestión de Proyectos',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Análisis de iniciativas'
                    },
                    {
                        url: '#',
                        name: 'Alta de Proyectos'
                    },
                    {
                        url: '#',
                        name: 'Gantt'
                    },
                    {
                        url: '#',
                        name: 'Matriz de evidencias'
                    },
                    {
                        url: '#',
                        name: 'Costos'
                    },
                    {
                        url: '#',
                        name: 'Estatus financiero'
                    },
                    {
                        url: '#',
                        name: 'Resumen de proyectos'
                    },
                    {
                        url: '#',
                        name: 'Beneficios'
                    },
                    {
                        url: '#',
                        name: 'Riesgos'
                    },
                    {
                        url: '#',
                        name: 'Cambios'
                    },
                    {
                        url: '#',
                        name: 'Charter de Proyectos'
                    },
                    {
                        url: '#',
                        name: 'Minutas'
                    },
                    {
                        url: '#',
                        name: 'Lecciones aprendidas'
                    }
                ]
            },
            {
                // Diagramas de decision
                icon: '',
                name: 'Diagramas de Desición',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Pareto'
                    },
                    {
                        url: '#',
                        name: 'Matriz Causa y Efecto'
                    },
                    {
                        url: '#',
                        name: 'Matriz Toma de Decisiones'
                    },
                    {
                        url: '#',
                        name: 'Matriz RASCI'
                    },
                    {
                        url: '#',
                        name: 'Lluvia de Ideas'
                    },
                    {
                        url: '#',
                        name: '5 por Que’s'
                    }
                ]
            },
            {
                // Administracion del cambio
                icon: '',
                name: 'Administración del Cambio',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Generación y Gestión Encuestas'
                    },
                    {
                        url: '#',
                        name: 'Documentos de Capacitación'
                    },
                    {
                        url: '#',
                        name: 'Generación y Gestión de Exámenes'
                    }
                ]
            }
        ]
    },
    {
        // Procesos
        icon: 'fas fas fa-paper-plane',
        name: 'Procesos',
        sections: [
            {
                // Procesos de Negocio
                icon: '',
                name: 'Procesos de Negocio',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Cadenas de Valor'
                    },
                    {
                        url: '#',
                        name: 'Diagrama de Procesos'
                    },
                    {
                        url: '#',
                        name: 'Implementación de Olas'
                    },
                    {
                        url: '#',
                        name: 'Matriz de VoBo'
                    },
                    {
                        url: '#',
                        name: 'Metodología de Procesos'
                    },
                    {
                        url: '#',
                        name: 'Matriz Reducción de Tiempos (AsIs – ToBe)'
                    },
                    {
                        url: '#',
                        name: 'RASCI'
                    },
                    {
                        url: '#',
                        name: 'Tiempos y Movimientos'
                    }
                ]
            },
            {
                // Manuales y Politicas
                icon: '',
                name: 'Manuales y Políticas',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Almacenamiento de Manuales y Políticas'
                    },
                    {
                        url: '#',
                        name: 'Configuración'
                    }
                ]
            },
            {
                // Administracion del Cambio
                icon: '',
                name: 'Administración del Cambio',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Generación y Gestión Encuestas'
                    },
                    {
                        url: '#',
                        name: 'Documentos de Capacitación'
                    },
                    {
                        url: '#',
                        name: 'Generación y Gestión de Exámenes'
                    }
                ]
            }
        ]
    },
    {
        // Recursos Humanos
        icon: 'fas fas fa-sitemap',
        name: 'Recursos Humanos',
        sections: [
            {
                // Procesos de Negocio
                icon: '',
                name: 'Recursos Humanos',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Comunicados Organizacionales'
                    },
                    {
                        url: '#',
                        name: 'Gestor de Entrevistas'
                    },
                    {
                        url: '#',
                        name: 'Selección y Aprobación de Candidatos'
                    },
                    {
                        url: '#',
                        name: 'Organigramas'
                    },
                    {
                        url: '#',
                        name: 'Publicación de Vacantes'
                    }
                ]
            }
        ]
    },
    {
        // Marketing
        icon: 'fas fas fa-bullhorn',
        name: 'Marketing',
        sections: [
            {
                // Marketing
                icon: '',
                name: 'Marketing',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Gestor de Proveedores'
                    },
                    {
                        url: '#',
                        name: 'Coordinador de Redes Sociales'
                    },
                    {
                        url: '#',
                        name: 'Benchmarking'
                    },
                    {
                        url: '#',
                        name: 'Mystery Shopper'
                    },
                    {
                        url: '#',
                        name: 'Administración'
                    },
                    {
                        url: '#',
                        name: 'Presupuestos'
                    }
                ]
            },
            {
                // Campañas
                icon: '',
                name: 'Campañas',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Campañas'
                    },
                    {
                        url: '#',
                        name: 'Daily Standup'
                    },
                    {
                        url: '#',
                        name: 'Retroalimentación'
                    },
                    {
                        url: '#',
                        name: 'SprintBacklog'
                    },
                    {
                        url: '#',
                        name: 'Configuración'
                    }
                ]
            }
        ]
    },
    {
        // Comercial
        icon: 'fas fas fa-hand-holding-usd',
        name: 'Comercial',
        sections: [
            {
                // Ventas
                icon: '',
                name: 'Ventas',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Prospectos'
                    },
                    {
                        url: '#',
                        name: 'Clientes'
                    },
                    {
                        url: '#',
                        name: 'Gestor de ventas'
                    },
                    {
                        url: '#',
                        name: 'Configuración'
                    }
                ]
            }
        ]
    },
    {
        // Administracion
        icon: 'fas far fa-money-bill-alt',
        name: 'Administración',
        sections: [
            {
                // Administración
                icon: '',
                name: 'Administración',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Facturación'
                    },
                    {
                        url: '#',
                        name: 'Cuadre mensual'
                    },
                    {
                        url: '#',
                        name: 'Cotizaciones'
                    }
                ]
            }
        ]
    },
    {
        // Admon. de la información
        icon: 'fas fas fa-user-shield',
        name: 'Admon. de la información',
        sections: [
            {
                // Gestión
                icon: '',
                name: 'Gestión',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Recolección'
                    },
                    {
                        url: '#',
                        name: 'Base de datos'
                    }
                ]
            }
        ]
    },
    {
        // Operaciones y Mantenimiento
        icon: 'fas fas fa-cog',
        name: 'Operaciones y Mantenimiento',
        sections: [
            {
                // Configuración
                icon: '',
                name: 'Configuración',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Categorías Ticket'
                    },
                    {
                        url: '#',
                        name: 'Categorías Activos'
                    },
                    {
                        url: '#',
                        name: 'Ubicaciones'
                    },
                    {
                        url: '#',
                        name: 'Opciones Personalizadas'
                    },
                    {
                        url: '#',
                        name: 'Grupos de Activos'
                    },
                    {
                        url: '#',
                        name: 'Codigo QR'
                    }
                ]
            },
            {
                // Operaciones
                icon: '',
                name: 'Operaciones',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Generación de Ticket'
                    },
                    {
                        url: '#',
                        name: 'Administración de Ticket'
                    },
                    {
                        url: '#',
                        name: 'Análisis y Comparación de Propuestas'
                    }
                ]
            },
            {
                // Mantenimiento
                icon: '',
                name: 'Mantenimiento',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Matriz de Activos'
                    },
                    {
                        url: '#',
                        name: 'Programa de Mantenimiento'
                    },
                    {
                        url: '#',
                        name: 'Mantenimiento Preventivo'
                    },
                    {
                        url: '#',
                        name: 'Mantenimiento Correctivo'
                    },
                    {
                        url: '#',
                        name: 'Bitácora Mantenimiento'
                    },
                    {
                        url: '#',
                        name: 'Inspección Activos'
                    }
                ]
            },
            {
                // Depreciación
                icon: '',
                name: 'Depreciación',
                open: false,
                views: [
                    {
                        url: '#',
                        name: 'Depreciación de Activos'
                    }
                ]
            }
        ]
    }
])

const checkScreen = () => {
    isSmallScreen.value = window.matchMedia('(max-width: 768px)').matches
}

onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen)
})

provide('showSidebar', showSidebar)
provide('modulos', modulos)
</script>

<template>
    <div class="flex bg-[var(--black)] h-screen overflow-hidden">
        <div
            :class="[
                'transition-all duration-300',
                isSmallScreen ? 'w-0' : showSidebar ? 'w-64' : 'w-13'
            ]"
        >
            <component :is="isSmallScreen ? Drawer : Sidebar" />
        </div>
        <div
            :class="[
                'flex flex-col flex-1 bg-[var(--color-base-100)] rounded overflow-hidden',
                isSmallScreen ? 'm-2' : showSidebar ? 'm-2' : 'my-2 mr-2'
            ]"
        >
            <div>
                <NavBar />
            </div>
            <main class="h-screen overflow-auto scrollbar-hide px-4 py-6">
                <div class="w-full lg:max-w-[90%] lg:mx-auto">
                    <router-view />
                </div>
                <!-- Aquí se renderizan las vistas -->
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import Sidebar from '@core/InSessionLayout/components/SideBar.vue'
import NavBar from '@core/InSessionLayout/components/NavBar.vue'
import Drawer from '@core/InSessionLayout/components/Drawer.vue'

const showSidebar = ref(false)
const showLogo = ref(true)
const isSmallScreen = ref(false)
// const modulos = ref([
//     {
//         icon: '',
//         name: '',
//         sections: [
//             {
//                 icon: 'fas fa-users',
//                 name: 'Usuarios',
//                 open: false,
//                 views: [
//                     {
//                         url: '/usuario',
//                         name: 'Lista'
//                     },
//                     {
//                         url: '/usuario/nuevo',
//                         name: 'Nuevo'
//                     }
//                 ]
//             },
//             {
//                 icon: 'fas fa-users',
//                 name: 'Configuración',
//                 open: false,
//                 views: [
//                     {
//                         url: '/dias-inhabiles',
//                         name: 'Días inhabiles'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Proyectos
//         icon: 'view_timeline',
//         name: 'Proyectos',
//         sections: [
//             {
//                 // Configuracion
//                 icon: '',
//                 name: 'Configuración',
//                 open: false,
//                 views: [
//                     {
//                         url: '/proyecto/configuracion',
//                         name: 'General'
//                     },
//                     {
//                         url: '/proyecto/plantillas',
//                         name: 'Plantillas'
//                     }
//                 ]
//             },
//             {
//                 // Gestion de Proyectos
//                 icon: '',
//                 name: 'Gestión de Proyectos',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Análisis de iniciativas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Alta de Proyectos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Gantt'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz de evidencias'
//                     },
//                     {
//                         url: '#',
//                         name: 'Costos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Estatus financiero'
//                     },
//                     {
//                         url: '#',
//                         name: 'Resumen de proyectos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Beneficios'
//                     },
//                     {
//                         url: '#',
//                         name: 'Riesgos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Cambios'
//                     },
//                     {
//                         url: '#',
//                         name: 'Charter de Proyectos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Minutas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Lecciones aprendidas'
//                     }
//                 ]
//             },
//             {
//                 // Diagramas de decision
//                 icon: '',
//                 name: 'Diagramas de Desición',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Pareto'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz Causa y Efecto'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz Toma de Decisiones'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz RASCI'
//                     },
//                     {
//                         url: '#',
//                         name: 'Lluvia de Ideas'
//                     },
//                     {
//                         url: '#',
//                         name: '5 por Que’s'
//                     }
//                 ]
//             },
//             {
//                 // Administracion del cambio
//                 icon: '',
//                 name: 'Administración del Cambio',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Generación y Gestión Encuestas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Documentos de Capacitación'
//                     },
//                     {
//                         url: '#',
//                         name: 'Generación y Gestión de Exámenes'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Procesos
//         icon: 'rebase_edit',
//         name: 'Procesos',
//         sections: [
//             {
//                 // Procesos de Negocio
//                 icon: '',
//                 name: 'Procesos de Negocio',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Cadenas de Valor'
//                     },
//                     {
//                         url: '#',
//                         name: 'Diagrama de Procesos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Implementación de Olas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz de VoBo'
//                     },
//                     {
//                         url: '#',
//                         name: 'Metodología de Procesos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Matriz Reducción de Tiempos (AsIs – ToBe)'
//                     },
//                     {
//                         url: '#',
//                         name: 'RASCI'
//                     },
//                     {
//                         url: '#',
//                         name: 'Tiempos y Movimientos'
//                     }
//                 ]
//             },
//             {
//                 // Manuales y Politicas
//                 icon: '',
//                 name: 'Manuales y Políticas',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Almacenamiento de Manuales y Políticas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Configuración'
//                     }
//                 ]
//             },
//             {
//                 // Administracion del Cambio
//                 icon: '',
//                 name: 'Administración del Cambio',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Generación y Gestión Encuestas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Documentos de Capacitación'
//                     },
//                     {
//                         url: '#',
//                         name: 'Generación y Gestión de Exámenes'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Recursos Humanos
//         icon: 'diversity_3',
//         name: 'Recursos Humanos',
//         sections: [
//             {
//                 // Procesos de Negocio
//                 icon: '',
//                 name: 'Recursos Humanos',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Comunicados Organizacionales'
//                     },
//                     {
//                         url: '#',
//                         name: 'Gestor de Entrevistas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Selección y Aprobación de Candidatos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Organigramas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Publicación de Vacantes'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Marketing
//         icon: 'campaign',
//         name: 'Marketing',
//         sections: [
//             {
//                 // Marketing
//                 icon: '',
//                 name: 'Marketing',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Gestor de Proveedores'
//                     },
//                     {
//                         url: '#',
//                         name: 'Coordinador de Redes Sociales'
//                     },
//                     {
//                         url: '#',
//                         name: 'Benchmarking'
//                     },
//                     {
//                         url: '#',
//                         name: 'Mystery Shopper'
//                     },
//                     {
//                         url: '#',
//                         name: 'Administración'
//                     },
//                     {
//                         url: '#',
//                         name: 'Presupuestos'
//                     }
//                 ]
//             },
//             {
//                 // Campañas
//                 icon: '',
//                 name: 'Campañas',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Campañas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Daily Standup'
//                     },
//                     {
//                         url: '#',
//                         name: 'Retroalimentación'
//                     },
//                     {
//                         url: '#',
//                         name: 'SprintBacklog'
//                     },
//                     {
//                         url: '#',
//                         name: 'Configuración'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Comercial
//         icon: 'store',
//         name: 'Comercial',
//         sections: [
//             {
//                 // Ventas
//                 icon: '',
//                 name: 'Ventas',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Prospectos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Clientes'
//                     },
//                     {
//                         url: '#',
//                         name: 'Gestor de ventas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Configuración'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Administracion
//         icon: 'universal_currency_alt',
//         name: 'Administración',
//         sections: [
//             {
//                 // Administración
//                 icon: '',
//                 name: 'Administración',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Facturación'
//                     },
//                     {
//                         url: '#',
//                         name: 'Cuadre mensual'
//                     },
//                     {
//                         url: '#',
//                         name: 'Cotizaciones'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Admon. de la información
//         icon: 'admin_panel_settings',
//         name: 'Admon. de la información',
//         sections: [
//             {
//                 // Gestión
//                 icon: '',
//                 name: 'Gestión',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Recolección'
//                     },
//                     {
//                         url: '#',
//                         name: 'Base de datos'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Operaciones y Mantenimiento
//         icon: 'engineering',
//         name: 'Operaciones y Mantenimiento',
//         sections: [
//             {
//                 // Configuración
//                 icon: '',
//                 name: 'Configuración',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Categorías Ticket'
//                     },
//                     {
//                         url: '#',
//                         name: 'Categorías Activos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Ubicaciones'
//                     },
//                     {
//                         url: '#',
//                         name: 'Opciones Personalizadas'
//                     },
//                     {
//                         url: '#',
//                         name: 'Grupos de Activos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Codigo QR'
//                     }
//                 ]
//             },
//             {
//                 // Operaciones
//                 icon: '',
//                 name: 'Operaciones',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Generación de Ticket'
//                     },
//                     {
//                         url: '#',
//                         name: 'Administración de Ticket'
//                     },
//                     {
//                         url: '#',
//                         name: 'Análisis y Comparación de Propuestas'
//                     }
//                 ]
//             },
//             {
//                 // Mantenimiento
//                 icon: '',
//                 name: 'Mantenimiento',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Matriz de Activos'
//                     },
//                     {
//                         url: '#',
//                         name: 'Programa de Mantenimiento'
//                     },
//                     {
//                         url: '#',
//                         name: 'Mantenimiento Preventivo'
//                     },
//                     {
//                         url: '#',
//                         name: 'Mantenimiento Correctivo'
//                     },
//                     {
//                         url: '#',
//                         name: 'Bitácora Mantenimiento'
//                     },
//                     {
//                         url: '#',
//                         name: 'Inspección Activos'
//                     }
//                 ]
//             },
//             {
//                 // Depreciación
//                 icon: '',
//                 name: 'Depreciación',
//                 open: false,
//                 views: [
//                     {
//                         url: '#',
//                         name: 'Depreciación de Activos'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         // Inventarios
//         icon: 'inventory_2',
//         name: 'Inventarios',
//         sections: [
//             {
//                 // Configuración de Inventarios
//                 icon: '',
//                 name: 'Configuración de Inventarios',
//                 open: false,
//                 views: [
//                     {
//                         url: '/inventario/configuracion/productos',
//                         name: 'Productos'
//                     },
//                     {
//                         url: '/inventario/configuracion/crear-producto',
//                         name: 'Crear Producto'
//                     },
//                     {
//                         url: '/inventario/configuracion/productos-expiracion',
//                         name: 'Productos con expiración'
//                     },
//                     {
//                         url: '/inventario/configuracion/stock-bajo',
//                         name: 'Stock bajo'
//                     },
//                     {
//                         url: '/inventario/configuracion/categoria',
//                         name: 'Categoría'
//                     },
//                     {
//                         url: '/inventario/configuracion/SubCategoria',
//                         name: 'Sub Categoria'
//                     },
//                     {
//                         url: '/inventario/configuracion/marcas',
//                         name: 'Marcas'
//                     },
//                     {
//                         url: '/inventario/configuracion/unidades',
//                         name: 'Unidades'
//                     },
//                     {
//                         url: '/inventario/configuracion/atributos-variantes',
//                         name: 'Atributos Variantes'
//                     },
//                     {
//                         url: '/inventario/configuracion/garantias',
//                         name: 'Garantias'
//                     },
//                     {
//                         url: '/inventario/configuracion/imprimir-codigo-de-barras',
//                         name: 'Imprimir Codigo de Barras'
//                     },
//                     {
//                         url: '/inventario/configuracion/imprimir-codigo-qr',
//                         name: 'Imprimir Codigo QR'
//                     },
//                     {
//                          url: '/inventario/configuracion/crear-descuento',
//                          name: 'CrearDescuento'
//                      }
//                 ]
//             },
//             {
//                 // Operacion
//                 icon: '',
//                 name: 'Operación',
//                 open: false,
//                 views: [
//                     {
//                         url: '/inventario/operacion/puntos-de-reorden',
//                         name: 'Puntos de Reorden'
//                     },
//                     {
//                         url: '/inventario/operacion/auditoria-de-inventarios',
//                         name: 'Auditoría de Inventarios'
//                     },
//                     {
//                         url: '/inventario/operacion/gestion-de-pedidos',
//                         name: 'Gestión de Pedidos'
//                     },
//                     {
//                         url: '/inventario/operacion/controles-de-autorizacion-de-pedidos',
//                         name: 'Controles de autorización de pedidos'
//                     },
//                     {
//                         url: '/inventario/operacion/generacion-de-polizas-de-inventario',
//                         name: 'Generación de Polizas de Inventario'
//                     },
//                     {
//                         url: '/inventario/operacion/entradas-de-inventario',
//                         name: 'Entradas de Inventario'
//                     },
//                     {
//                         url: '/inventario/operacion/salidas-de-inventario',
//                         name: 'Salidas de Inventario'
//                     }
//                 ]
//             },
//             {
//                 // Stock
//                 icon: '',
//                 name: 'Stock',
//                 open: false,
//                 views: [
//                     {
//                         url: '/inventario/stock/administrar-stock',
//                         name: 'Administrar Stock'
//                     },
//                     {
//                         url: '/inventario/stock/ajuste-de-stock',
//                         name: 'Ajuste de Stock'
//                     },
//                     {
//                         url: '/inventario/stock/transferir-stock',
//                         name: 'Transferir Stock'
//                     }
//                 ]
//             }
//         ]
//     }
// ])
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
                        url: '/usuario',
                        name: 'Lista'
                    },
                    {
                        url: '/usuario/nuevo',
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
                        url: '/dias-inhabiles',
                        name: 'Días inhabiles'
                    }
                ]
            }
        ]
    },
    {
        // Inventarios
        icon: 'inventory_2',
        name: 'Inventarios',
        sections: [
            {
                // Configuración de Inventarios
                icon: '',
                name: 'Configuración de Inventarios',
                open: false,
                views: [
                    {
                        url: '/inventario/configuracion/productos',
                        name: 'Productos'
                    },
                    {
                        url: '/inventario/configuracion/crear-producto',
                        name: 'Crear Producto'
                    },
                    {
                        url: '/inventario/configuracion/productos-expiracion',
                        name: 'Productos con expiración'
                    },
                    {
                        url: '/inventario/configuracion/stock-bajo',
                        name: 'Stock bajo'
                    },
                    {
                        url: '/inventario/configuracion/categoria',
                        name: 'Categoría'
                    },
                    {
                        url: '/inventario/configuracion/SubCategoria',
                        name: 'Sub Categoria'
                    },
                    {
                        url: '/inventario/configuracion/marcas',
                        name: 'Marcas'
                    },
                    {
                        url: '/inventario/configuracion/unidades',
                        name: 'Unidades'
                    },
                    {
                        url: '/inventario/configuracion/atributos-variantes',
                        name: 'Atributos Variantes'
                    },
                    {
                        url: '/inventario/configuracion/garantias',
                        name: 'Garantias'
                    },
                    {
                        url: '/inventario/configuracion/imprimir-codigo-de-barras',
                        name: 'Imprimir Codigo de Barras'
                    },
                    {
                        url: '/inventario/configuracion/imprimir-codigo-qr',
                        name: 'Imprimir Codigo QR'
                    },
                    {
                        url: '/inventario/configuracion/crear-descuento',
                        name: 'CrearDescuento'
                    }
                ]
            },
            {
                // Operacion
                icon: '',
                name: 'Operación',
                open: false,
                views: [
                    {
                        url: '/inventario/operacion/puntos-maximos-minimos',
                        name: 'Puntos de Max/Min y Reorden'
                    },
                    {
                        url: '/inventario/operacion/auditoria-de-inventarios',
                        name: 'Auditoría de Inventarios'
                    },
                    {
                        url: '/inventario/operacion/gestion-de-pedidos',
                        name: 'Gestión de Pedidos'
                    },
                    {
                        url: '/inventario/operacion/controles-de-autorizacion-de-pedidos',
                        name: 'Controles de autorización de pedidos'
                    },
                    {
                        url: '/inventario/operacion/generacion-de-polizas-de-inventario',
                        name: 'Generación de Polizas de Inventario'
                    },
                    {
                        url: '/inventario/operacion/entradas-de-inventario',
                        name: 'Entradas de Inventario'
                    },
                    {
                        url: '/inventario/operacion/salidas-de-inventario',
                        name: 'Salidas de Inventario'
                    }
                ]
            },
            {
                // Stock
                icon: '',
                name: 'Stock',
                open: false,
                views: [
                    {
                        url: '/inventario/stock/administrar-stock',
                        name: 'Administrar Stock'
                    },
                    {
                        url: '/inventario/stock/ajuste-de-stock',
                        name: 'Ajuste de Stock'
                    },
                    {
                        url: '/inventario/stock/transferir-stock',
                        name: 'Transferir Stock'
                    }
                ]
            }
        ]
    },
    {
        // Inventarios
        icon: 'point_of_sale',
        name: 'POS',
        sections: [
            {
                // Configuración de Inventarios
                icon: '',
                name: 'POS',
                open: false,
                views: [
                    {
                        url: '/pos/punto-de-venta',
                        name: 'Punto de Venta'
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
provide('showLogo', showLogo)
provide('isSmallScreen', isSmallScreen)
provide('modulos', modulos)
</script>
<style>
.scrollbar-hide {
    -ms-overflow-style: none; /* IE y Edge */
    scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari y Opera */
}
</style>

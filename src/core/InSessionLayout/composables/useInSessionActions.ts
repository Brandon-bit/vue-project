import useInSessionStore from '@core/InSessionLayout/store/inSessionStore'
import {
    getDashboardsService,
    getModulesService
} from '@core/InSessionLayout/services/inSessionServices'
import {
    DashboardResponseType,
    DashboardType,
    ModuleResponseType,
    ModuleType,
    SectionResponseType,
    ViewResponseType
} from '@core/InSessionLayout/types/inSessionTypes'

export function useInSessionActions() {
    const inSessionStore = useInSessionStore()

    const modulos: ModuleType[] = [
        {
            // Inicio
            icon: 'home',
            name: 'Inicio',
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
            // Proyectos
            icon: 'send_time_extension',
            name: 'Proyectos',
            sections: [
                {
                    icon: '',
                    name: 'Configuración',
                    open: false,
                    views: [
                        {
                            url: '/proyectos/configuracion/general',
                            name: 'General'
                        },
                        {
                            url: '/proyectos/configuracion/plantillas',
                            name: 'Plantillas'
                        }
                    ]
                },
                {
                    icon: '',
                    name: 'Gestión de Proyectos',
                    open: false,
                    views: [
                        {
                            url: '/proyectos/gestion/analisis-de-iniciativas',
                            name: 'Análisis de Iniciativas'
                        },
                        {
                            url: '/proyectos/gestion/alta-de-proyectos',
                            name: 'Alta de Proyectos'
                        },
                        {
                            url: '/proyectos/gestion/gantt',
                            name: 'Gantt'
                        },
                        {
                            url: '/proyectos/gestion/matriz-de-evidencias',
                            name: 'Matriz de Evidencias'
                        },
                        {
                            url: '/proyectos/gestion/costos',
                            name: 'Costos'
                        },
                        {
                            url: '/proyectos/gestion/estatus-financiero',
                            name: 'Estatus Financiero'
                        },
                        {
                            url: '/proyectos/gestion/resumen-de-proyectos',
                            name: 'Resumen de Proyectos'
                        },
                        {
                            url: '/proyectos/gestion/beneficios',
                            name: 'Beneficios'
                        },
                        {
                            url: '/proyectos/gestion/riesgos',
                            name: 'Riesgos'
                        },
                        {
                            url: '/proyectos/gestion/cambios',
                            name: 'Cambios'
                        },
                        {
                            url: '/proyectos/gestion/charter-de-proyectos',
                            name: 'Charter de Proyectos'
                        },
                        {
                            url: '/proyectos/gestion/minutas',
                            name: 'Minutas'
                        },
                        {
                            url: '/proyectos/gestion/lecciones-aprendidas',
                            name: 'Lecciones Aprendidas'
                        }
                    ]
                },
                {
                    icon: '',
                    name: 'Diagramas de Decisión',
                    open: false,
                    views: [
                        {
                            url: '/proyectos/diagramas-de-decision/pareto',
                            name: 'Pareto'
                        },
                        {
                            url: '/proyectos/diagramas-de-decision/matriz-causa-y-efecto',
                            name: 'Matriz Causa y Efecto'
                        },
                        {
                            url: '/proyectos/diagramas-de-decision/matriz-toma-de-decisiones',
                            name: 'Matriz Toma de Decisiones'
                        },
                        {
                            url: '/proyectos/diagramas-de-decision/matriz-rasci',
                            name: 'Matriz RASCI'
                        },
                        {
                            url: '/proyectos/diagramas-de-decision/lluvia-de-ideas',
                            name: 'Lluvia de Ideas'
                        },
                        {
                            url: '/proyectos/diagramas-de-decision/5-por-que',
                            name: '5 por Ques'
                        }
                    ]
                },
                {
                    icon: '',
                    name: 'Administración del Cambio',
                    open: false,
                    views: [
                        {
                            url: '/proyectos/administracion-del-cambio/generacion-y-gestion-de-encuestas',
                            name: 'Generación y Gestión de Encuestas'
                        },
                        {
                            url: '/proyectos/administracion-del-cambio/documentos-de-capacitacion',
                            name: 'Documentos de Capacitación'
                        },
                        {
                            url: '/proyectos/administracion-del-cambio/generacion-y-gestion-de-examenes',
                            name: 'Generación y Gestión de Exámenes'
                        }
                    ]
                }
            ]
        },
        {
            // Procesos
            icon: 'rebase_edit',
            name: 'Procesos',
            sections: [
                {
                    icon: '',
                    name: 'Procesos de Negocio',
                    open: false,
                    views: [
                        {
                            url: '/procesos/procesos-de-negocio/cadena-de-valor',
                            name: 'Cadena de Valor'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/diagrama-de-procesos',
                            name: 'Diagrama de Procesos'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/implementacion-de-olas',
                            name: 'Implementación de Olas'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/matriz-de-vobo',
                            name: 'Matriz de VoBo'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/metodologia-de-procesos',
                            name: 'Metodología de Procesos'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/matriz-reduccion-de-tiempos',
                            name: 'Matriz Reducción de Tiempos (AsIs - ToBe)'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/rasci',
                            name: 'RASCI'
                        },
                        {
                            url: '/procesos/procesos-de-negocio/tiempos-y-movimientos',
                            name: 'Tiempos y Movimientos'
                        }
                    ]
                },
                {
                    icon: '',
                    name: 'Manuales y Políticas',
                    open: false,
                    views: [
                        {
                            url: '/procesos/manuales-y-politicas/almacenamiento-de-manuales-y-politicas',
                            name: 'Almacenamiento de Manuales y Políticas'
                        },
                        {
                            url: '/procesos/manuales-y-politicas/configuracion',
                            name: 'Configuración'
                        }
                    ]
                },
                {
                    icon: '',
                    name: 'Administración del Cambio',
                    open: false,
                    views: [
                        {
                            url: '/procesos/administracion-del-cambio/generacion-y-gestion-de-encuestas',
                            name: 'Generación y Gestión de Encuestas'
                        },
                        {
                            url: '/procesos/administracion-del-cambio/documentos-de-capacitacion',
                            name: 'Documentos de Capacitación'
                        },
                        {
                            url: '/procesos/administracion-del-cambio/generacion-y-gestion-de-examenes',
                            name: 'Generación y Gestión de Exámenes'
                        }
                    ]
                }
            ]
        },
        {
            // Inversiones
            icon: 'finance_mode',
            name: 'Inversiones',
            sections: [
                {
                    icon: '',
                    name: 'Inversiones',
                    open: false,
                    views: [
                        {
                            url: '/inversiones/calculadora-de-inversiones',
                            name: 'Calculadora de Inversiones'
                        },
                        {
                            url: '/inversiones/alta-de-clientes',
                            name: 'Alta de Clientes'
                        },
                        {
                            url: '/inversiones/documentos',
                            name: 'Documentos'
                        },
                        {
                            url: '/inversiones/contratos',
                            name: 'Contratos'
                        },
                        {
                            url: '/inversiones/matriz-de-operacion',
                            name: 'Matriz de Operación'
                        }
                    ]
                }
            ]
        },
        {
            // Créditos
            icon: 'credit_card',
            name: 'Créditos',
            sections: [
                {
                    icon: '',
                    name: 'Créditos',
                    open: false,
                    views: [
                        {
                            url: '/creditos/calculadora-de-creditos',
                            name: 'Calculadora de Créditos'
                        },
                        {
                            url: '/creditos/alta-de-clientes',
                            name: 'Alta de Clientes'
                        },
                        {
                            url: '/creditos/documentos',
                            name: 'Documentos'
                        },
                        {
                            url: '/creditos/contratos',
                            name: 'Contratos'
                        },
                        {
                            url: '/creditos/matriz-de-operacion',
                            name: 'Matriz de Operación'
                        }
                    ]
                }
            ]
        },
        {
            // Contabilidad
            icon: 'import_contacts',
            name: 'Contabilidad',
            sections: [
                {
                    icon: '',
                    name: 'Contabilidad',
                    open: false,
                    views: [
                        {
                            url: '/contabilidad/polizas-contables',
                            name: 'Pólizas Contables'
                        },
                        {
                            url: '/contabilidad/catalogo-de-cuentas',
                            name: 'Catálogo de Cuentas'
                        },
                        {
                            url: '/contabilidad/activos',
                            name: 'Activos'
                        },
                        {
                            url: '/contabilidad/depreciacion',
                            name: 'Depreciación'
                        },
                        {
                            url: '/contabilidad/operacion-de-movimientos',
                            name: 'Operación de Movimientos'
                        },
                        {
                            url: '/contabilidad/libros-de-diario',
                            name: 'Libros de Diario'
                        },
                        {
                            url: '/contabilidad/polizas-de-diario',
                            name: 'Pólizas de Diario'
                        },
                        {
                            url: '/contabilidad/polizas-de-ingresos',
                            name: 'Pólizas de Ingresos'
                        },
                        {
                            url: '/contabilidad/polizas-de-gastos',
                            name: 'Pólizas de Gastos'
                        }
                    ]
                }
            ]
        },
        {
            // Fiscal
            icon: 'contract_edit',
            name: 'Fiscal',
            sections: [
                {
                    icon: '',
                    name: 'Fiscal',
                    open: false,
                    views: [
                        {
                            url: '/fiscal/facturas-emitidas',
                            name: 'Facturas Emitidas'
                        },
                        {
                            url: '/fiscal/facturas-recibidas',
                            name: 'Facturas Recibidas'
                        },
                        {
                            url: '/fiscal/provisionales',
                            name: 'Provisionales'
                        },
                        {
                            url: '/fiscal/anuales',
                            name: 'Anuales'
                        },
                        {
                            url: '/fiscal/informativas',
                            name: 'Informativas'
                        }
                    ]
                }
            ]
        },
        {
            // Facturacion
            icon: 'request_page',
            name: 'Facturación',
            sections: [
                {
                    icon: '',
                    name: 'Facturación',
                    open: false,
                    views: [
                        {
                            url: '/facturacion/generacion-de-cfdi',
                            name: 'Generación de CFDI'
                        },
                        {
                            url: '/facturacion/generacion-de-complementos',
                            name: 'Generación de Complementos'
                        },
                        {
                            url: '/facturacion/matriz-de-facturas',
                            name: 'Matriz de Facturas'
                        },
                        {
                            url: '/facturacion/constancias-de-retencion',
                            name: 'Constancias de Retención'
                        }
                    ]
                }
            ]
        },
        {
            // Tesoreria
            icon: 'request_page',
            name: 'Tesorería',
            sections: [
                {
                    icon: '',
                    name: 'Tesorería',
                    open: false,
                    views: [
                        {
                            url: '/tesoreria/posicion-de-caja',
                            name: 'Posición de Caja'
                        },
                        {
                            url: '/tesoreria/cuentas-por-pagar',
                            name: 'Cuentas por Pagar'
                        },
                        {
                            url: '/tesoreria/cuentas-por-cobrar',
                            name: 'Cuentas por Cobrar'
                        },
                        {
                            url: '/tesoreria/conciliacion-bancaria',
                            name: 'Conciliación Bancaria'
                        },
                        {
                            url: '/tesoreria/matriz-de-comisiones',
                            name: 'Matriz de Comisiones'
                        },
                        {
                            url: '/tesoreria/matriz-de-bonos',
                            name: 'Matriz de Bonos'
                        }
                    ]
                }
            ]
        },
        {
            // Nomina
            icon: 'attach_money',
            name: 'Nomina',
            sections: [
                {
                    icon: '',
                    name: 'Nomina',
                    open: false,
                    views: [
                        {
                            url: '/nomina/conceptos-nomina',
                            name: 'Conceptos Nomina'
                        },
                        {
                            url: '/nomina/periodos-nomina',
                            name: 'Periodos Nomina'
                        }
                    ]
                }
            ]
        },
        {
            // Compras
            icon: 'shopping_cart',
            name: 'Compras',
            sections: [
                {
                    icon: '',
                    name: 'Compras',
                    open: false,
                    views: [
                        {
                            url: '/compras/proveedores',
                            name: 'Proveedores'
                        },
                        {
                            url: '/compras/catalogo-de-productos',
                            name: 'Catalogo de Productos'
                        },
                        {
                            url: '/compras/presupuestos',
                            name: 'Presupuestos'
                        },
                        {
                            url: '/compras/solicitudes-de-compra',
                            name: 'Solicitudes de Compra'
                        },
                        {
                            url: '/compras/ordenes-de-compra',
                            name: 'Órdenes de Compra'
                        },
                        {
                            url: '/compras/evaluacion-de-proveedores',
                            name: 'Evaluación de Proveedores'
                        }
                    ]
                }
            ]
        },
        {
            // Mesa de control
            icon: 'bar_chart',
            name: 'Mesa de Control',
            sections: [
                {
                    icon: '',
                    name: 'Mesa de Control',
                    open: false,
                    views: [
                        {
                            url: '/nomina/pipeline-de-operaciones',
                            name: 'Pipeline de Operaciones'
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
                            url: '/inventario/configuracion/producto/1',
                            name: 'Detalle Producto'
                        },
                        {
                            url: '/inventario/configuracion/productos-expiracion',
                            name: 'Productos con expiración'
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
                        }
                        // {
                        //     url: '/inventario/configuracion/imprimir-codigo-qr',
                        //     name: 'Imprimir Codigo QR'
                        // },
                        // {
                        //     url: '/inventario/configuracion/crear-descuento',
                        //     name: 'CrearDescuento'
                        // }
                    ]
                },
                {
                    // Operacion
                    icon: '',
                    name: 'Operación',
                    open: false,
                    views: [
                        {
                            url: '/inventario/operacion/tablero',
                            name: 'Tablero'
                        },
                        {
                            url: '/inventario/operacion/entradas-de-inventario',
                            name: 'Entradas de inventario'
                        },
                        {
                            url: '/inventario/operacion/salidas-de-inventario',
                            name: 'Salidas de Inventario'
                        },
                        {
                            url: '/inventario/operacion/puntos-maximos-minimos',
                            name: 'Puntos de Max/Min y Reorden'
                        },
                        {
                            url: '/inventario/operacion/auditorias-de-inventario',
                            name: 'Auditorías de inventario'
                        },
                        // {
                        //     url: '/inventario/operacion/gestion-de-pedidos',
                        //     name: 'Gestión de Pedidos'
                        // },
                        // {
                        //     url: '/inventario/operacion/autorizaciones-de-pedidos',
                        //     name: 'Autorizaciones de pedidos'
                        // },
                        {
                            url: '/inventario/operacion/generacion-de-polizas-de-inventario',
                            name: 'Generación de Polizas de Inventario'
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
                            url: '/inventario/stock/stock-bajo',
                            name: 'Stock bajo'
                        },
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
            // POS

            icon: 'point_of_sale',
            name: 'POS',
            sections: [
                {
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
        },
        {
            // Recursos Humanos
            icon: 'diversity_3',
            name: 'Recursos Humanos',
            sections: [
                {
                    icon: '',
                    name: 'Recursos Humanos',
                    open: false,
                    views: [
                        {
                            url: '/rrhh/empresas',
                            name: 'Empresas'
                        },
                        {
                            url: '/rrhh/sucursales',
                            name: 'Sucursales'
                        },
                        {
                            url: '/rrhh/empleados',
                            name: 'Empleados'
                        },
                        // {
                        //     url: '/rrhh/organigrama',
                        //     name: 'Organigrama'
                        // },
                        {
                            url: '/rrhh/vacaciones',
                            name: 'Gestión de vacaciones'
                        },
                        {
                            url: '/rrhh/dashboard-de-vacaciones',
                            name: 'Dashboard de vacaciones'
                        },
                        {
                            url: '/rrhh/comunicaciones-organizacionales',
                            name: 'Comunicaciones Organizacionales'
                        },
                        {
                            url: '/rrhh/departamentos',
                            name: 'Departamentos'
                        },
                        {
                            url: '/rrhh/puestos',
                            name: 'Puestos'
                        }
                    ]
                }
            ]
        },
        {
            // Administración
            icon: 'diversity_3',
            name: 'Administración',
            sections: [
                {
                    icon: '',
                    name: 'Administración',
                    open: false,
                    views: [
                        {
                            url: '/administracion/caja-chica',
                            name: 'Caja Chica'
                        },
                        {
                            url: '/administracion/presupuestos',
                            name: 'Presupuestos'
                        },
                        {
                            url: '/administracion/gestion-documental',
                            name: 'Gestión Documental'
                        },
                        {
                            url: '/administracion/viaticos-y-reembolsos',
                            name: 'Viáticos y Reembolsos'
                        },
                        {
                            url: '/administracion/contratos-y-convenios',
                            name: 'Contratos y Convenios'
                        },
                        {
                            url: '/administracion/permisos-y-licencias',
                            name: 'Permisos y Licencias'
                        },
                        {
                            url: '/administracion/auditorias-administrativas',
                            name: 'Auditorías Administrativas'
                        }
                    ]
                }
            ]
        },
        {
            // Marketing
            icon: 'campaign',
            name: 'Marketing',
            sections: [
                {
                    icon: '',
                    name: 'Marketing',
                    open: false,
                    views: [
                        {
                            url: '/marketing/dashboard',
                            name: 'Dashboard'
                        },
                        {
                            url: '/marketing/gestion-de-marcas',
                            name: 'Gestión de Marcas'
                        },
                        {
                            url: '/marketing/coordinador-de-redes-sociales',
                            name: 'Coordinador de Redes Sociales'
                        },
                        {
                            url: '/marketing/benchmarking-y-mystery-shopper',
                            name: 'Benchmarking y Mystery Shopper'
                        },
                        {
                            url: '/marketing/e-mailing',
                            name: 'E-mailing'
                        },
                        {
                            url: '/marketing/banco-de-imagenes',
                            name: 'Banco de Imágenes'
                        },
                        {
                            url: '/marketing/estrategia-de-campanas',
                            name: 'Estrategia de Campañas'
                        },
                        {
                            url: '/marketing/gestion-de-proyectos',
                            name: 'Gestión de Proyectos'
                        }
                    ]
                }
            ]
        },
        {
            // Ventas
            icon: 'shopping_cart',
            name: 'Ventas',
            sections: [
                {
                    icon: '',
                    name: 'Ventas',
                    open: false,
                    views: [
                        {
                            url: '/ventas/dashboard',
                            name: 'Dashboard'
                        },
                        {
                            url: '/ventas/gestion-de-leads',
                            name: 'Gestión de Leads'
                        },
                        {
                            url: '/ventas/conversaciones',
                            name: 'Conversaciones'
                        },
                        {
                            url: '/ventas/pipeline-embudo',
                            name: 'Pipeline / Embudo'
                        },
                        {
                            url: '/ventas/cotizaciones',
                            name: 'Cotizaciones'
                        },
                        {
                            url: '/ventas/agenda-comercial',
                            name: 'Agenda Comercial'
                        },
                        {
                            url: '/ventas/automatizacion',
                            name: 'Automatización'
                        },
                        {
                            url: '/ventas/clientes-crm-360',
                            name: 'Clientes CRM 360'
                        }
                    ]
                }
            ]
        },
        {
            // Planeacion estrategica
            icon: 'nest_thermostat_gen_3',
            name: 'Planeación Estrategica',
            sections: [
                {
                    icon: '',
                    name: 'Planeación Estrategica',
                    open: false,
                    views: [
                        {
                            url: '/planeacion-estrategica/diagnostico-estrategico',
                            name: 'Diagnóstico Estratégico'
                        },
                        {
                            url: '/planeacion-estrategica/definicion-de-estrategia',
                            name: 'Definición de Estrategia'
                        },
                        {
                            url: '/planeacion-estrategica/mapa-estrategico',
                            name: 'Mapa Estratégico'
                        },
                        {
                            url: '/planeacion-estrategica/gestion-de-iniciativas',
                            name: 'Gestión de Iniciativas'
                        },
                        {
                            url: '/planeacion-estrategica/indicadores-estrategicos',
                            name: 'Indicadores Estratégicos'
                        },
                        {
                            url: '/planeacion-estrategica/plan-de-accion',
                            name: 'Plan de Acción'
                        },
                        {
                            url: '/planeacion-estrategica/dashboard-estrategico',
                            name: 'Dashboard Estratégico'
                        },
                        {
                            url: '/planeacion-estrategica/evaluacion-estrategica',
                            name: 'Evaluación Estratégica'
                        }
                    ]
                }
            ]
        }
    ]

    const dashboards: DashboardType[] = [
        {
            name: 'Proyectos',
            icon: 'send_time_extension',
            url: '/proyectos'
        },
        {
            name: 'Procesos',
            icon: 'rebase_edit',
            url: '/procesos'
        },
        {
            name: 'Compras',
            icon: 'shopping_cart',
            url: '/compras'
        },
        {
            name: 'Contabilidad',
            icon: 'import_contacts',
            url: '/contabilidad'
        },
        {
            name: 'Facturacion',
            icon: 'request_page',
            url: '/facturacion'
        },
        {
            name: 'Inventario',
            icon: 'inventory_2',
            url: '/inventario'
        },
        {
            name: 'Marketing',
            icon: 'campaign',
            url: '/marketing'
        },
        {
            name: 'Nomina',
            icon: 'attach_money',
            url: '/nomina'
        },
        {
            name: 'Ventas',
            icon: 'shopping_cart',
            url: '/ventas'
        },
        {
            name: 'RRHH',
            icon: 'diversity_3',
            url: '/rrhh'
        }
    ]

    const getDashboards = async () => {
        try {
            inSessionStore.dashboards = dashboards

            // const response = await getDashboardsService()

            // inSessionStore.dashboards = response.data.map((dashboard: DashboardResponseType) => {
            //     return {
            //         name: dashboard.nombre,
            //         icon: dashboard.icono,
            //         url: dashboard.url
            //     }
            // })
        } catch (error) {
            console.log(error)
            //inSessionStore.dashboards = [] -> Descomentar cuando se implemente el servicio
            inSessionStore.dashboards = dashboards
        }
    }

    const getModules = async () => {
        try {
            inSessionStore.modules = modulos

            //const response = await getModulesService()

            // inSessionStore.modules = response.data.map((module: ModuleResponseType) => {
            //     return {
            //         name: module.nombre,
            //         icon: module.icono,
            //         sections: module.secciones.map((section: SectionResponseType) => {
            //             return {
            //                 name: section.nombre,
            //                 icon: section.icono,
            //                 open: false,
            //                 views: section.vistas.map((view: ViewResponseType) => {
            //                     return {
            //                         name: view.nombre,
            //                         url: view.url
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // })
        } catch (error) {
            console.log(error)
            //inSessionStore.modules = [] -> Descomentar cuando se implemente el servicio
            inSessionStore.modules = modulos
        }
    }

    return {
        getDashboards,
        getModules
    }
}

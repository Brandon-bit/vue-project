# Módulo de Matriz de Facturas

## Descripción
Módulo completo para el control centralizado de todas las facturas emitidas y recibidas. Permite visualizar, filtrar, buscar y gestionar facturas con sincronización automática con el SAT.

## Estructura del Módulo

```
MatrizDeFacturas/
├── components/
│   ├── FiltrosFacturas.vue        # Componente de filtros de búsqueda
│   └── ConfigSATModal.vue         # Modal de configuración SAT
├── composables/
│   └── useFacturaActions.ts       # Lógica de negocio y acciones
├── store/
│   └── facturaStore.ts            # Estado global del módulo
├── types/
│   └── facturaTypes.ts            # Definiciones de tipos TypeScript
├── views/
│   └── MatrizView.vue             # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Resumen de Facturas

Tarjeta de resumen al inicio de la vista con 4 métricas clave:
- **Emitidas Vigentes**: Cantidad de facturas emitidas con estatus vigente
- **Recibidas Vigentes**: Cantidad de facturas recibidas con estatus vigente
- **Total Emitido**: Suma total de facturas emitidas vigentes
- **Total Recibido**: Suma total de facturas recibidas vigentes

### 2. Filtros de Búsqueda

Sistema completo de filtros:
- **Tipo de Factura**: Todas, Emitidas (⬆️), Recibidas (⬇️)
- **Estatus SAT**: Todos, Vigente, Cancelada
- **Rango de Fechas**: Fecha Desde y Fecha Hasta
- **Búsqueda Global**: Por RFC, Folio Fiscal (UUID) o Razón Social

### 3. Tabla de Facturas con Paginación

Tabla completa usando **BaseTable** con:
- **Paginación**: 5, 10, 20, 100 registros por página
- **Búsqueda integrada**: Filtro de texto en tiempo real
- **Exportación**: PDF y Excel
- **Columnas**:
  - Tipo (con icono y color)
  - Folio
  - Folio Fiscal (UUID)
  - Emisor
  - Receptor
  - Fecha
  - Total
  - Estatus (badge)
  - Acciones

### 4. Acciones por Factura

- **Descargar PDF**: Descarga el PDF de la factura
- **Descargar XML**: Descarga el XML del CFDI
- **Enviar por Correo**: Envía la factura por email
- **Cancelar CFDI**: Solo para facturas emitidas vigentes

### 5. Sincronización con SAT

- **Botón de Sincronización**: Descarga automática de facturas del SAT
- **Configuración SAT**: Modal para configurar credenciales (RFC y CIEC)
- **Feedback visual**: Loading state durante la sincronización
- **Notificaciones**: Muestra cantidad de facturas descargadas

## Tipos de Datos

### FacturaType
```typescript
{
    id: string
    tipo: 'emitida' | 'recibida'
    folioFiscal: string
    folio: string
    emisor: string
    receptor: string
    fecha: string
    total: number
    estatus: 'vigente' | 'cancelada'
}
```

### FiltrosFacturaType
```typescript
{
    tipo: 'todas' | 'emitidas' | 'recibidas'
    estatus: 'todos' | 'vigente' | 'cancelada'
    fechaDesde: string
    fechaHasta: string
    busqueda: string
}
```

### ResumenFacturasType
```typescript
{
    emitidasVigentes: number
    recibidasVigentes: number
    totalEmitido: number
    totalRecibido: number
}
```

### ConfiguracionSATType
```typescript
{
    rfc: string
    contrasenaCIEC: string
}
```

## Store de Pinia

El store gestiona:
- **ID del modal** de configuración SAT
- **Filtros** de búsqueda y visualización

Acciones principales:
- `setFiltros()`: Actualizar filtros
- `resetFiltros()`: Resetear todos los filtros

## Componentes

### FiltrosFacturas
Componente de filtros de búsqueda:
- **4 selectores/inputs** en grid:
  - Tipo de Factura (selector)
  - Estatus SAT (selector)
  - Fecha Desde (date input)
  - Fecha Hasta (date input)
- **Buscador global** con botón de búsqueda
- **Sincronización** con store de Pinia
- Usa componentes base: `BaseSelect`, `BaseInput`

### ConfigSATModal
Modal de configuración SAT:
- **Campos**:
  - RFC (12-13 caracteres)
  - Contraseña CIEC (password)
- **Validación** con VeeValidate y Zod
- **Alerta de seguridad**: Credenciales encriptadas
- Usa componente base: `BaseModal`, `BaseInput`

### MatrizView
Vista principal del módulo:
- **Header** con título y botones de acción
- **Tarjeta de Resumen** (4 métricas)
- **Componente de Filtros**
- **Tabla con BaseTable**:
  - Definición de columnas con TanStack Table
  - Renderizado personalizado con `h()` function
  - Paginación automática
  - Exportación a PDF/Excel
- **Modal de Configuración SAT**

## Acciones Disponibles

- `getFacturas()`: Obtener todas las facturas
- `calcularResumen()`: Calcular métricas del resumen
- `sincronizarSAT()`: Sincronizar con el SAT
- `guardarConfiguracionSAT()`: Guardar credenciales SAT
- `descargarPDF()`: Descargar PDF de factura
- `descargarXML()`: Descargar XML de factura
- `enviarPorCorreo()`: Enviar factura por email
- `cancelarCFDI()`: Cancelar CFDI emitido

## Flujo de Trabajo

### Visualización de Facturas

1. **Usuario accede al módulo**
   - Se cargan todas las facturas
   - Se calcula el resumen automáticamente
   - Se muestra la tabla con paginación

2. **Usuario aplica filtros**
   - Selecciona tipo de factura
   - Selecciona estatus
   - Define rango de fechas
   - Ingresa texto de búsqueda
   - La tabla se actualiza automáticamente

3. **Usuario navega en la tabla**
   - Cambia página
   - Cambia cantidad de registros por página
   - Usa búsqueda integrada de BaseTable
   - Exporta a PDF o Excel

### Sincronización con SAT

1. **Usuario configura credenciales**
   - Click en "Configurar SAT"
   - Ingresa RFC y contraseña CIEC
   - Click en "Validar y Guardar"

2. **Usuario sincroniza**
   - Click en "Sincronizar con SAT"
   - Sistema muestra loading
   - Descarga facturas del SAT
   - Muestra notificación con cantidad descargada
   - Actualiza la tabla automáticamente

### Acciones sobre Facturas

1. **Descargar archivos**
   - Click en botón PDF o XML
   - Sistema descarga el archivo
   - Muestra notificación de éxito

2. **Enviar por correo**
   - Click en botón de correo
   - Ingresa email del destinatario
   - Sistema envía la factura
   - Muestra notificación de éxito

3. **Cancelar CFDI**
   - Click en botón cancelar (solo emitidas vigentes)
   - Confirma la acción
   - Sistema cancela en el SAT
   - Actualiza el estatus en la tabla

## Características de UX

- **Resumen al inicio** con métricas destacadas
- **Filtros completos** y fáciles de usar
- **Tabla con paginación** automática
- **Búsqueda en tiempo real**
- **Exportación** a PDF y Excel
- **Iconos visuales** para tipo de factura
- **Badges de color** para estatus
- **Botones de acción** contextuales
- **Loading states** durante operaciones
- **Notificaciones** de feedback
- **Confirmaciones** para acciones destructivas

## Integración con BaseTable

El módulo utiliza el componente **BaseTable** que incluye:
- **TanStack Table**: Librería de tablas para Vue
- **Paginación**: Automática con controles
- **Búsqueda global**: Filtro de texto integrado
- **Exportación**: PDF y Excel
- **Responsive**: Adaptable a diferentes tamaños
- **Skeleton loading**: Estado de carga visual

### Definición de Columnas

Las columnas se definen usando `ColumnDef<T>[]`:
```typescript
const columns: ColumnDef<FacturaType>[] = [
    {
        accessorKey: 'tipo',
        header: 'Tipo',
        cell: ({ row }) => h('div', ...)
    },
    // ... más columnas
]
```

### Renderizado Personalizado

Se usa la función `h()` de Vue para renderizado personalizado:
```typescript
cell: ({ row }) => h('span', { 
    class: 'badge badge-success' 
}, 'Vigente')
```

## Filtros Implementados

### Filtro por Tipo
- **Todas**: Muestra emitidas y recibidas
- **Emitidas**: Solo facturas emitidas (⬆️)
- **Recibidas**: Solo facturas recibidas (⬇️)

### Filtro por Estatus
- **Todos**: Vigentes y canceladas
- **Vigente**: Solo facturas vigentes
- **Cancelada**: Solo facturas canceladas

### Filtro por Fechas
- **Fecha Desde**: Facturas desde esta fecha
- **Fecha Hasta**: Facturas hasta esta fecha
- Ambos filtros son opcionales

### Búsqueda Global
Busca en:
- Folio Fiscal (UUID)
- Folio
- RFC del Emisor
- Razón Social del Emisor
- RFC del Receptor
- Razón Social del Receptor

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend
- La sincronización SAT requiere integración real
- Las credenciales deben almacenarse encriptadas
- Los filtros se aplican en el cliente (considerar servidor para grandes volúmenes)
- BaseTable maneja la paginación automáticamente

## Mejoras Futuras

- [ ] Filtro por rango de montos
- [ ] Filtro por RFC específico
- [ ] Vista de detalle de factura
- [ ] Comparación de facturas
- [ ] Gráficas de análisis
- [ ] Dashboard de métricas
- [ ] Alertas de facturas por vencer
- [ ] Recordatorios de pago
- [ ] Conciliación bancaria
- [ ] Reportes personalizados
- [ ] Exportación masiva
- [ ] Importación de facturas
- [ ] Etiquetas/categorías
- [ ] Notas por factura
- [ ] Historial de cambios
- [ ] Integración con contabilidad
- [ ] API para terceros
- [ ] Sincronización programada
- [ ] Notificaciones push
- [ ] Búsqueda avanzada

## Seguridad

- Validación de permisos por rol
- Credenciales SAT encriptadas
- Auditoría de acciones
- Validación de RFC
- Prevención de XSS
- CSRF protection
- Rate limiting en sincronización

## Mejores Prácticas

1. **Sincronizar regularmente** con el SAT
2. **Configurar credenciales** correctamente
3. **Usar filtros** para encontrar facturas rápido
4. **Exportar reportes** periódicamente
5. **Mantener respaldo** de archivos
6. **Revisar estatus** de facturas
7. **Cancelar solo cuando sea necesario**
8. **Documentar acciones** importantes

## Soporte

Para dudas sobre la matriz de facturas:
- Consultar documentación del SAT
- Verificar credenciales CIEC
- Contactar soporte técnico
- Revisar logs de sincronización

## Ejemplo de Uso

**Escenario**: Buscar facturas emitidas del mes actual

1. Acceder a Matriz de Facturas
2. En filtros, seleccionar:
   - Tipo: Emitidas
   - Estatus: Vigente
   - Fecha Desde: 01/01/2024
   - Fecha Hasta: 31/01/2024
3. Ver resultados en la tabla
4. Exportar a Excel si es necesario
5. Descargar PDFs de facturas específicas

El sistema mostrará solo las facturas emitidas vigentes del mes de enero 2024.

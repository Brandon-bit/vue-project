# Módulo de Presupuestos de Compras

## Descripción
Módulo para la gestión y control de presupuestos de compras por área, departamento o proyecto. Permite realizar seguimiento del presupuesto asignado vs. gasto ejecutado y comprometido.

## Estructura del Módulo

```
Presupuestos/
├── components/
│   ├── BudgetForm.vue          # Formulario para crear presupuestos
│   ├── BudgetDetail.vue        # Vista detallada de un presupuesto
│   └── BudgetModal.vue         # Modal reutilizable para formulario y detalle
├── composables/
│   └── useBudgetActions.ts     # Lógica de negocio y acciones
├── store/
│   └── budgetStore.ts          # Estado global del módulo
├── types/
│   └── budgetTypes.ts          # Definiciones de tipos TypeScript
├── validations/
│   └── budgetValidation.ts     # Esquemas de validación con Zod
├── views/
│   └── BudgetView.vue          # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Gestión de Presupuestos
- **Crear presupuestos** por área, departamento o proyecto
- **Asignar montos** para periodos específicos (trimestral, anual)
- **Seguimiento en tiempo real** de gastos y compromisos

### 2. Control Presupuestal
- **Visualización de estadísticas** generales:
  - Total asignado
  - Total gastado (% ejecutado)
  - Total comprometido (en órdenes de compra)
  - Total disponible
- **Alertas automáticas** cuando el presupuesto:
  - Está cerca de agotarse (>90%)
  - Ha sido excedido
  - Tiene ejecución saludable

### 3. Análisis Visual
- **Barras de progreso** que muestran:
  - Monto gastado (azul)
  - Monto comprometido (naranja)
  - Excedente (rojo, si aplica)
- **Indicadores de estado** con códigos de color
- **Porcentajes de utilización** en tiempo real

### 4. Detalle de Presupuesto
El modal de detalle muestra:
- Resumen financiero completo
- Barra de progreso visual
- Información del proyecto
- Análisis y recomendaciones
- Alertas según el estado actual

### 5. Reportes
- Generación de reportes por presupuesto
- Exportación de datos para análisis

## Tipos de Datos

### BudgetType
```typescript
{
    id: number
    area: string                    // Área o departamento
    proyecto: string                // Nombre del proyecto
    periodo: string                 // Periodo (Q1 2024, Anual 2024, etc.)
    asignado: number               // Monto total asignado
    gastado: number                // Monto ya gastado
    comprometido: number           // Monto en órdenes de compra
    disponible: number             // Saldo disponible
    porcentajeGastado: number      // % del presupuesto gastado
    porcentajeComprometido: number // % del presupuesto comprometido
    porcentajeTotal: number        // % total utilizado
    excedido: boolean              // Si el presupuesto fue excedido
    fechaCreacion: string
    fechaActualizacion: string
}
```

### BudgetStatsType
```typescript
{
    totalAsignado: number
    totalGastado: number
    totalComprometido: number
    totalDisponible: number
    porcentajeEjecutado: number
    porcentajeComprometido: number
    porcentajeDisponible: number
}
```

## Validaciones

El formulario de creación valida:
- **Área**: Campo requerido
- **Proyecto**: Campo requerido
- **Periodo**: Debe seleccionar un periodo válido
- **Monto Asignado**: Debe ser mayor a 0

## Flujo de Trabajo

1. **Crear Presupuesto**
   - Click en "Crear Presupuesto"
   - Completar formulario con área, proyecto, periodo y monto
   - El sistema registra el presupuesto

2. **Seguimiento**
   - El presupuesto se actualiza automáticamente con:
     - Gastos ejecutados (facturas pagadas)
     - Compromisos (órdenes de compra emitidas)
   - Los porcentajes se calculan en tiempo real

3. **Alertas**
   - **Verde (Saludable)**: < 70% utilizado
   - **Azul (En Progreso)**: 70-90% utilizado
   - **Amarillo (Crítico)**: > 90% utilizado
   - **Rojo (Excedido)**: > 100% utilizado

4. **Reportes**
   - Generar reportes individuales por presupuesto
   - Análisis de velocidad de gasto
   - Proyecciones de agotamiento

## Integración con Otros Módulos

- **Órdenes de Compra**: Los montos de las OCs emitidas se registran como "comprometido"
- **Facturas**: Los pagos de facturas se registran como "gastado"
- **Solicitudes de Compra**: Validación de disponibilidad presupuestal antes de aprobar

## Estados del Presupuesto

- **Activo**: Presupuesto en uso normal
- **Crítico**: Cerca de agotarse (>90%)
- **Excedido**: Ha superado el monto asignado
- **Completado**: Periodo finalizado
- **Suspendido**: Temporalmente inactivo

## Componentes Reutilizables

### BudgetModal
Modal dinámico que puede mostrar:
- Formulario de creación (type: 'CREATE')
- Vista de detalle (type: 'DETAIL')

### BudgetForm
Formulario con validación para crear nuevos presupuestos.

### BudgetDetail
Vista completa con análisis, gráficos y recomendaciones.

## Acciones Disponibles

- `getBudgets()`: Obtener lista de presupuestos
- `getBudgetStats()`: Obtener estadísticas generales
- `createBudget()`: Crear nuevo presupuesto
- `updateBudget()`: Actualizar presupuesto existente
- `deleteBudget()`: Eliminar presupuesto
- `generateReport()`: Generar reporte de presupuesto

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend
- Los cálculos de porcentajes se realizan en el frontend
- Las alertas se generan automáticamente según umbrales configurados

## Mejoras Futuras

- [ ] Gráficos de tendencia histórica
- [ ] Comparación entre periodos
- [ ] Proyección de agotamiento
- [ ] Notificaciones automáticas por email
- [ ] Aprobaciones de ajustes presupuestales
- [ ] Exportación a Excel/PDF
- [ ] Dashboard ejecutivo consolidado

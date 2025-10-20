# Dashboard Estratégico

Dashboard ejecutivo que consolida información de todos los módulos de Planeación Estratégica.

## Estructura

```
Dashboard/
├── components/          # Componentes reutilizables
│   ├── StatCard.vue    # Card de estadística con gradiente
│   └── WidgetCard.vue  # Card contenedor para widgets
├── composables/        # Lógica reutilizable
│   ├── useDashboardData.ts     # Carga de datos
│   └── useDashboardMetrics.ts  # Cálculo de métricas
├── services/           # Servicios de API
│   └── dashboardService.ts
├── store/             # Estado global
│   └── dashboardStore.ts
├── types/             # Definiciones TypeScript
│   └── dashboardTypes.ts
├── utils/             # Funciones helper
│   └── dashboardHelpers.ts
└── views/             # Vista principal
    └── DashboardView.vue
```

## Widgets Incluidos

### 1. Estadísticas Principales (4 cards)
- Cumplimiento BSC
- Iniciativas Activas
- Proyectos en Curso
- Riesgos Críticos

### 2. Cumplimiento de Objetivos BSC
Muestra el progreso de los 4 objetivos por perspectiva BSC.

### 3. Estado de Iniciativas Clave
Lista de iniciativas estratégicas con progreso y presupuesto.

### 4. Avance de Proyectos Estratégicos
Proyectos vinculados a iniciativas con estado y responsable.

### 5. KPIs Financieros vs. Meta
Indicadores económicos clave comparados con sus metas.

### 6. Top 5 Riesgos Activos
Riesgos estratégicos con severidad, probabilidad e impacto.

## Uso

```vue
<script setup>
import { onMounted } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'

const { loadDashboardData } = useDashboardData()

onMounted(() => {
  loadDashboardData()
})
</script>
```

## Servicios

El módulo incluye servicios mock que pueden ser reemplazados con llamadas API reales:

```typescript
import { dashboardService } from './services/dashboardService'

// Cargar todos los datos
const data = await dashboardService.getDashboardData()

// O cargar datos específicos
const bscObjectives = await dashboardService.getBSCObjectives()
const initiatives = await dashboardService.getKeyInitiatives()
```

## Composables

### useDashboardData
Maneja la carga de datos del dashboard.

### useDashboardMetrics
Calcula métricas y estadísticas derivadas.

## Helpers

Funciones utilitarias para formateo y estilos:
- `getStatusColor()` - Colores por estado
- `getProjectStatusColor()` - Colores por status de proyecto
- `getSeverityBadgeClass()` - Clases de badge por severidad
- `getKPIProgress()` - Cálculo de progreso
- `formatCurrency()` - Formato de moneda
- `formatPercentage()` - Formato de porcentaje

## Ruta

`/planeacion-estrategica/dashboard`

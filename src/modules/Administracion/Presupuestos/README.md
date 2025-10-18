# Módulo Presupuestos (Budgets)

Módulo para el control presupuestal por área y proyecto.

## Estructura del Módulo

```
Presupuestos/
├── components/          # Componentes Vue del módulo
│   ├── BudgetForm.vue           # Formulario para crear/editar presupuestos
│   ├── DeleteBudget.vue         # Componente para eliminar presupuestos
│   ├── BudgetModal.vue          # Modal principal que gestiona las acciones
│   ├── SummaryCard.vue          # Tarjeta de resumen (Total, Gastado, Disponible)
│   └── BudgetProgressCard.vue   # Tarjeta con barra de progreso por área
│
├── composables/         # Lógica reutilizable
│   ├── mappingBudgetData.ts     # Mapeo de datos entre API y aplicación
│   └── useBudgetActions.ts      # Composable para acciones CRUD
│
├── services/            # Servicios de API
│   └── budgetService.ts         # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── budgetStore.ts           # Store para gestión de estado de presupuestos
│
├── types/               # Definiciones de TypeScript
│   └── budgetTypes.ts           # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── budgetValidation.ts      # Validaciones con Zod
│
└── views/               # Vistas principales
    └── BudgetView.vue           # Vista principal del módulo
```

## Características Principales

### 1. Dashboard de Información General (3 Tarjetas)

**Total Presupuestado**
- Muestra el monto total presupuestado
- Indica el año fiscal actual
- Icono: trending_up

**Total Gastado**
- Muestra el monto total gastado
- Porcentaje del presupuesto utilizado
- Icono: trending_down

**Disponible**
- Muestra el monto disponible
- Porcentaje restante
- Icono: account_balance

### 2. Filtros

- **Año Fiscal**: Selector para filtrar por año (2024, 2023, 2022)
- **Área**: Selector para filtrar por área específica o todas

### 3. Ejecución Presupuestal por Área

Tarjetas con barras de progreso que muestran:
- Nombre del área
- Monto gastado vs presupuestado
- Porcentaje de ejecución
- Badge de estado (success/warning/danger)
- Barra de progreso con colores dinámicos:
  - **Verde**: < 80% (success)
  - **Amarillo**: 80-99% (warning)
  - **Rojo**: ≥ 100% (danger - sobrepresupuesto)

### 4. Gestión de Presupuestos

- **Crear presupuestos**: Registro de nuevos presupuestos por área
- **Editar presupuestos**: Modificación de presupuestos existentes
- **Eliminar presupuestos**: Eliminación lógica/física de presupuestos

### 5. Componentes Utilizados

- `BaseButton`: Botón para nuevo presupuesto
- `BaseModal`: Modal reutilizable para diferentes acciones
- `BaseFormInput`: Input de formulario con validación
- `BaseFormSelect`: Select con opciones dinámicas
- `BaseTextArea`: Área de texto para descripciones
- `BaseTitle`: Título de página

### 6. Validaciones

Esquema de validación con Zod que incluye:
- Validación de área requerida (mínimo 3 caracteres)
- Validación de monto presupuestado positivo
- Validación de año fiscal (2020-2100)
- Descripción opcional

### 7. Tipos de Datos

#### BudgetType
```typescript
{
    id?: number
    area: string
    budgeted: number
    spent: number
    percentage: number
    status: 'success' | 'warning' | 'danger'
    fiscalYear: number
    creationDate: Date
}
```

#### BudgetSummaryType
```typescript
{
    totalBudgeted: number
    totalSpent: number
    totalAvailable: number
    totalPercentage: number
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import BudgetView from '@/modules/Administracion/Presupuestos/views/BudgetView.vue'
```

### Usar el Store
```typescript
import useBudgetStore from '@/modules/Administracion/Presupuestos/store/budgetStore'

const budgetStore = useBudgetStore()
budgetStore.setData(budgetData)
budgetStore.setFilters({ fiscalYear: 2024, area: 'Marketing' })
```

### Usar las Acciones
```typescript
import { useBudgetActions } from '@/modules/Administracion/Presupuestos/composables/useBudgetActions'

const { 
    getBudgets, 
    createBudget, 
    editBudget, 
    deleteBudget
} = useBudgetActions()
```

## Endpoints de API Esperados

- `GET /presupuestos?anioFiscal=2024&area=Marketing` - Obtener presupuestos filtrados
- `POST /presupuestos` - Crear nuevo presupuesto
- `PUT /presupuestos/:id` - Actualizar presupuesto
- `DELETE /presupuestos/:id` - Eliminar presupuesto

## Áreas Disponibles

- Marketing
- Operaciones
- Tecnología
- Recursos Humanos
- Ventas
- Administración
- Finanzas
- Logística

## Data Simulada

El módulo incluye data simulada para visualización:

- **Marketing**: $150,000 presupuestado, $127,500 gastado (85% - warning)
- **Operaciones**: $300,000 presupuestado, $195,000 gastado (65% - success)
- **Tecnología**: $200,000 presupuestado, $205,000 gastado (102.5% - danger)
- **Recursos Humanos**: $250,000 presupuestado, $187,500 gastado (75% - success)

**Total**: $900,000 presupuestado, $715,000 gastado (79.4%)

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido en el proyecto
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **Componentes Base**: Reutiliza componentes compartidos de `@/shared/components`
5. **TypeScript**: Totalmente tipado para mejor DX y seguridad
6. **Cálculos Reactivos**: Usa computed properties para totales y porcentajes
7. **Filtros Dinámicos**: Sistema de filtros por año fiscal y área

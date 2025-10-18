# Módulo Viáticos y Reembolsos (Expense Management)

Módulo para la administración de solicitudes de viáticos, reembolsos y su proceso de aprobación.

## Estructura del Módulo

```
ViaticosYReembolsos/
├── components/          # Componentes Vue del módulo
│   ├── ExpenseForm.vue          # Formulario para crear/editar solicitudes
│   ├── DeleteExpense.vue        # Componente para eliminar solicitudes
│   ├── ExpenseModal.vue         # Modal principal que gestiona las acciones
│   └── StatsCard.vue            # Tarjeta de estadísticas
│
├── composables/         # Lógica reutilizable
│   ├── mappingExpenseData.ts    # Mapeo de datos entre API y aplicación
│   └── useExpenseActions.ts     # Composable para acciones CRUD y aprobaciones
│
├── services/            # Servicios de API
│   └── expenseService.ts        # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── expenseStore.ts          # Store para gestión de estado de viáticos
│
├── types/               # Definiciones de TypeScript
│   └── expenseTypes.ts          # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── expenseValidation.ts     # Validaciones con Zod
│
└── views/               # Vistas principales
    └── ExpenseView.vue          # Vista principal del módulo
```

## Características Principales

### 1. Dashboard de Estadísticas (4 Tarjetas)

- **Pendientes**: 2 solicitudes en revisión (⏱️ Amarillo)
- **Aprobadas**: 5 solicitudes este mes (✅ Verde)
- **Pagadas**: 12 solicitudes completadas (💵 Azul)
- **Total del Mes**: $45,200 (Octubre 2024)

### 2. Sistema de Tabs (2 Pestañas)

#### Tab 1: Mis Solicitudes
- **Tabla paginada con BaseTable**
- Columnas:
  - ID
  - Concepto
  - Fecha
  - Monto (formato moneda)
  - Estado (badge con colores)
  - Comprobado (icono check/cancel)
- Estados posibles:
  - 🔵 **Aprobado** (badge-info)
  - 🟡 **Pendiente** (badge-warning)
  - 🔴 **Rechazado** (badge-error)
  - 🟢 **Pagado** (badge-success)

#### Tab 2: Panel de Aprobaciones
- **Tabla HTML normal (no BaseTable)**
- Columnas:
  - ID
  - Empleado
  - Concepto
  - Fecha
  - Monto
  - Acciones (Aprobar/Rechazar)
- Botones de acción:
  - **Aprobar** (btn-success)
  - **Rechazar** (btn-error)

### 3. Formulario de Nueva Solicitud

Incluye campos:
- ✅ **Concepto**: Input de texto (requerido, mín. 5 caracteres)
- ✅ **Fecha**: Input tipo date (requerido)
- ✅ **Monto**: Input numérico con decimales (requerido, > 0)
- ✅ **Categoría**: Selector con 7 opciones
  - Viáticos
  - Transporte
  - Hospedaje
  - Alimentación
  - Materiales
  - Capacitación
  - Otros
- ✅ **Descripción/Justificación**: Textarea
- ✅ Alert informativo: "La solicitud será enviada para aprobación..."

### 4. Mock Data

**Mis Solicitudes (3 registros):**
1. **VT-2024-045** - Viaje a Monterrey ($8,500) - Aprobado ✅
2. **VT-2024-046** - Capacitación CDMX ($12,000) - Pendiente ⏱️
3. **VT-2024-047** - Material de oficina ($3,200) - Pagado 💵

**Solicitudes para Aprobación (2 registros):**
1. **VT-2024-048** - Juan Pérez - Viaje a Guadalajara ($9,500)
2. **VT-2024-049** - María González - Compra de equipo ($5,400)

### 5. Validaciones

Esquema de validación con Zod que incluye:
- Concepto requerido (mínimo 5 caracteres)
- Fecha requerida
- Monto requerido (número positivo > 0)
- Categoría requerida
- Descripción opcional

### 6. Tipos de Datos

#### ExpenseType
```typescript
{
    id?: string
    concept: string
    date: Date
    amount: number
    status: 'aprobado' | 'pendiente' | 'rechazado' | 'pagado'
    verified: boolean
    employee?: string
    description?: string
    category?: string
}
```

#### ExpenseStatsType
```typescript
{
    pending: number
    approved: number
    paid: number
    totalMonth: number
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import ExpenseView from '@/modules/Administracion/ViaticosYReembolsos/views/ExpenseView.vue'
```

### Usar el Store
```typescript
import useExpenseStore from '@/modules/Administracion/ViaticosYReembolsos/store/expenseStore'

const expenseStore = useExpenseStore()
expenseStore.setData(expenseData)
expenseStore.setActiveTab('approvals')
```

### Usar las Acciones
```typescript
import { useExpenseActions } from '@/modules/Administracion/ViaticosYReembolsos/composables/useExpenseActions'

const { 
    getExpenses, 
    createExpense, 
    editExpense, 
    deleteExpense,
    approveExpense,
    rejectExpense
} = useExpenseActions()
```

## Endpoints de API Esperados

- `GET /viaticos` - Obtener solicitudes con filtros
- `POST /viaticos` - Crear nueva solicitud
- `PUT /viaticos/:id` - Actualizar solicitud
- `DELETE /viaticos/:id` - Eliminar solicitud
- `POST /viaticos/:id/aprobar` - Aprobar solicitud
- `POST /viaticos/:id/rechazar` - Rechazar solicitud (con razón opcional)

## Categorías Disponibles

1. Viáticos
2. Transporte
3. Hospedaje
4. Alimentación
5. Materiales
6. Capacitación
7. Otros

## Estados de Solicitud

- **Aprobado** (aprobado): Solicitud aprobada por el supervisor
- **Pendiente** (pendiente): En espera de aprobación
- **Rechazado** (rechazado): Solicitud rechazada
- **Pagado** (pagado): Solicitud aprobada y pagada

## Características Visuales

- **Badges de estado**: Colores distintivos por estado
- **Iconos Material Symbols**: check_circle, cancel, schedule, payments, etc.
- **Tabla con BaseTable**: Para "Mis Solicitudes" con paginación
- **Tabla HTML nativa**: Para "Panel de Aprobaciones" sin paginación
- **Botones de acción**: Aprobar (verde) y Rechazar (rojo)
- **Formato de moneda**: Con separadores de miles
- **Tabs interactivos**: Sistema de pestañas con contenido dinámico

## Funcionalidades Especiales

1. **Proceso de Aprobación**: Flujo completo de aprobación/rechazo
2. **Comprobación**: Indicador visual de solicitudes comprobadas
3. **Dashboard de métricas**: Estadísticas en tiempo real
4. **Filtrado por estado**: Badges con colores por estado
5. **Formato de moneda**: Presentación profesional de montos
6. **Validación de montos**: Solo números positivos
7. **Categorización**: Sistema de categorías predefinidas

## Diferencias con Otros Módulos

1. **Dos tipos de tabla**:
   - BaseTable para "Mis Solicitudes" (con paginación)
   - Tabla HTML para "Panel de Aprobaciones" (sin paginación)

2. **Acciones especiales**:
   - Aprobar solicitud
   - Rechazar solicitud (con razón opcional)

3. **Estados múltiples**:
   - 4 estados diferentes con badges de colores

4. **Indicador de comprobación**:
   - Icono visual para solicitudes comprobadas

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **TypeScript**: Totalmente tipado para mejor DX
5. **Componentes Base**: Reutiliza componentes compartidos
6. **Tabs sin librería**: Implementación nativa con DaisyUI
7. **Mock Data**: Data estática para visualización inmediata
8. **Sin fetch**: No intenta hacer llamadas a API

## Flujo de Trabajo

1. **Crear Solicitud**: Usuario crea nueva solicitud → Estado: Pendiente
2. **Aprobación**: Supervisor revisa en Panel de Aprobaciones
3. **Aprobar/Rechazar**: Supervisor toma decisión
4. **Pago**: Si está aprobada, se procesa el pago → Estado: Pagado
5. **Comprobación**: Usuario adjunta comprobantes → Verified: true

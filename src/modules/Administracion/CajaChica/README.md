# Módulo Caja Chica (Petty Cash)

Módulo para la gestión digital de gastos menores y reposiciones de caja chica.

## Estructura del Módulo

```
CajaChica/
├── components/          # Componentes Vue del módulo
│   ├── ExpenseForm.vue          # Formulario para crear/editar gastos
│   ├── ApproveExpense.vue       # Componente para aprobar gastos
│   ├── DeleteExpense.vue        # Componente para eliminar gastos
│   ├── ExpenseModal.vue         # Modal principal que gestiona los diferentes tipos de acciones
│   ├── PettyBoxCard.vue         # Tarjeta de dashboard de caja chica
│   ├── ApprovalCard.vue         # Tarjeta de gasto pendiente de aprobación
│   └── CutoffCard.vue           # Tarjeta de corte y reposición
│
├── composables/         # Lógica reutilizable
│   ├── mappingPettyCashData.ts  # Mapeo de datos entre API y aplicación
│   ├── usePettyCash.ts          # Composable para configuración de tabla y UI
│   └── usePettyCashActions.ts   # Composable para acciones CRUD
│
├── services/            # Servicios de API
│   └── pettycashService.ts      # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── pettycashStore.ts        # Store para gestión de estado de gastos
│
├── types/               # Definiciones de TypeScript
│   └── pettycashTypes.ts        # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── pettycashValidation.ts   # Validaciones con Zod
│
└── views/               # Vistas principales
    └── PettyCashView.vue        # Vista principal del módulo
```

## Características Principales

### 1. Dashboard de Cajas Chicas
- **Visualización de cajas**: Tarjetas con información de cada caja chica
- **Saldo disponible**: Monto actual disponible en cada caja
- **Porcentaje de uso**: Indicador visual del uso de la caja
- **Acceso rápido**: Botón para registrar gastos desde cada caja

### 2. Gestión de Gastos
- **Crear gastos**: Registro de nuevos gastos con comprobante
- **Editar gastos**: Modificación de gastos existentes
- **Eliminar gastos**: Eliminación lógica/física de gastos
- **Tabla paginada**: Visualización de todos los gastos registrados

### 3. Aprobaciones
- **Pendientes de aprobación**: Lista de gastos esperando aprobación
- **Aprobar gastos**: Flujo de aprobación con visualización de comprobante
- **Rechazar gastos**: Rechazo de gastos con motivo
- **Notificaciones**: Badge con cantidad de gastos pendientes

### 4. Cortes y Reposiciones
- **Generar cortes**: Creación de cortes de caja por cada caja chica
- **Reposición sugerida**: Cálculo automático de monto a reponer
- **Envío a tesorería**: Integración con módulo de tesorería

### 5. Componentes Utilizados
- `BaseTable`: Tabla paginada con búsqueda y ordenamiento
- `BaseModal`: Modal reutilizable para diferentes acciones
- `BaseFormInput`: Input de formulario con validación
- `BaseFormSelect`: Select con opciones dinámicas
- `BaseTextArea`: Área de texto para descripciones
- `BaseFormInputFile`: Input para carga de archivos/comprobantes

### 6. Validaciones
Esquema de validación con Zod que incluye:
- Validación de campos requeridos
- Validación de tipos de archivo (JPG, PNG, PDF)
- Validación de tamaño de archivo (máx. 5MB)
- Validación de montos positivos
- Validación de longitud mínima en textos

### 7. Tipos de Datos

#### ExpenseType
```typescript
{
    id?: number
    pettyBoxId: number
    pettyBoxName: string
    date: Date
    concept: string
    amount: number
    responsible: string
    costCenter: string
    description: string
    status: 'Pendiente' | 'Aprobado' | 'Rechazado'
    receiptUrl: string
    creationDate: Date
}
```

#### PettyBoxType
```typescript
{
    id: number
    name: string
    assigned: number
    balance: number
    responsible: string
    usedPercentage?: number
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import PettyCashView from '@/modules/Administracion/CajaChica/views/PettyCashView.vue'
```

### Usar el Store
```typescript
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'

const pettyCashStore = usePettyCashStore()
pettyCashStore.setData(expenseData)
pettyCashStore.setActiveTab('approvals')
```

### Usar las Acciones
```typescript
import { usePettyCashActions } from '@/modules/Administracion/CajaChica/composables/usePettyCashActions'

const { 
    getExpenses, 
    getPendingExpenses,
    createExpense, 
    editExpense, 
    deleteExpense, 
    approveExpense, 
    rejectExpense,
    getPettyBoxes,
    getCutoffs,
    generateCutoff
} = usePettyCashActions()
```

## Endpoints de API Esperados

- `GET /caja-chica/gastos` - Obtener gastos paginados
- `GET /caja-chica/cajas` - Obtener cajas chicas disponibles
- `POST /caja-chica/gastos` - Crear nuevo gasto
- `PUT /caja-chica/gastos/:id` - Actualizar gasto
- `PATCH /caja-chica/gastos/:id/aprobar` - Aprobar gasto
- `PATCH /caja-chica/gastos/:id/rechazar` - Rechazar gasto
- `DELETE /caja-chica/gastos/:id` - Eliminar gasto

## Conceptos Disponibles
- Papelería
- Transporte
- Cafetería
- Limpieza
- Suministros
- Mensajería
- Estacionamiento
- Otros

## Centros de Costo
- Administración
- Ventas
- Operaciones
- TI
- RH
- Marketing

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido en el proyecto
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **Componentes Base**: Reutiliza componentes compartidos de `@/shared/components`
5. **TypeScript**: Totalmente tipado para mejor DX y seguridad
6. **Mapeo de Datos**: Separa la estructura de API de la estructura interna

# Módulo de Vacaciones

Este módulo gestiona las solicitudes de vacaciones de los empleados en el sistema de RRHH.

## Estructura del Módulo

```
Vacaciones/
├── components/
│   ├── VacationForm.vue          # Formulario para crear/editar solicitudes
│   ├── VacationModal.vue         # Modal principal que maneja CREATE/UPDATE/DELETE
│   └── DeleteVacation.vue        # Componente de confirmación de eliminación
├── composables/
│   ├── useVacations.ts           # Configuración de columnas de tabla y acciones
│   ├── useVacationsActions.ts    # Acciones CRUD con datos mock
│   └── mappingVacations.ts       # Mapeo entre frontend (inglés) y backend (español)
├── store/
│   └── vacationStore.ts          # Estado global del módulo (Pinia)
├── types/
│   └── vacationTypes.ts          # Definiciones de tipos TypeScript
├── validations/
│   └── vacationSchema.ts         # Esquemas de validación con Zod
└── views/
    └── VacationsListView.vue     # Vista principal con tabla

```

## Características Principales

### 1. Vista de Tabla (VacationsListView.vue)
- Muestra todas las solicitudes de vacaciones en una tabla paginada
- Botón "Nueva solicitud" para crear solicitudes
- Columnas: ID, Empleado, Fecha Inicio, Fecha Fin, Días, Estado, Fecha Solicitud, Acciones
- Acciones por fila: Editar y Eliminar

### 2. Formulario de Vacaciones (VacationForm.vue)
- **Modo Crear**: Permite seleccionar empleado, fechas y comentarios
- **Modo Editar**: 
  - Si está pendiente: permite editar todos los campos + selector de estado
  - Si está aprobada/rechazada: solo permite cambiar el estado
- Búsqueda de empleados con autocompletado
- Validación de fechas (inicio debe ser <= fin)
- Campo de comentarios opcional

### 3. Estados de Solicitud
- **Pendiente**: Solicitud recién creada, puede editarse completamente
- **Aprobada**: Solicitud aceptada, solo se puede cambiar estado
- **Rechazada**: Solicitud rechazada, solo se puede cambiar estado

### 4. Validaciones (Zod)
- Empleado requerido
- Fechas de inicio y fin requeridas
- Fecha de inicio debe ser anterior o igual a fecha de fin
- Comentarios opcionales (mínimo 3 caracteres si se proporcionan)
- Estado requerido en modo edición

### 5. Datos Mock
El módulo incluye 5 solicitudes de ejemplo con diferentes estados:
- Juan Pérez García (Aprobada)
- María López Hernández (Pendiente)
- Carlos Ramírez Sánchez (Rechazada)
- Ana Martínez Torres (Pendiente)
- Luis González Flores (Aprobada)

## Uso del Módulo

### Agregar Ruta
Agregar en `src/router/RRHHRoutes.ts`:

```typescript
{
    path: 'vacaciones',
    name: 'vacaciones',
    component: () => import('@rrhh/Vacaciones/views/VacationsListView.vue'),
    meta: {
        requiresAuth: true,
        title: 'Vacaciones'
    }
}
```

### Importar en Otros Componentes

```typescript
import { useVacationsActions } from '@rrhh/Vacaciones/composables/useVacationsActions'
import { VacationDTO } from '@rrhh/Vacaciones/types/vacationTypes'
```

## Mapeo de Datos

### Frontend (Inglés) ↔ Backend (Español)

| Frontend | Backend |
|----------|---------|
| employeeId | empleadoId |
| employeeName | empleadoNombre |
| startDate | fechaInicio |
| endDate | fechaFin |
| comments | comentarios |
| status | estado |
| requestDate | fechaSolicitud |

### Estados

| Frontend | Backend | Label |
|----------|---------|-------|
| pending | pendiente | Pendiente |
| approved | aprobada | Aprobada |
| rejected | rechazada | Rechazada |

## Funciones Principales

### useVacationsActions
- `getVacations(page, pageSize)`: Obtiene lista paginada
- `getVacationById(id)`: Obtiene una solicitud específica
- `createVacation(data)`: Crea nueva solicitud
- `updateVacation(data)`: Actualiza solicitud existente
- `deleteVacation()`: Elimina solicitud

### useVacations
- `getTableColumns()`: Retorna configuración de columnas para BaseTable

## Componentes Base Utilizados
- `BaseTable`: Tabla con paginación
- `BaseModal`: Modal reutilizable
- `BaseButton`: Botones estilizados
- `BaseFormInput`: Inputs con validación
- `BaseFormSelect`: Selectores con validación
- `BaseTextArea`: Área de texto con validación

## Próximos Pasos

Para conectar con un backend real:

1. Crear servicio en `services/vacationService.ts`
2. Reemplazar datos mock en `useVacationsActions.ts`
3. Implementar llamadas HTTP con axios
4. Ajustar mapeos según estructura real del backend

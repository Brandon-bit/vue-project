# Módulo de Alta de Empleados

Este módulo gestiona el registro, edición, visualización y eliminación de empleados en el sistema.

## Estructura del Módulo

```
AltaEmpleados/
├── components/
│   ├── EmployeeForm.vue           # Formulario principal con secciones colapsables
│   ├── DeleteEmployeeModal.vue    # Modal de confirmación para eliminar
│   └── EmployeeStatsCards.vue     # Cards de estadísticas de empleados
├── composables/
│   ├── useEmployeeActions.ts      # Acciones CRUD con mock data
│   ├── useEmployees.ts            # Configuración de tabla y columnas
│   └── mappingEmployees.ts        # Mapeo entre frontend y backend
├── types/
│   └── employeeTypes.ts           # Tipos TypeScript del módulo
├── validations/
│   └── employeeValidation.ts      # Validaciones con Zod
└── views/
    ├── EmployeesListView.vue      # Vista de tabla con listado y estadísticas
    └── CreateUpdateEmployeeView.vue # Vista para crear/editar
```

## Rutas Requeridas

Agregar las siguientes rutas al router:

```typescript
{
  path: '/rrhh/empleados',
  name: 'Empleados',
  component: () => import('@/modules/RRHH/AltaEmpleados/views/EmployeesListView.vue')
},
{
  path: '/rrhh/empleados/crear',
  name: 'Crear empleado',
  component: () => import('@/modules/RRHH/AltaEmpleados/views/CreateUpdateEmployeeView.vue')
},
{
  path: '/rrhh/empleados/editar/:id',
  name: 'Actualizar empleado',
  component: () => import('@/modules/RRHH/AltaEmpleados/views/CreateUpdateEmployeeView.vue')
}
```

## Características

### 1. Vista de Tabla (EmployeesListView.vue)
- **Cards de estadísticas** mostrando:
  - Total de empleados
  - Empleados activos (con porcentaje)
  - Empleados de vacaciones (con porcentaje)
  - Empleados inactivos (con porcentaje)
- Listado paginado de empleados usando `BaseTable`
- Botón "Nuevo empleado" que redirige a `/rrhh/empleados/crear`
- Botones de acción por fila:
  - **Editar**: Redirige a `/rrhh/empleados/editar/:id`
  - **Eliminar**: Muestra modal de confirmación
- Columnas mostradas:
  - Número de empleado
  - Nombre completo
  - Email
  - Puesto
  - Departamento
  - Empresa
  - Estado (Activo/Inactivo)

### 2. Formulario (EmployeeForm.vue)
- Título dinámico según modo (Crear/Actualizar)
- Tres secciones colapsables:

#### Sección 1: Datos Personales
- Nombre(s)
- Apellidos
- Correo Electrónico
- Teléfono
- Fecha de Nacimiento
- RFC
- Dirección

#### Sección 2: Información Laboral
- Fecha de Ingreso
- Empresa (select)
- Departamento (select)
- Puesto
- Salario Mensual
- Tipo de Contrato (select)
- Reporta a (select, opcional)

#### Sección 3: Documentos
- Área de carga de archivos (UI preparada)
- Lista de documentos requeridos

### 3. Modal de Eliminación (DeleteEmployeeModal.vue)
- Confirmación antes de eliminar
- Muestra información del empleado a eliminar
- Alerta de advertencia
- Refresca la tabla después de eliminar

## Composables

### useEmployeeActions.ts
Funciones disponibles con mock data:
- `getEmployees(page, pageSize)` - Lista paginada
- `getEmployeeById(id)` - Obtener empleado por ID
- `getEmployeeStats()` - Estadísticas de empleados (total, activos, vacaciones, inactivos)
- `getCompanies()` - Lista de empresas
- `getDepartments()` - Lista de departamentos
- `getContractTypes()` - Tipos de contrato
- `getSupervisors()` - Lista de supervisores
- `createEmployee(data)` - Crear empleado
- `updateEmployee(id, data)` - Actualizar empleado
- `deleteEmployee(id)` - Eliminar empleado

### useEmployees.ts
- `getTableColumns()` - Configuración de columnas para BaseTable
- `MODAL_ID` - ID del modal de eliminación

## Validaciones

Todas las validaciones están implementadas con Zod:
- Campos requeridos con mensajes personalizados
- Validación de email
- Validación de longitud mínima/máxima
- Validación de fechas
- Validación de números positivos

## Mapeo de Datos

### Frontend → Backend (mapEmployeeRequest)
Convierte nombres en inglés a español para el backend

### Backend → Frontend (mapEmployeeDTO)
Convierte nombres en español a inglés para el frontend

## Mock Data

El módulo incluye datos de prueba:
- 8 empleados de ejemplo (6 activos, 1 de vacaciones, 1 inactivo)
- 3 empresas
- 8 departamentos
- 3 tipos de contrato
- 3 supervisores

### Estadísticas Mock
Las estadísticas se calculan automáticamente desde los datos mock:
- **Total**: 8 empleados
- **Activos**: 6 empleados (75%)
- **De Vacaciones**: 1 empleado (12.5%)
- **Inactivos**: 1 empleado (12.5%)

## Integración con Backend

Para conectar con el backend real, actualizar las funciones en `useEmployeeActions.ts`:

```typescript
// Ejemplo:
const getEmployees = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get(`/employees?page=${page}&pageSize=${pageSize}`)
    return response.data
}
```

## Componentes del Módulo

### EmployeeStatsCards.vue
Componente que muestra 4 cards con estadísticas:
- **Total Empleados**: Cantidad total en todas las empresas
- **Activos**: Empleados activos con porcentaje
- **De Vacaciones**: Empleados de vacaciones con porcentaje
- **Inactivos**: Empleados inactivos con porcentaje

Los porcentajes se calculan automáticamente basados en el total.
Los colores siguen el sistema de diseño de DaisyUI:
- Verde (success) para activos
- Naranja (warning) para vacaciones
- Gris para inactivos

## Componentes Compartidos Utilizados

- `BaseTable` - Tabla con paginación y búsqueda
- `BaseFormInput` - Input con validación
- `BaseFormSelect` - Select con validación
- `BaseButton` - Botón estilizado
- `BaseModal` - Modal reutilizable

## Notas

- El formulario usa `vee-validate` con Zod para validaciones
- Los errores se muestran automáticamente bajo cada campo
- El scroll automático lleva al primer error en el formulario
- El modo edición carga los datos automáticamente al montar
- Todos los selects se cargan desde el composable de acciones

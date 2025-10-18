# Módulo Permisos y Licencias (Permissions & Licenses)

Módulo para el portal de autoservicio de solicitudes de recursos y ausencias.

## Estructura del Módulo

```
PermisosYLicencias/
├── components/          # Componentes Vue del módulo
│   ├── PermissionForm.vue           # Formulario para crear/editar solicitudes
│   ├── PermissionTypeSelector.vue   # Selector de tipo de permiso
│   ├── DeletePermission.vue         # Componente para eliminar solicitudes
│   ├── PermissionModal.vue          # Modal principal que gestiona las acciones
│   └── StatsCard.vue                # Tarjeta de estadísticas
│
├── composables/         # Lógica reutilizable
│   ├── mappingPermissionData.ts     # Mapeo de datos entre API y aplicación
│   └── usePermissionActions.ts      # Composable para acciones CRUD y aprobaciones
│
├── services/            # Servicios de API
│   └── permissionService.ts         # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── permissionStore.ts           # Store para gestión de estado de permisos
│
├── types/               # Definiciones de TypeScript
│   └── permissionTypes.ts           # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── permissionValidation.ts      # Validaciones con Zod
│
└── views/               # Vistas principales
    └── PermissionView.vue           # Vista principal del módulo
```

## Características Principales

### 1. Dashboard de Estadísticas (4 Tarjetas)

- **Solicitudes Activas**: 12 (🔵 Azul - description)
- **Pendientes**: 5 (🟡 Amarillo - schedule)
- **Aprobadas Hoy**: 8 (🟢 Verde - check_circle)
- **Recursos Disponibles**: 15 (🟣 Púrpura - meeting_room)

### 2. Sistema de Tabs (3 Pestañas)

#### Tab 1: Mis Solicitudes
- **Tabla paginada con BaseTable**
- Columnas:
  - Tipo
  - Recurso
  - Fecha Inicio
  - Fecha Fin
  - Estado (badge con icono)
  - Acciones (Ver Detalles)

#### Tab 2: Pendientes de Aprobación
- **Lista de tarjetas (no tabla)**
- Cada tarjeta muestra:
  - Tipo de permiso con badge
  - Solicitante
  - Recurso
  - Período (fechas)
  - Motivo/justificación
  - Botones: Rechazar (rojo) y Aprobar (verde)

#### Tab 3: Calendario de Recursos
- **En construcción**
- Mensaje: "Vista de calendario interactivo próximamente"
- Icono grande de calendario
- Texto descriptivo

### 3. Tipos de Permisos (4 Categorías)

**1. Uso de Vehículo** 🚗
- Icono: directions_car (azul)
- Descripción: "Solicitar vehículo de la empresa"
- Recursos:
  - Vehículo #1 - Honda Civic
  - Vehículo #2 - Nissan Versa
  - Vehículo #3 - Toyota Corolla

**2. Equipo de Cómputo** 💻
- Icono: laptop (púrpura)
- Descripción: "Solicitar laptop, proyector u otro equipo"
- Recursos:
  - Laptop Dell XPS
  - Proyector HD
  - Pantalla Portátil
  - Cámara Web 4K

**3. Sala de Juntas** 🚪
- Icono: meeting_room (verde)
- Descripción: "Reservar sala de reuniones"
- Recursos:
  - Sala A - Planta Baja (Cap. 10)
  - Sala B - Primer Piso (Cap. 6)
  - Sala Ejecutiva (Cap. 15)

**4. Licencia de Ausencia** ✈️
- Icono: flight_takeoff (naranja)
- Descripción: "Solicitar día(s) de ausencia justificada"
- Recursos:
  - N/A

### 4. Flujo del Modal de Nueva Solicitud

**Paso 1: Selector de Tipo**
- Grid 2x2 con tarjetas grandes
- Cada tarjeta muestra:
  - Icono grande (6xl) con color
  - Nombre del tipo
  - Descripción breve
- Al hacer clic → Avanza al formulario

**Paso 2: Formulario**
- Muestra tipo seleccionado con botón "Cambiar"
- Campos:
  - **Recurso/Tipo**: Selector (opciones según tipo)
  - **Fecha Inicio**: Input date
  - **Fecha Fin**: Input date
  - **Motivo/Justificación**: Textarea (mín. 10 caracteres)
- Alert informativo: "El recurso está disponible..."
- Botones: "Atrás" y "Enviar Solicitud"

### 5. Mock Data (5 Solicitudes)

**Solicitud 1: Pendiente** 🟡
- Tipo: Uso de Vehículo
- Recurso: Vehículo #3 - Toyota Corolla
- Solicitante: Carlos López
- Fecha: 2025-01-15
- Motivo: Visita a cliente en Guadalajara

**Solicitud 2: Aprobado** 🟢
- Tipo: Sala de Juntas
- Recurso: Sala A - Planta Baja
- Solicitante: María García
- Fecha: 2025-01-12
- Motivo: Presentación a inversionistas

**Solicitud 3: Pendiente** 🟡
- Tipo: Equipo de Cómputo
- Recurso: Proyector HD
- Solicitante: Ana Martínez
- Fechas: 2025-01-14 al 2025-01-16
- Motivo: Capacitación interna

**Solicitud 4: Aprobado** 🟢
- Tipo: Licencia de Ausencia
- Recurso: N/A
- Solicitante: Juan Pérez
- Fechas: 2025-01-20 al 2025-01-22
- Motivo: Asunto personal

**Solicitud 5: Rechazado** 🔴
- Tipo: Uso de Vehículo
- Recurso: Vehículo #1 - Honda Civic
- Solicitante: Pedro Ramírez
- Fecha: 2025-01-10
- Motivo: Entrega de documentos

### 6. Validaciones

Esquema de validación con Zod que incluye:
- Tipo de permiso requerido
- Recurso requerido
- Fecha de inicio requerida
- Fecha de fin requerida
- Validación personalizada: Fecha fin >= Fecha inicio
- Motivo requerido (mínimo 10 caracteres)

### 7. Tipos de Datos

#### PermissionType
```typescript
{
    id?: number
    type: string
    resource: string
    applicant: string
    startDate: Date
    endDate: Date
    status: 'Pendiente' | 'Aprobado' | 'Rechazado'
    reason: string
}
```

#### PermissionTypeInfo
```typescript
{
    id: 'vehiculo' | 'equipo' | 'sala' | 'ausencia'
    name: string
    icon: string
    color: string
    description: string
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import PermissionView from '@/modules/Administracion/PermisosYLicencias/views/PermissionView.vue'
```

### Usar el Store
```typescript
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'

const permissionStore = usePermissionStore()
permissionStore.setData(permissionData)
permissionStore.setSelectedPermissionType('vehiculo')
```

### Usar las Acciones
```typescript
import { usePermissionActions } from '@/modules/Administracion/PermisosYLicencias/composables/usePermissionActions'

const { 
    getPermissions, 
    createPermission, 
    editPermission, 
    deletePermission,
    approvePermission,
    rejectPermission
} = usePermissionActions()
```

## Endpoints de API Esperados

- `GET /permisos` - Obtener solicitudes con filtros
- `POST /permisos` - Crear nueva solicitud
- `PUT /permisos/:id` - Actualizar solicitud
- `DELETE /permisos/:id` - Eliminar solicitud
- `POST /permisos/:id/aprobar` - Aprobar solicitud
- `POST /permisos/:id/rechazar` - Rechazar solicitud (con razón opcional)

## Estados de Solicitud

- **Pendiente** (Pendiente): Solicitud en espera de aprobación
  - Badge: badge-warning
  - Icono: schedule
- **Aprobado** (Aprobado): Solicitud aprobada
  - Badge: badge-success
  - Icono: check_circle
- **Rechazado** (Rechazado): Solicitud rechazada
  - Badge: badge-error
  - Icono: cancel

## Características Visuales

- **Selector de tipo**: Grid 2x2 con tarjetas interactivas
- **Iconos Material Symbols**: directions_car, laptop, meeting_room, flight_takeoff
- **Badges con iconos**: Estado visual con icono y texto
- **Tabla con BaseTable**: Para "Mis Solicitudes" con paginación
- **Tarjetas de aprobación**: Para "Pendientes de Aprobación" sin tabla
- **Calendario en construcción**: Mensaje placeholder con icono grande
- **Formato de fechas**: Con toLocaleDateString()
- **Botones de acción**: Aprobar (verde) y Rechazar (rojo)

## Funcionalidades Especiales

1. **Selector de tipo en modal**: Paso previo al formulario
2. **Botón "Cambiar"**: Para volver al selector de tipo
3. **Recursos dinámicos**: Cambian según el tipo seleccionado
4. **Alert de disponibilidad**: Información sobre el recurso
5. **Proceso de aprobación**: Flujo completo de aprobación/rechazo
6. **Dashboard de métricas**: Estadísticas en tiempo real
7. **Validación de fechas**: Fecha fin >= Fecha inicio
8. **Calendario placeholder**: Sección preparada para futura implementación

## Diferencias con Otros Módulos

1. **Modal con dos pasos**:
   - Paso 1: Selector de tipo (grid 2x2)
   - Paso 2: Formulario completo

2. **Tres tabs**:
   - Mis Solicitudes (BaseTable)
   - Pendientes de Aprobación (Tarjetas)
   - Calendario (En construcción)

3. **Tarjetas en lugar de tabla**:
   - Tab de aprobaciones usa tarjetas expandidas
   - Más información visible sin clicks

4. **Recursos dinámicos**:
   - Opciones de recurso cambian según tipo seleccionado

5. **Calendario placeholder**:
   - Sección preparada para futura funcionalidad

## Flujo de Trabajo

1. **Crear Solicitud**: 
   - Usuario selecciona tipo → Completa formulario → Envía
   - Estado inicial: Pendiente

2. **Aprobación**: 
   - Supervisor revisa en "Pendientes de Aprobación"
   - Ve detalles completos en tarjeta
   - Aprueba o rechaza con un click

3. **Seguimiento**: 
   - Usuario ve estado en "Mis Solicitudes"
   - Filtrado por estado con badges visuales

4. **Calendario** (Futuro):
   - Vista consolidada de todos los recursos
   - Disponibilidad en tiempo real

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **Validación personalizada**: Comparación de fechas con `.refine()`
5. **TypeScript**: Totalmente tipado para mejor DX
6. **Componentes Base**: Reutiliza componentes compartidos
7. **Modal dinámico**: Cambia contenido según paso del flujo
8. **Mock Data**: Data estática para visualización inmediata
9. **Sin fetch**: No intenta hacer llamadas a API
10. **BaseTable**: Usa componente de tabla paginada solo en tab 1

## Alertas y Notificaciones

- **Alert de disponibilidad**: Información sobre recurso disponible
- **Badges de estado**: Identificación visual rápida
- **Tarjetas interactivas**: Hover effects para mejor UX
- **Botones con iconos**: Acciones claras y visuales

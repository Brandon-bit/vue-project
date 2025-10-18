# Módulo de Auditorías Administrativas

Sistema completo de gestión de auditorías administrativas y mejora continua basado en el diseño React original.

## 📁 Estructura del Módulo

```
AuditoriasAdministrativas/
├── components/
│   ├── AddEditAuditForm.vue       # Formulario de auditoría
│   ├── AddEditFindingForm.vue     # Formulario de hallazgos
│   ├── AuditModal.vue             # Modal para auditorías (CREATE/EDIT/DELETE)
│   ├── AuditStatsCards.vue        # Tarjetas de estadísticas
│   ├── ChecklistExecution.vue     # Checklist de ejecución
│   ├── DeleteAudit.vue            # Confirmación de eliminación
│   ├── FindingModal.vue           # Modal para hallazgos
│   └── FindingsKanban.vue         # Tablero Kanban de hallazgos
├── composables/
│   ├── useAuditActions.ts         # Acciones CRUD
│   └── useAuditTableHeaders.ts    # Configuración de columnas de tabla
├── services/
│   └── auditService.ts            # Servicios de API
├── store/
│   └── auditStore.ts              # Store de Pinia
├── types/
│   └── auditTypes.ts              # Tipos TypeScript
├── validation/
│   └── auditValidation.ts         # Esquemas de validación Zod
├── views/
│   └── AuditoriasAdministrativasView.vue  # Vista principal
└── README.md
```

## 🎯 Características

### 1. Gestión de Auditorías
- ✅ Crear, editar y eliminar auditorías
- ✅ Tipos: Fiscal, Operativa, Cumplimiento, Calidad
- ✅ Asignación de auditores (internos o externos)
- ✅ Seguimiento de progreso (0-100%)
- ✅ Contador de hallazgos
- ✅ Estados: Planificada, En Ejecución, En Revisión, Cerrada

### 2. Ejecución de Auditorías (Checklist)
- ✅ Checklist organizado por categorías:
  - Documentación
  - Procesos
  - Controles
- ✅ Marcado de items conformes/no conformes
- ✅ Registro inmediato de hallazgos desde items no conformes
- ✅ Selector de auditoría activa

### 3. Gestión de Hallazgos
- ✅ Registro con severidad (Alta, Media, Baja)
- ✅ Asignación de responsables
- ✅ Fechas límite de corrección
- ✅ Estados: Pendiente, En Proceso, Completado
- ✅ Tablero Kanban visual
- ✅ Espacio para evidencia fotográfica

### 4. Estadísticas
- 📊 Auditorías activas
- 📊 Hallazgos abiertos
- 📊 Tareas correctivas
- 📊 Auditorías completadas este año

## 🔧 Componentes Base Utilizados

- `BaseTable` - Tabla paginada con ordenamiento
- `BaseModal` - Sistema de modales reutilizable
- `BaseFormInput` - Campos de texto con validación
- `BaseFormSelect` - Selectores con validación
- `BaseTextArea` - Áreas de texto
- `BaseCheckbox` - Checkboxes
- `BaseButton` - Botones
- `BaseTitle` - Títulos de página

## 📋 Tipos de Datos

### Audit
```typescript
{
    id: number
    nombre: string
    tipo: 'Fiscal' | 'Operativa' | 'Cumplimiento' | 'Calidad'
    area: string
    auditor: string
    fechaInicio: string
    fechaFin: string
    estado: 'Planificada' | 'En Ejecución' | 'En Revisión' | 'Cerrada'
    hallazgos: number
    progreso: number
    objetivo: string
    activo: boolean
    eliminado: boolean
}
```

### Finding
```typescript
{
    id: number
    auditoriaId: number
    auditoriaNombre: string
    severidad: 'Alta' | 'Media' | 'Baja'
    descripcion: string
    responsable: string
    fechaLimite: string
    estado: 'Pendiente' | 'En Proceso' | 'Completado'
    activo: boolean
    eliminado: boolean
}
```

## 🎨 Secciones de la UI

### Tab 1: Auditorías
- Tabla paginada con BaseTable
- Columnas: Nombre, Tipo, Área, Auditor, Período, Progreso, Hallazgos, Estado, Acciones
- Botón "Nueva Auditoría" en la esquina superior derecha
- Acciones: Editar y Eliminar en cada fila

### Tab 2: Ejecución
- Selector de auditoría activa
- Checklist agrupado por categorías
- Checkboxes para marcar conformidad
- Badge de estado (Cumple/No Cumple)
- Botón "Registrar Hallazgo" para items no conformes

### Tab 3: Hallazgos y Planes de Acción
- Tablero Kanban con 3 columnas
- Tarjetas con:
  - Descripción del hallazgo
  - Badge de severidad (Alta/Media/Baja)
  - Nombre de la auditoría
  - Responsable
  - Fecha límite
- Empty state cuando no hay hallazgos

## 🔄 Flujo de Trabajo

1. **Planificar**: Crear auditoría con objetivos, alcance y auditor asignado
2. **Ejecutar**: Marcar items del checklist durante la auditoría
3. **Registrar Hallazgos**: Documentar desviaciones encontradas
4. **Seguimiento**: Monitorear correcciones en el Kanban
5. **Cerrar**: Completar cuando todas las acciones estén resueltas

## 🚀 Uso

```typescript
// Navegar al módulo
router.push('/administracion/auditorias-administrativas')

// Abrir modal de creación
modalStore.open(auditStore.auditModalId, { 
    type: 'CREATE', 
    title: 'Planificar Nueva Auditoría' 
})

// Abrir modal de hallazgo
modalStore.open(auditStore.findingModalId, { 
    type: 'CREATE', 
    title: 'Registrar Hallazgo de Auditoría' 
})
```

## 📡 Endpoints de API

### Auditorías
- `GET /auditorias` - Listar auditorías (con paginación)
- `POST /auditorias` - Crear auditoría
- `PUT /auditorias/:id` - Actualizar auditoría
- `DELETE /auditorias/:id` - Eliminar auditoría (lógico)

### Hallazgos
- `GET /hallazgos` - Listar hallazgos
- `POST /hallazgos` - Crear hallazgo
- `PUT /hallazgos/:id` - Actualizar hallazgo
- `DELETE /hallazgos/:id` - Eliminar hallazgo (lógico)

## 📝 Validaciones

### Auditoría (Zod)
- Nombre: mínimo 10 caracteres
- Tipo: enum ['Fiscal', 'Operativa', 'Cumplimiento', 'Calidad']
- Área: requerida
- Auditor: mínimo 3 caracteres
- Fechas: fin >= inicio
- Objetivo: mínimo 20 caracteres

### Hallazgo (Zod)
- Auditoría: requerida (ID)
- Severidad: enum ['Alta', 'Media', 'Baja']
- Descripción: mínimo 20 caracteres
- Responsable: mínimo 3 caracteres
- Fecha límite: requerida

## 🎨 Estilos DaisyUI

- `tabs tabs-lifted` - Pestañas elevadas
- `stats` - Tarjetas de estadísticas
- `badge` - Etiquetas de estado y severidad
- `progress` - Barras de progreso
- `card` - Tarjetas del Kanban
- `checkbox` - Checkboxes del checklist
- `alert` - Alertas informativas

## 🔐 Permisos

El módulo respeta los permisos configurados en el sistema de autenticación.

## 📚 Referencia

Este módulo fue creado siguiendo la estructura del proyecto, específicamente basándose en:
- Módulo de Garantías (`src/modules/Inventario/ConfiguracionDeInventario/Garantias`)
- Diseño UI del componente React (`src/react/Auditorias.tsx`)

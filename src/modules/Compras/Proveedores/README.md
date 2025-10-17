# Módulo de Proveedores

## Descripción
Módulo CRM (Customer Relationship Management) completo para la gestión de proveedores con vista 360°. Permite administrar toda la información de proveedores, evaluar su desempeño, consultar historial de compras y gestionar documentación.

## Estructura del Módulo

```
Proveedores/
├── components/
│   ├── SupplierForm.vue        # Formulario para crear/editar proveedores
│   ├── SupplierDetail.vue      # Vista detallada con tabs (General, Historial, Evaluación, Documentos)
│   └── SupplierModal.vue       # Modal reutilizable
├── composables/
│   └── useSupplierActions.ts   # Lógica de negocio y acciones
├── store/
│   └── supplierStore.ts        # Estado global del módulo
├── types/
│   └── supplierTypes.ts        # Definiciones de tipos TypeScript
├── validations/
│   └── supplierValidation.ts   # Esquemas de validación con Zod
├── views/
│   └── SupplierView.vue        # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Gestión de Proveedores
- **Registro completo** de proveedores con información fiscal, contacto y bancaria
- **Búsqueda y filtrado** por nombre, RFC o categoría
- **Categorización** por tipo de proveedor (Materiales, Servicios, Tecnología, Insumos, Otros)
- **Estados** de proveedor (Activo, Inactivo, Suspendido)

### 2. Vista 360° del Proveedor
El modal de detalle incluye 4 tabs:

#### **Tab General**
- Información fiscal (RFC, Razón Social)
- Datos de contacto (Teléfono, Email, Dirección)
- Información bancaria (Banco, CLABE)
- Estadísticas rápidas (Órdenes, Total Comprado, Calificación)

#### **Tab Historial**
- Listado completo de órdenes de compra
- Montos y fechas de cada transacción
- Estados de las órdenes
- Historial ordenado cronológicamente

#### **Tab Evaluación**
- **Calificaciones por criterio:**
  - Calidad de productos/servicios
  - Tiempo de entrega
  - Precio competitivo
  - Servicio al cliente
- Promedio general de desempeño
- Gráfico de tendencia de desempeño (próximamente)

#### **Tab Documentos**
- Gestión de documentos del proveedor
- Carga de archivos (drag & drop)
- Visualización de documentos existentes:
  - Constancia Fiscal
  - Contratos
  - Opinión de Cumplimiento SAT
  - Otros documentos relevantes

### 3. Sistema de Calificación
- **Puntuación de 1 a 5 estrellas**
- Basado en múltiples criterios
- Visible en el listado principal
- Detalle completo en el tab de evaluación

### 4. Estadísticas Generales
Dashboard con métricas clave:
- Total de proveedores registrados
- Proveedores activos
- Número de categorías
- Calificación promedio general

## Tipos de Datos

### SupplierType
```typescript
{
    id: number
    nombre: string                  // Razón social
    rfc: string                     // RFC (12-13 caracteres)
    categoria: string               // Categoría del proveedor
    estatus: 'Activo' | 'Inactivo' | 'Suspendido'
    puntuacion: number             // Calificación de 1-5
    ordenes: number                // Total de órdenes de compra
    montoTotal: number             // Monto total comprado
    telefono?: string
    email?: string
    banco?: string
    clabe?: string                 // 18 dígitos
    direccion?: string
    contactoPrincipal?: string
    fechaRegistro: string
    ultimaCompra?: string
}
```

### SupplierEvaluationType
```typescript
{
    calidad: number                // Calificación de calidad
    tiempoEntrega: number          // Calificación de puntualidad
    precio: number                 // Calificación de precios
    servicio: number               // Calificación de servicio
    promedio: number               // Promedio general
}
```

## Validaciones

El formulario de registro valida:
- **Razón Social**: Mínimo 3 caracteres
- **RFC**: 12-13 caracteres, formato válido (regex)
- **Categoría**: Campo requerido
- **Teléfono**: Mínimo 10 dígitos
- **Email**: Formato de email válido
- **Banco**: Campo requerido
- **CLABE**: Exactamente 18 dígitos numéricos
- **Dirección**: Opcional
- **Contacto Principal**: Opcional

## Flujo de Trabajo

### 1. Registro de Proveedor
1. Click en "Registrar Proveedor"
2. Completar formulario con datos fiscales, contacto y bancarios
3. Sistema valida RFC y CLABE
4. Proveedor queda registrado con estatus "Activo"

### 2. Consulta de Información
1. Buscar proveedor por nombre o RFC
2. Filtrar por categoría si es necesario
3. Click en tarjeta del proveedor
4. Se abre modal con vista 360°

### 3. Evaluación de Desempeño
1. Abrir detalle del proveedor
2. Navegar al tab "Evaluación"
3. Consultar calificaciones por criterio
4. Ver tendencia histórica

### 4. Gestión de Documentos
1. Abrir detalle del proveedor
2. Navegar al tab "Documentos"
3. Arrastrar archivos o seleccionar
4. Documentos quedan asociados al proveedor

## Integración con Otros Módulos

- **Órdenes de Compra**: Historial de OCs por proveedor
- **Evaluación de Proveedores**: Calificaciones y métricas
- **Solicitudes de Compra**: Selección de proveedor para cotizaciones
- **Pagos**: Información bancaria para transferencias

## Categorías de Proveedores

- **Materiales**: Proveedores de materias primas y materiales
- **Servicios**: Proveedores de servicios profesionales
- **Tecnología**: Proveedores de hardware, software y TI
- **Insumos**: Proveedores de insumos y consumibles
- **Otros**: Otros tipos de proveedores

## Estados del Proveedor

- **Activo**: Proveedor habilitado para compras
- **Inactivo**: Proveedor temporalmente deshabilitado
- **Suspendido**: Proveedor suspendido por incumplimientos

## Componentes Reutilizables

### SupplierModal
Modal dinámico que puede mostrar:
- Formulario de creación (type: 'CREATE')
- Formulario de edición (type: 'EDIT')
- Vista de detalle con tabs (type: 'DETAIL')

### SupplierForm
Formulario con validación completa para registro/edición.

### SupplierDetail
Vista completa con 4 tabs:
- General
- Historial
- Evaluación
- Documentos

## Acciones Disponibles

- `getSuppliers()`: Obtener lista de proveedores
- `getSupplierStats()`: Obtener estadísticas generales
- `getSupplierOrderHistory()`: Obtener historial de órdenes
- `getSupplierEvaluation()`: Obtener evaluación del proveedor
- `getSupplierDocuments()`: Obtener documentos del proveedor
- `createSupplier()`: Registrar nuevo proveedor
- `updateSupplier()`: Actualizar datos del proveedor
- `deleteSupplier()`: Eliminar proveedor
- `uploadDocument()`: Subir documento del proveedor

## Búsqueda y Filtros

### Búsqueda
- Por nombre de proveedor
- Por RFC
- Búsqueda en tiempo real (reactiva)

### Filtros
- Por categoría
- Por estado (próximamente)
- Por calificación (próximamente)

## Características de UX

- **Tarjetas interactivas** con hover effect
- **Búsqueda en tiempo real** sin necesidad de botón
- **Carga lazy** de tabs (solo se cargan al hacer click)
- **Estados de carga** con skeletons
- **Iconos descriptivos** para cada sección
- **Badges de estado** con códigos de color
- **Sistema de estrellas** para calificaciones

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend
- La carga de documentos requiere implementación de storage
- Los gráficos de tendencia están pendientes de implementar
- Las evaluaciones se calculan automáticamente basadas en OCs completadas

## Mejoras Futuras

- [ ] Gráficos de tendencia de desempeño
- [ ] Comparación entre proveedores
- [ ] Sistema de alertas por vencimiento de documentos
- [ ] Cotizaciones automáticas a múltiples proveedores
- [ ] Integración con sistema de pagos
- [ ] Historial de comunicaciones
- [ ] Portal de proveedores (self-service)
- [ ] Reportes de desempeño en PDF/Excel
- [ ] Notificaciones automáticas
- [ ] Gestión de contratos y renovaciones

## Seguridad

- Validación de RFC con regex
- Validación de CLABE (18 dígitos)
- Validación de email
- Sanitización de inputs
- Control de acceso por roles (próximamente)

## Mejores Prácticas

1. **Mantener información actualizada**: RFC, CLABE, contactos
2. **Evaluar regularmente**: Calificar después de cada OC completada
3. **Documentación completa**: Subir todos los documentos fiscales
4. **Revisión periódica**: Verificar vigencia de documentos
5. **Comunicación clara**: Mantener datos de contacto actualizados

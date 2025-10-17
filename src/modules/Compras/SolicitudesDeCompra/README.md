# Módulo de Solicitudes de Compra

## Descripción
Módulo completo para la gestión de solicitudes de compra con flujo de aprobación de múltiples pasos. Permite a los usuarios crear solicitudes, seleccionar productos del catálogo, validar presupuesto y hacer seguimiento del estado de aprobación.

## Estructura del Módulo

```
SolicitudesDeCompra/
├── components/
│   ├── PurchaseRequestForm.vue      # Formulario multi-paso (4 pasos)
│   ├── PurchaseRequestDetail.vue    # Vista detallada de la solicitud
│   └── PurchaseRequestModal.vue     # Modal con navegación entre pasos
├── composables/
│   └── usePurchaseRequestActions.ts # Lógica de negocio y acciones
├── store/
│   └── purchaseRequestStore.ts      # Estado global con gestión de pasos
├── types/
│   └── purchaseRequestTypes.ts      # Definiciones de tipos TypeScript
├── validations/
│   └── purchaseRequestValidation.ts # Validaciones por paso con Zod
├── views/
│   └── PurchaseRequestView.vue      # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Formulario Multi-Paso (4 Pasos)

#### **Paso 1: Información General**
- Solicitante (auto-completado)
- Área o Departamento
- Justificación de la compra
- Validación: Área requerida, justificación mínimo 10 caracteres

#### **Paso 2: Selección de Productos**
- Búsqueda en catálogo de productos
- Agregar productos con cantidad
- Modificar cantidades
- Eliminar productos
- Cálculo automático de subtotales y total
- Validación: Al menos 1 producto seleccionado

#### **Paso 3: Validación de Presupuesto**
- Consulta automática de presupuesto disponible por área
- Comparación: Presupuesto disponible vs. Monto solicitado
- Cálculo de saldo restante
- Alertas visuales:
  - Verde: Presupuesto suficiente
  - Rojo: Presupuesto insuficiente

#### **Paso 4: Resumen y Confirmación**
- Resumen completo de la solicitud
- Información del flujo de aprobación
- Botón para enviar solicitud

### 2. Vista Detallada de Solicitud
El modal de detalle muestra:
- **Header**: Folio y estado con badge
- **Información General**: Solicitante, área, fecha, items
- **Justificación**: Descripción de la necesidad
- **Información Financiera**: Presupuesto, monto, saldo
- **Información de Aprobación/Rechazo**: Aprobador, fecha, comentarios
- **Timeline de Estados**: Visualización del flujo
- **Alertas contextuales**: Según el estado actual

### 3. Gestión de Estados
Estados disponibles:
- **Pendiente**: Solicitud creada, esperando revisión
- **En Revisión**: Siendo evaluada por supervisor
- **Aprobada**: Aprobada, lista para generar OC
- **Rechazada**: Rechazada con comentarios

### 4. Dashboard con Estadísticas
- Total de solicitudes
- Solicitudes pendientes
- Solicitudes aprobadas
- Solicitudes rechazadas

## Tipos de Datos

### PurchaseRequestType
```typescript
{
    id: number
    folio: string                   // Folio único (SC-2024-XXX)
    solicitante: string             // Nombre del solicitante
    area: string                    // Área/Departamento
    fecha: string                   // Fecha de creación
    total: number                   // Monto total
    estatus: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Revisión'
    items: number                   // Cantidad de productos
    justificacion?: string          // Justificación de la compra
    aprobador?: string              // Quien aprobó/rechazó
    fechaAprobacion?: string        // Fecha de decisión
    comentarios?: string            // Comentarios del aprobador
    presupuestoDisponible?: number  // Presupuesto del área
}
```

### PurchaseRequestItemType
```typescript
{
    id?: number
    productoId: number
    codigo: string
    nombre: string
    cantidad: number
    precio: number
    subtotal: number
}
```

### BudgetValidationType
```typescript
{
    presupuestoDisponible: number
    montoSolicitud: number
    saldoRestante: number
    suficiente: boolean
}
```

## Validaciones

### Paso 1
- **Área**: Campo requerido
- **Justificación**: Mínimo 10 caracteres

### Paso 2
- **Items**: Al menos 1 producto seleccionado
- **Cantidad**: Mayor a 0 para cada producto

### Paso 3
- Validación automática de presupuesto

### Paso 4
- Revisión final antes de enviar

## Flujo de Trabajo

### 1. Creación de Solicitud

**Paso 1: Información General**
1. Sistema auto-completa el solicitante
2. Usuario selecciona área/departamento
3. Usuario escribe justificación
4. Click en "Siguiente"

**Paso 2: Selección de Productos**
1. Sistema carga catálogo de productos
2. Usuario busca productos
3. Usuario agrega productos con cantidad
4. Sistema calcula subtotales y total
5. Click en "Siguiente"

**Paso 3: Validación de Presupuesto**
1. Sistema consulta presupuesto del área
2. Sistema valida si hay fondos suficientes
3. Muestra alerta de suficiencia
4. Click en "Siguiente"

**Paso 4: Resumen**
1. Usuario revisa resumen completo
2. Click en "Enviar Solicitud"
3. Sistema crea la solicitud con estado "Pendiente"

### 2. Flujo de Aprobación

1. **Pendiente** → Solicitud creada
2. **En Revisión** → Supervisor revisando
3. **Aprobada** / **Rechazada** → Decisión tomada

### 3. Consulta de Detalle

1. Click en "Ver Detalle" de cualquier solicitud
2. Se abre modal con información completa
3. Timeline visual del estado
4. Alertas contextuales según estado

## Integración con Otros Módulos

- **Catálogo de Productos**: Selección de productos para la solicitud
- **Presupuestos**: Validación de disponibilidad presupuestal
- **Órdenes de Compra**: Generación de OC desde solicitudes aprobadas
- **Proveedores**: Información para cotizaciones

## Store de Pinia

El store gestiona:
- **Paso actual** del formulario (1-4)
- **Datos del formulario** (área, justificación, items)
- **Solicitud seleccionada** para detalle
- **Navegación** entre pasos
- **Gestión de items** (agregar, eliminar, actualizar)
- **Cálculo de total**

Acciones principales:
- `nextStep()`: Avanzar al siguiente paso
- `previousStep()`: Retroceder un paso
- `addItem()`: Agregar producto
- `removeItem()`: Eliminar producto
- `updateItemQuantity()`: Actualizar cantidad
- `calculateTotal()`: Calcular monto total
- `reset()`: Resetear formulario

## Componentes Reutilizables

### PurchaseRequestModal
Modal dinámico que puede mostrar:
- Formulario multi-paso (type: 'CREATE')
- Vista de detalle (type: 'DETAIL')

Características especiales:
- Navegación entre pasos con botones
- Validación por paso
- Título dinámico según paso actual
- Botón "Enviar" solo en paso 4

### PurchaseRequestForm
Formulario con 4 pasos integrados:
- Indicador visual de progreso
- Validación por paso
- Gestión de catálogo de productos
- Validación de presupuesto en tiempo real

### PurchaseRequestDetail
Vista completa con:
- Información general y financiera
- Timeline de estados
- Alertas contextuales
- Información de aprobación/rechazo

## Acciones Disponibles

- `getPurchaseRequests()`: Obtener lista de solicitudes
- `getPurchaseRequestStats()`: Obtener estadísticas
- `getCatalogProducts()`: Obtener catálogo de productos
- `validateBudget()`: Validar presupuesto disponible
- `createPurchaseRequest()`: Crear nueva solicitud
- `approvePurchaseRequest()`: Aprobar solicitud
- `rejectPurchaseRequest()`: Rechazar solicitud
- `deletePurchaseRequest()`: Eliminar solicitud

## Características de UX

- **Indicador de progreso** visual en cada paso
- **Validación en tiempo real** por paso
- **Búsqueda instantánea** en catálogo
- **Cálculo automático** de totales
- **Navegación intuitiva** entre pasos
- **Alertas contextuales** según estado
- **Timeline visual** del flujo de aprobación
- **Badges de color** para estados
- **Iconos descriptivos** para cada estado

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend
- El catálogo de productos se carga al entrar al paso 2
- La validación de presupuesto se ejecuta al entrar al paso 3
- Los presupuestos por área están simulados
- El flujo de aprobación requiere integración con sistema de usuarios

## Mejoras Futuras

- [ ] Notificaciones en tiempo real de cambios de estado
- [ ] Historial de cambios y auditoría
- [ ] Adjuntar documentos a la solicitud
- [ ] Cotizaciones de múltiples proveedores
- [ ] Aprobaciones multi-nivel según monto
- [ ] Reportes y análisis de solicitudes
- [ ] Exportación a Excel/PDF
- [ ] Dashboard de aprobadores
- [ ] Recordatorios automáticos
- [ ] Integración con calendario
- [ ] Firma electrónica
- [ ] Workflow configurable por área

## Flujo de Aprobación

### Roles
- **Solicitante**: Crea la solicitud
- **Supervisor**: Aprueba o rechaza
- **Comprador**: Genera OC de solicitudes aprobadas

### Niveles de Aprobación (Futuro)
- Hasta $10,000: Supervisor directo
- $10,001 - $50,000: Gerente de área
- Más de $50,000: Director + CFO

## Validación de Presupuesto

El sistema valida automáticamente:
1. Presupuesto asignado al área
2. Presupuesto ya gastado
3. Presupuesto comprometido (en OCs)
4. Disponible = Asignado - Gastado - Comprometido

Si la solicitud excede el disponible:
- Se muestra alerta roja
- Se puede enviar pero requiere aprobación especial
- Se notifica al área de presupuestos

## Mejores Prácticas

1. **Justificación clara**: Explicar bien la necesidad
2. **Productos correctos**: Verificar códigos y precios
3. **Presupuesto**: Validar disponibilidad antes de solicitar
4. **Seguimiento**: Revisar regularmente el estado
5. **Documentación**: Guardar evidencia de la necesidad

## Seguridad

- Validación de permisos por rol
- Solo el solicitante puede ver sus solicitudes
- Aprobadores solo ven solicitudes de su área
- Auditoría de todas las acciones
- Prevención de modificación post-aprobación

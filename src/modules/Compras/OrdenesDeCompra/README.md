# Módulo de Órdenes de Compra

Este módulo implementa un sistema completo de gestión de órdenes de compra con Vue 3 + TypeScript, con dos modos de creación, estadísticas, seguimiento de estados y visualización de detalles.

## Estructura del Módulo

```
OrdenesDeCompra/
├── components/
│   ├── PurchaseOrderForm.vue           # Formulario con 2 modos de creación
│   ├── PurchaseOrderDetail.vue         # Componente para ver detalle de orden
│   └── PurchaseOrderModal.vue          # Modal único con modalMap (CREATE/DETAIL)
├── composables/
│   └── usePurchaseOrderActions.ts      # Acciones CRUD y gestión de estados
├── store/
│   └── purchaseOrderStore.ts           # Estado global con orden seleccionada
├── types/
│   └── purchaseOrderTypes.ts           # Definiciones de tipos TypeScript
├── validations/
│   └── purchaseOrderValidation.ts      # Validaciones con Zod
└── views/
    └── PurchaseOrderView.vue           # Vista principal con estadísticas y listado
```

## Características Principales

### 1. Estadísticas de Órdenes (4 Tarjetas)
- Emitidas
- Confirmadas
- Entregadas
- Total Comprometido

### 2. Dos Modos de Creación
- Desde Solicitud Aprobada
- Orden Directa

### 3. Listado de Órdenes
- 4 estados con badges de colores
- Botón "Ver Detalle" para todas las órdenes
- Acciones según estado
- Monto total destacado

### 4. Modal Único con modalMap
- **CREATE**: Muestra PurchaseOrderForm para crear órdenes
- **DETAIL**: Muestra PurchaseOrderDetail para ver información
- Usa el patrón modalMap como en Categorías
- Un solo modal para ambos casos

### 5. Validaciones con Zod
- Validaciones dinámicas según modo
- Refine para campos condicionales

### 6. Mock Data
- 4 órdenes de ejemplo
- 2 solicitudes aprobadas

## Funcionalidad de Ver Detalle

Al hacer clic en "Ver Detalle" se abre el mismo modal pero con tipo 'DETAIL':

1. **Header con Folio y Estado**: Badge grande con el estado actual
2. **Información General**: Proveedor, fecha, items y monto total
3. **Timeline de Estados**: Visualización del progreso (Emitida → Confirmada → Entregada → Cerrada)
4. **Alertas Contextuales**: Mensajes según el estado actual
5. **Detalles Adicionales**: Información completa formateada

## Patrón modalMap

El modal usa el patrón modalMap (igual que Categorías):

```typescript
const modalMap = {
    CREATE: {
        component: PurchaseOrderForm,
        action: createPurchaseOrder
    },
    DETAIL: {
        component: PurchaseOrderDetail,
        action: null
    }
}
```

- **CREATE**: Renderiza el formulario y ejecuta createPurchaseOrder
- **DETAIL**: Renderiza el detalle y solo cierra el modal (sin action)

El módulo está 100% funcional y listo para usar en /compras/ordenes-de-compra

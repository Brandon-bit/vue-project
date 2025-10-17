# Módulo de Pólizas de Ingresos

Este módulo implementa un sistema completo de gestión de pólizas de ingresos contables con Vue 3 + TypeScript, usando BaseTable con paginación y funcionalidad de vinculación de facturas.

## Estructura del Módulo

```
PolizasDeIngresos/
├── components/
│   ├── IncomePolicyForm.vue         # Formulario completo con partidas y vinculación de facturas
│   ├── IncomePolicyModal.vue        # Modal principal que gestiona CREATE/EDIT/DELETE
│   └── DeleteIncomePolicy.vue       # Componente de confirmación de eliminación
├── composables/
│   ├── useIncomePolicies.ts         # Configuración de columnas para BaseTable
│   ├── useIncomePoliciesActions.ts  # Acciones CRUD con mock data y paginación
│   └── mappingIncomePoliciesData.ts # Mapeo entre frontend y backend
├── store/
│   └── incomePoliciesStore.ts       # Estado global con getters y vinculación de facturas
├── types/
│   └── incomePoliciesTypes.ts       # Definiciones de tipos TypeScript
├── validations/
│   └── incomePoliciesValidation.ts  # Validaciones con Zod (incluye validación de balance)
└── views/
    └── IncomePoliciesView.vue       # Vista principal con BaseTable paginada
```

## Características Principales

### 1. Vista Principal con BaseTable (IncomePoliciesView.vue)
- ✅ Tabla paginada usando BaseTable del proyecto
- ✅ Botón "Nueva póliza de ingreso" en la parte superior
- ✅ Columnas: Folio, Fecha, Cliente, Concepto, Total, Método de Pago, Acciones
- ✅ Botones de Editar y Eliminar en cada fila
- ✅ Búsqueda integrada de BaseTable
- ✅ Paginación automática

### 2. Formulario Completo de Póliza (IncomePolicyForm.vue)
**Sección de Información General:**
- Tipo de Póliza (readonly: "Ingreso")
- Fecha (date picker)
- Cliente (select requerido)
- Método de Pago (select: Transferencia, Cheque, Efectivo, Tarjeta)
- Cuenta Bancaria de Destino (select)
- Referencia Bancaria (input text)
- Concepto (textarea)
- **Botón "Vincular factura"** (solo habilitado si hay cliente seleccionado)

**Sección de Partidas Contables:**
- Tabla dinámica de partidas
- Botón "Agregar partida" para añadir filas manualmente
- Campos por partida:
  - Cuenta (input text)
  - Descripción (input text)
  - Debe (input number)
  - Haber (input number)
  - Referencia (input text)
  - Botón eliminar partida

**Panel de Totales y Validación:**
- Total Debe (calculado automáticamente)
- Total Haber (calculado automáticamente)
- Indicador visual de balance:
  - ✅ Verde con check: "Póliza Cuadrada"
  - ❌ Rojo con error: "Diferencia: $X.XX"

### 3. Modal de Vinculación de Facturas
- Se abre al hacer clic en "Vincular factura"
- Muestra lista de facturas disponibles
- Al seleccionar una factura:
  - **Genera automáticamente 3 partidas:**
    1. Cargo a Bancos (Debe)
    2. Abono a Clientes (Haber - 86% del monto)
    3. IVA Trasladado (Haber - 14% del monto)
  - Cierra el modal automáticamente
  - Las partidas quedan listas para editar si es necesario

### 4. Sistema de Modales
- **Modo CREATE**: Formulario vacío con fecha actual
- **Modo EDIT**: Formulario prellenado con datos existentes
- **Modo DELETE**: Confirmación de eliminación

### 5. Validaciones con Zod
- **Fecha**: Requerida
- **Cliente**: Requerido
- **Concepto**: Mínimo 10 caracteres
- **Método de Pago**: Requerido
- **Cuenta Bancaria**: Requerida
- **Partidas**: 
  - Mínimo 2 partidas requeridas
  - Cada partida debe tener cuenta y descripción
  - **Validación de balance**: Debe = Haber (con tolerancia de 0.01)

### 6. Store con Getters y Actions
El store incluye:
- **Actions**: 
  - addEntry(): Agregar partida manual
  - removeEntry(): Eliminar partida
  - updateEntry(): Actualizar campo de partida
  - **linkInvoice()**: Generar partidas automáticas desde factura
- **Getters computados**:
  - `totalDebit`: Suma automática de débitos
  - `totalCredit`: Suma automática de créditos
  - `isBalanced`: true si Debe = Haber

### 7. Mock Data
**4 pólizas de ejemplo:**
- Pago de factura con transferencia
- Cobro de servicios con cheque
- Cobro de venta con transferencia
- Anticipo de proyecto

**4 facturas disponibles para vincular:**
- A-123: $50,000
- A-124: $32,000
- A-125: $18,500
- A-126: $45,000

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/polizas-de-ingresos',
  name: 'PolizasDeIngresos',
  component: () => import('@contabilidad/PolizasDeIngresos/views/IncomePoliciesView.vue')
}
```

### Funciones Principales

#### Obtener pólizas (paginadas)
```typescript
const { getIncomePolicies } = useIncomePoliciesActions()
const result = await getIncomePolicies(1, 10) // page, pageSize
// Returns: { items: IncomePolicyType[], total: number }
```

#### Obtener facturas disponibles
```typescript
const { getAvailableInvoices } = useIncomePoliciesActions()
const invoices = await getAvailableInvoices('cliente1')
```

#### Crear póliza
```typescript
const { createIncomePolicy } = useIncomePoliciesActions()
await createIncomePolicy({
  date: '2024-03-15',
  client: 'cliente1',
  concept: 'Pago de factura A-123',
  paymentMethod: 'transferencia',
  bankAccount: 'banco1',
  bankReference: 'REF-001',
  entries: [...]
})
```

#### Vincular factura automáticamente
```typescript
const incomePoliciesStore = useIncomePoliciesStore()
const invoice = { id: 'F-001', folio: 'A-123', amount: 50000, date: '2024-02-15' }
incomePoliciesStore.linkInvoice(invoice)
// Genera 3 partidas automáticamente
```

## Integración con Backend

Para conectar con un backend real, modifica las funciones en `useIncomePoliciesActions.ts`:

```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const getIncomePolicies = async (page: number, pageSize: number) => {
  const response = await axiosApiInstance.get('/api/polizas-ingresos', {
    params: { page, pageSize }
  })
  return {
    items: response.data.items.map(mapIncomePolicy),
    total: response.data.total
  }
}

const getAvailableInvoices = async (clientId?: string) => {
  const response = await axiosApiInstance.get('/api/facturas-pendientes', {
    params: { clientId }
  })
  return response.data
}
```

## Mapeo de Datos

### Frontend → Backend
```typescript
{
  date: '2024-03-15',          → fecha: '2024-03-15'
  client: 'cliente1',          → cliente: 'cliente1'
  paymentMethod: 'transfer',   → metodoPago: 'transfer'
  bankAccount: 'banco1',       → cuentaBancaria: 'banco1'
  bankReference: 'REF-001',    → referenciaBancaria: 'REF-001'
  entries: [...]               → partidas: [...]
}
```

## Flujo de Usuario

### Crear Póliza con Vinculación de Factura
1. Usuario hace clic en **"Nueva póliza de ingreso"**
2. Se abre modal con formulario vacío
3. Usuario selecciona **Cliente** (requerido)
4. Usuario hace clic en **"Vincular factura"**
5. Se abre modal secundario con facturas disponibles
6. Usuario selecciona una factura
7. **Sistema genera automáticamente 3 partidas balanceadas:**
   - Cargo a Bancos (Debe)
   - Abono a Clientes (Haber - 86%)
   - IVA Trasladado (Haber - 14%)
8. Usuario puede editar las partidas generadas o agregar más
9. Usuario completa los demás campos (Método de pago, Cuenta bancaria, etc.)
10. Sistema valida que la póliza esté cuadrada
11. Usuario guarda la póliza

### Crear Póliza Manual
1. Usuario hace clic en **"Nueva póliza de ingreso"**
2. Usuario completa todos los campos manualmente
3. Usuario hace clic en **"Agregar partida"** (mínimo 2 veces)
4. Usuario llena los datos de cada partida
5. Sistema valida en tiempo real si la póliza está cuadrada
6. Usuario guarda la póliza

## Características Especiales

1. **Vinculación de facturas**: Genera partidas automáticamente con cálculo de IVA
2. **Validación en tiempo real**: Panel de totales muestra si la póliza está cuadrada
3. **Partidas dinámicas**: Agregar/eliminar partidas sin límite
4. **BaseTable integrada**: Paginación, búsqueda y exportación automáticas
5. **Getters computados**: Totales calculados automáticamente
6. **Validación Zod**: Incluye validación de balance (Debe = Haber)
7. **Mock data realista**: 4 pólizas y 4 facturas de ejemplo

## Diferencias con Pólizas de Diario

- **Cliente requerido**: Campo obligatorio para pólizas de ingresos
- **Método de pago**: Campo específico de ingresos
- **Cuenta bancaria**: Destino del ingreso
- **Referencia bancaria**: Número de referencia del banco
- **Vinculación de facturas**: Funcionalidad exclusiva de ingresos
- **Cálculo automático de IVA**: 14% del monto de la factura

## Próximos Pasos

Para producción:
1. Reemplazar mock data con llamadas API reales
2. Implementar búsqueda de cuentas con autocompletado
3. Agregar validación de facturas ya vinculadas
4. Implementar filtros por cliente y periodo
5. Agregar reporte de ingresos por cliente
6. Implementar conciliación bancaria
7. Agregar notificaciones de cobros pendientes

## Notas Importantes

1. **BaseTable**: Usa el componente BaseTable del proyecto con paginación
2. **Validación estricta**: No permite guardar si Debe ≠ Haber
3. **Cliente requerido**: No se puede vincular factura sin cliente
4. **Partidas mínimas**: Requiere al menos 2 partidas
5. **Mock data**: Todas las operaciones son simuladas
6. **Patrón del proyecto**: Sigue exactamente el patrón establecido

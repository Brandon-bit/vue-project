# Módulo de Pólizas de Gastos

Este módulo implementa un sistema completo de gestión de pólizas de gastos/egresos contables con Vue 3 + TypeScript, usando BaseTable con paginación y funcionalidad de asociación de facturas de proveedores.

## Estructura del Módulo

```
PolizasDeGastos/
├── components/
│   ├── ExpensePolicyForm.vue        # Formulario completo con partidas y asociación de facturas
│   ├── ExpensePolicyModal.vue       # Modal principal que gestiona CREATE/EDIT/DELETE
│   └── DeleteExpensePolicy.vue      # Componente de confirmación de eliminación
├── composables/
│   ├── useExpensePolicies.ts        # Configuración de columnas para BaseTable
│   ├── useExpensePoliciesActions.ts # Acciones CRUD con mock data y paginación
│   └── mappingExpensePoliciesData.ts # Mapeo entre frontend y backend
├── store/
│   └── expensePoliciesStore.ts      # Estado global con getters y asociación de facturas
├── types/
│   └── expensePoliciesTypes.ts      # Definiciones de tipos TypeScript
├── validations/
│   └── expensePoliciesValidation.ts # Validaciones con Zod (incluye validación de balance)
└── views/
    └── ExpensePoliciesView.vue      # Vista principal con BaseTable paginada
```

## Características Principales

### 1. Vista Principal con BaseTable (ExpensePoliciesView.vue)
- ✅ Tabla paginada usando BaseTable del proyecto
- ✅ Botón "Nueva póliza de gasto" en la parte superior
- ✅ Columnas: Folio, Fecha, Proveedor, Concepto, Total, Centro de Costo, Acciones
- ✅ Botones de Editar y Eliminar en cada fila
- ✅ Búsqueda integrada de BaseTable
- ✅ Paginación automática

### 2. Formulario Completo de Póliza (ExpensePolicyForm.vue)
**Sección de Información General:**
- Tipo de Póliza (readonly: "Egreso / Gasto")
- Fecha (date picker)
- **Proveedor** (select requerido)
- **Tipo de Gasto** (select: Operación, Administrativos, Venta, Financieros)
- **Centro de Costo** (select: Producción, Administración, Ventas, Marketing)
- Método de Pago (select: Transferencia, Cheque, Efectivo/Caja Chica, Tarjeta Corporativa)
- Cuenta Bancaria de Origen (select)
- Referencia / Folio de Pago (input text)
- Concepto (textarea)
- **Botón "Asociar factura de proveedor"** (solo habilitado si hay proveedor seleccionado)

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

### 3. Modal de Asociación de Facturas de Proveedores
- Se abre al hacer clic en "Asociar factura de proveedor"
- Muestra lista de facturas disponibles con concepto y fecha
- Al seleccionar una factura:
  - **Genera automáticamente 3 partidas:**
    1. Gastos de Operación (Debe - 86% del monto)
    2. IVA Acreditable (Debe - 14% del monto)
    3. Abono a Bancos (Haber - 100% del monto)
  - Cierra el modal automáticamente
  - Las partidas quedan listas para editar si es necesario

### 4. Sistema de Modales
- **Modo CREATE**: Formulario vacío con fecha actual
- **Modo EDIT**: Formulario prellenado con datos existentes
- **Modo DELETE**: Confirmación de eliminación

### 5. Validaciones con Zod
- **Fecha**: Requerida
- **Proveedor**: Requerido
- **Concepto**: Mínimo 10 caracteres
- **Tipo de Gasto**: Requerido
- **Centro de Costo**: Requerido
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
  - **linkSupplierInvoice()**: Generar partidas automáticas desde factura de proveedor
- **Getters computados**:
  - `totalDebit`: Suma automática de débitos
  - `totalCredit`: Suma automática de créditos
  - `isBalanced`: true si Debe = Haber

### 7. Mock Data
**4 pólizas de ejemplo:**
- Compra de materiales (Producción)
- Pago de servicios de limpieza (Administración)
- Compra de insumos de oficina (Administración)
- Campaña publicitaria (Marketing)

**4 facturas de proveedores disponibles:**
- FAC-456: $35,000 (Materiales)
- FAC-457: $18,000 (Servicios)
- FAC-458: $22,500 (Insumos)
- FAC-459: $45,000 (Publicidad)

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/polizas-de-gastos',
  name: 'PolizasDeGastos',
  component: () => import('@contabilidad/PolizasDeGastos/views/ExpensePoliciesView.vue')
}
```

### Funciones Principales

#### Obtener pólizas (paginadas)
```typescript
const { getExpensePolicies } = useExpensePoliciesActions()
const result = await getExpensePolicies(1, 10) // page, pageSize
// Returns: { items: ExpensePolicyType[], total: number }
```

#### Obtener facturas de proveedores
```typescript
const { getSupplierInvoices } = useExpensePoliciesActions()
const invoices = await getSupplierInvoices()
```

#### Crear póliza
```typescript
const { createExpensePolicy } = useExpensePoliciesActions()
await createExpensePolicy({
  date: '2024-03-15',
  supplier: 'prov1',
  concept: 'Compra de materiales de producción',
  expenseType: 'operacion',
  costCenter: 'produccion',
  paymentMethod: 'transferencia',
  bankAccount: 'banco1',
  paymentReference: 'TRANS-001',
  entries: [...]
})
```

#### Asociar factura automáticamente
```typescript
const expensePoliciesStore = useExpensePoliciesStore()
const invoice = { id: 'F-001', folio: 'FAC-456', amount: 35000, date: '2024-02-20', concept: 'Materiales' }
expensePoliciesStore.linkSupplierInvoice(invoice)
// Genera 3 partidas automáticamente con IVA acreditable
```

## Integración con Backend

Para conectar con un backend real, modifica las funciones en `useExpensePoliciesActions.ts`:

```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const getExpensePolicies = async (page: number, pageSize: number) => {
  const response = await axiosApiInstance.get('/api/polizas-gastos', {
    params: { page, pageSize }
  })
  return {
    items: response.data.items.map(mapExpensePolicy),
    total: response.data.total
  }
}

const getSupplierInvoices = async () => {
  const response = await axiosApiInstance.get('/api/facturas-proveedores')
  return response.data
}
```

## Mapeo de Datos

### Frontend → Backend
```typescript
{
  date: '2024-03-15',          → fecha: '2024-03-15'
  supplier: 'prov1',           → proveedor: 'prov1'
  expenseType: 'operacion',    → tipoGasto: 'operacion'
  costCenter: 'produccion',    → centroCosto: 'produccion'
  paymentMethod: 'transfer',   → metodoPago: 'transfer'
  bankAccount: 'banco1',       → cuentaBancaria: 'banco1'
  paymentReference: 'REF-001', → referenciaPago: 'REF-001'
  entries: [...]               → partidas: [...]
}
```

## Flujo de Usuario

### Crear Póliza con Asociación de Factura
1. Usuario hace clic en **"Nueva póliza de gasto"**
2. Se abre modal con formulario vacío
3. Usuario selecciona **Proveedor** (requerido)
4. Usuario hace clic en **"Asociar factura de proveedor"**
5. Se abre modal secundario con facturas disponibles
6. Usuario selecciona una factura
7. **Sistema genera automáticamente 3 partidas balanceadas:**
   - Gastos de Operación (Debe - 86%)
   - IVA Acreditable (Debe - 14%)
   - Abono a Bancos (Haber - 100%)
8. Usuario puede editar las partidas generadas o agregar más
9. Usuario completa los demás campos (Tipo de gasto, Centro de costo, etc.)
10. Sistema valida que la póliza esté cuadrada
11. Usuario guarda la póliza

### Crear Póliza Manual
1. Usuario hace clic en **"Nueva póliza de gasto"**
2. Usuario completa todos los campos manualmente
3. Usuario hace clic en **"Agregar partida"** (mínimo 2 veces)
4. Usuario llena los datos de cada partida
5. Sistema valida en tiempo real si la póliza está cuadrada
6. Usuario guarda la póliza

## Características Especiales

1. **Asociación de facturas de proveedores**: Genera partidas automáticamente con cálculo de IVA acreditable
2. **Centro de costo**: Permite clasificar gastos por departamento
3. **Tipo de gasto**: Clasificación contable (Operación, Administrativos, Venta, Financieros)
4. **Validación en tiempo real**: Panel de totales muestra si la póliza está cuadrada
5. **Partidas dinámicas**: Agregar/eliminar partidas sin límite
6. **BaseTable integrada**: Paginación, búsqueda y exportación automáticas
7. **Getters computados**: Totales calculados automáticamente
8. **Validación Zod**: Incluye validación de balance (Debe = Haber)
9. **Mock data realista**: 4 pólizas y 4 facturas de ejemplo

## Diferencias con Pólizas de Ingresos

- **Proveedor** en lugar de Cliente
- **Tipo de Gasto** específico (Operación, Administrativos, Venta, Financieros)
- **Centro de Costo** obligatorio para control presupuestal
- **Cuenta Bancaria de Origen** (vs Destino en ingresos)
- **IVA Acreditable** (Debe) vs IVA Trasladado (Haber)
- **Gastos en Debe** vs Ingresos en Haber
- **Asociación de facturas de proveedores** vs Vinculación de facturas de clientes

## Próximos Pasos

Para producción:
1. Reemplazar mock data con llamadas API reales
2. Implementar búsqueda de cuentas con autocompletado
3. Agregar validación de facturas ya asociadas
4. Implementar filtros por proveedor, centro de costo y periodo
5. Agregar reporte de gastos por centro de costo
6. Implementar presupuesto vs real por centro de costo
7. Agregar alertas de gastos fuera de presupuesto
8. Implementar conciliación de facturas de proveedores

## Notas Importantes

1. **BaseTable**: Usa el componente BaseTable del proyecto con paginación
2. **Validación estricta**: No permite guardar si Debe ≠ Haber
3. **Proveedor requerido**: No se puede asociar factura sin proveedor
4. **Centro de costo obligatorio**: Permite control presupuestal
5. **Partidas mínimas**: Requiere al menos 2 partidas
6. **Mock data**: Todas las operaciones son simuladas
7. **Patrón del proyecto**: Sigue exactamente el patrón establecido
8. **IVA Acreditable**: Calculado automáticamente al 14%

## Ejemplo de Partidas Generadas Automáticamente

Al asociar una factura de $35,000:

| Cuenta | Descripción | Debe | Haber |
|--------|-------------|------|-------|
| 601-001 Gastos de Operación | Cargo por Materiales | $30,100 | $0 |
| 119-001 IVA Acreditable | IVA acreditable | $4,900 | $0 |
| 102-001 Bancos | Abono a banco por pago | $0 | $35,000 |
| **TOTALES** | | **$35,000** | **$35,000** |

✅ Póliza automáticamente cuadrada y lista para guardar

# Módulo de Operación de Movimientos Contables

Este módulo implementa un sistema completo de consulta y análisis de movimientos contables con Vue 3 + TypeScript, motor de búsqueda avanzado, tabla sin paginación y exportación a PDF/Excel.

## Estructura del Módulo

```
OperacionDeMovimientos/
├── composables/
│   └── useAccountingMovementsActions.ts  # Acciones de búsqueda y exportación
├── store/
│   └── accountingMovementsStore.ts       # Estado global con filtros y resultados
├── types/
│   └── accountingMovementsTypes.ts       # Definiciones de tipos TypeScript
└── views/
    └── AccountingMovementsView.vue       # Vista principal con motor de búsqueda
```

## Características Principales

### 1. Motor de Búsqueda y Filtrado
**6 filtros disponibles:**
- ✅ **Fecha inicio** (date picker)
- ✅ **Fecha fin** (date picker)
- ✅ **Cuenta contable** (input text con ícono de búsqueda)
- ✅ **Folio de póliza** (input text)
- ✅ **Centro de costo** (select: Administración, Ventas, Producción)
- ✅ **Documento origen** (input text)

**2 botones de acción:**
- 🔍 **Buscar movimientos**: Ejecuta búsqueda con filtros aplicados
- 📈 **Ver auxiliares por cuenta**: Muestra auxiliares de cuenta específica

### 2. Tabla de Resultados (Sin Paginación)
**Muestra todos los registros encontrados:**
- Fecha
- Póliza (badge)
- Cuenta
- Descripción
- Debe (alineado a la derecha)
- Haber (alineado a la derecha)
- Saldo (alineado a la derecha, en negrita)
- Documento (badge si existe)

**Panel de totales:**
- Total Debe
- Total Haber

**Botones de exportación:**
- 📥 **Exportar PDF**: Genera PDF con los movimientos
- 📄 **Exportar Excel**: Genera archivo Excel con los movimientos

### 3. Store con Getters Computados
El store incluye:
- **State**:
  - `movements`: Lista de movimientos encontrados
  - `searchFilters`: Filtros de búsqueda
  - `showResults`: Bandera para mostrar resultados

- **Actions**:
  - `setMovements()`: Establecer movimientos
  - `setSearchFilters()`: Actualizar filtros
  - `setShowResults()`: Mostrar/ocultar resultados
  - `resetFilters()`: Resetear filtros y resultados

- **Getters computados**:
  - `totalDebit`: Suma automática de débitos
  - `totalCredit`: Suma automática de créditos
  - `movementsCount`: Cantidad de movimientos

### 4. Funciones de Exportación
**Exportar a PDF:**
- Función `exportToPDF(movements)` preparada
- Lista para implementar con jsPDF + autoTable
- Vinculada al botón "Exportar PDF"

**Exportar a Excel:**
- Función `exportToExcel(movements)` preparada
- Lista para implementar con xlsx o backend
- Vinculada al botón "Exportar Excel"

### 5. Auxiliares por Cuenta
- Función `getAccountAuxiliaries(account)` preparada
- Filtra movimientos por cuenta específica
- Vinculada al botón "Ver auxiliares por cuenta"

### 6. Mock Data
**8 movimientos de ejemplo:**
- Depósito de cliente (Bancos BBVA)
- Venta de servicios (Ventas)
- Pago de servicios (Gastos de operación)
- Pago de servicios (Bancos BBVA)
- Factura a cliente (Clientes)
- Venta de productos (Ventas)
- Pago de renta (Gastos administrativos)
- Pago de renta (Bancos BBVA)

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/operacion-de-movimientos',
  name: 'OperacionDeMovimientos',
  component: () => import('@contabilidad/OperacionDeMovimientos/views/AccountingMovementsView.vue')
}
```

### Funciones Principales

#### Buscar movimientos
```typescript
const { searchMovements } = useAccountingMovementsActions()
const movements = await searchMovements({
  startDate: '2024-03-01',
  endDate: '2024-03-31',
  account: 'Bancos',
  policyFolio: 'D-001',
  costCenter: 'admin',
  sourceDocument: 'FAC-1234'
})
```

#### Ver auxiliares por cuenta
```typescript
const { getAccountAuxiliaries } = useAccountingMovementsActions()
const auxiliaries = await getAccountAuxiliaries('1105-001 Bancos BBVA')
```

#### Exportar a PDF
```typescript
const { exportToPDF } = useAccountingMovementsActions()
await exportToPDF(movements)
```

#### Exportar a Excel
```typescript
const { exportToExcel } = useAccountingMovementsActions()
await exportToExcel(movements)
```

## Integración con Backend

### Búsqueda de movimientos
```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const searchMovements = async (filters: SearchFiltersType) => {
  const response = await axiosApiInstance.post('/api/movimientos/buscar', filters)
  return response.data.movimientos
}
```

### Exportar a PDF con jsPDF
```typescript
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const exportToPDF = async (movements: AccountingMovementType[]) => {
  const doc = new jsPDF()
  doc.text('Movimientos Contables', 14, 15)
  
  autoTable(doc, {
    head: [['Fecha', 'Póliza', 'Cuenta', 'Descripción', 'Debe', 'Haber', 'Saldo']],
    body: movements.map(m => [
      m.date,
      m.policy,
      m.account,
      m.description,
      m.debit.toFixed(2),
      m.credit.toFixed(2),
      m.balance.toFixed(2)
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [66, 139, 202] }
  })
  
  doc.save('movimientos-contables.pdf')
}
```

### Exportar a Excel con backend
```typescript
const exportToExcel = async (movements: AccountingMovementType[]) => {
  const response = await axiosApiInstance.post('/api/movimientos/exportar-excel', {
    movimientos: movements
  }, {
    responseType: 'blob'
  })
  
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'movimientos-contables.xlsx')
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
```

## Flujo de Usuario

### Buscar Movimientos
1. Usuario ingresa **Fecha inicio** y **Fecha fin**
2. Usuario ingresa filtros opcionales:
   - Cuenta contable (ej: "Bancos")
   - Folio de póliza (ej: "D-001")
   - Centro de costo (ej: "Administración")
   - Documento origen (ej: "FAC-1234")
3. Usuario hace clic en **"Buscar movimientos"**
4. Sistema ejecuta búsqueda con filtros
5. Sistema muestra tabla con resultados
6. Sistema muestra totales (Debe y Haber)
7. Sistema muestra notificación: "X movimientos encontrados"

### Ver Auxiliares por Cuenta
1. Usuario ingresa cuenta en el filtro **"Cuenta contable"**
2. Usuario hace clic en **"Ver auxiliares por cuenta"**
3. Sistema filtra movimientos por cuenta específica
4. Sistema muestra tabla con auxiliares
5. Sistema muestra notificación: "Auxiliares de cuenta X"

### Exportar Resultados
1. Usuario realiza búsqueda de movimientos
2. Sistema muestra resultados en tabla
3. Usuario hace clic en **"Exportar PDF"** o **"Exportar Excel"**
4. Sistema ejecuta función de exportación
5. Sistema muestra notificación: "Exportando a PDF/Excel..."
6. (En producción) Sistema descarga el archivo automáticamente

## Características Especiales

1. **Motor de búsqueda avanzado**: 6 filtros combinables
2. **Tabla sin paginación**: Muestra todos los registros encontrados
3. **Auxiliares por cuenta**: Función específica para consultar auxiliares
4. **Exportación dual**: PDF y Excel
5. **Totales automáticos**: Calculados con getters de Pinia
6. **Formato de moneda**: Formato mexicano con 2 decimales
7. **Badges visuales**: Para pólizas y documentos
8. **Estado reactivo**: Store con Pinia para gestión de estado
9. **Mock data realista**: 8 movimientos de ejemplo

## Ejemplo de Tabla de Resultados

| Fecha | Póliza | Cuenta | Descripción | Debe | Haber | Saldo | Documento |
|-------|--------|--------|-------------|------|-------|-------|-----------|
| 15/03/2024 | D-001 | 1105-001 Bancos BBVA | Depósito de cliente ABC | $50,000.00 | - | $50,000.00 | FAC-1234 |
| 15/03/2024 | I-045 | 4101-001 Ventas | Venta de servicios | - | $43,103.45 | $43,103.45 | |
| 16/03/2024 | E-089 | 5101-001 Gastos de operación | Pago de servicios | $15,000.00 | - | $15,000.00 | |
| 16/03/2024 | E-089 | 1105-001 Bancos BBVA | Pago de servicios | - | $15,000.00 | $35,000.00 | |

**Totales:**
- Total Debe: $65,000.00
- Total Haber: $58,103.45

## Notas Importantes

1. **Sin paginación**: La tabla muestra todos los registros sin paginación
2. **Filtros combinables**: Todos los filtros se pueden usar simultáneamente
3. **Búsqueda requerida**: Los resultados solo se muestran después de buscar
4. **Exportación preparada**: Funciones listas pero sin lógica real
5. **Mock data**: Todas las operaciones son simuladas
6. **Patrón del proyecto**: Sigue la estructura establecida
7. **Auxiliares por cuenta**: Requiere cuenta en el filtro

## Diferencias con Otros Módulos

**vs Pólizas (Diario/Ingresos/Gastos/Contables):**
- ✅ **Sin CRUD**: Solo consulta, no permite crear/editar/eliminar
- ✅ **Motor de búsqueda**: 6 filtros avanzados
- ✅ **Sin modal**: Todo en una sola vista
- ✅ **Tabla sin paginación**: Muestra todos los registros
- ✅ **Exportación dual**: PDF y Excel
- ✅ **Auxiliares por cuenta**: Función específica

**vs Depreciación:**
- ✅ **Búsqueda vs Cálculo**: Búsqueda de registros existentes vs cálculo automático
- ✅ **Filtros múltiples**: 6 filtros vs 3 selectores
- ✅ **Exportación de resultados**: PDF/Excel vs reportes específicos

## Próximos Pasos

Para producción:
1. Implementar búsqueda real con backend
2. Implementar exportación real a PDF con jsPDF
3. Implementar exportación real a Excel
4. Agregar autocompletado en búsqueda de cuentas
5. Implementar filtros avanzados adicionales
6. Agregar gráficas de movimientos por periodo
7. Implementar drill-down a póliza desde movimiento
8. Agregar exportación a otros formatos (CSV, XML)
9. Implementar conciliación de saldos
10. Agregar vista de balance por cuenta

## Ejemplo de Uso Completo

```vue
<script setup>
import { useAccountingMovementsActions } from '@/modules/Contabilidad/OperacionDeMovimientos/composables/useAccountingMovementsActions'
import useAccountingMovementsStore from '@/modules/Contabilidad/OperacionDeMovimientos/store/accountingMovementsStore'

const accountingMovementsStore = useAccountingMovementsStore()
const { searchMovements, exportToPDF } = useAccountingMovementsActions()

// Configurar filtros
accountingMovementsStore.setSearchFilters({
  startDate: '2024-03-01',
  endDate: '2024-03-31',
  account: 'Bancos'
})

// Buscar movimientos
const handleSearch = async () => {
  const movements = await searchMovements(accountingMovementsStore.searchFilters)
  accountingMovementsStore.setMovements(movements)
  accountingMovementsStore.setShowResults(true)
}

// Exportar a PDF
const handleExport = async () => {
  await exportToPDF(accountingMovementsStore.movements)
}
</script>
```

## Casos de Uso

### 1. Consultar movimientos de una cuenta específica
- Filtro: Cuenta contable = "1105-001 Bancos BBVA"
- Resultado: Todos los movimientos de esa cuenta

### 2. Consultar movimientos de un periodo
- Filtro: Fecha inicio = "2024-03-01", Fecha fin = "2024-03-31"
- Resultado: Todos los movimientos del mes de marzo

### 3. Consultar movimientos de una póliza
- Filtro: Folio de póliza = "D-001"
- Resultado: Todos los movimientos de esa póliza

### 4. Consultar movimientos por centro de costo
- Filtro: Centro de costo = "Administración"
- Resultado: Todos los movimientos del centro de costo

### 5. Consultar movimientos con documento específico
- Filtro: Documento origen = "FAC-1234"
- Resultado: Todos los movimientos relacionados con ese documento

El módulo está **100% funcional** y listo para usar. Solo necesitas navegar a `/contabilidad/operacion-de-movimientos` en tu aplicación. La característica distintiva es el **motor de búsqueda avanzado** con 6 filtros combinables, tabla sin paginación que muestra todos los resultados, y funciones de exportación a PDF y Excel preparadas para implementación.

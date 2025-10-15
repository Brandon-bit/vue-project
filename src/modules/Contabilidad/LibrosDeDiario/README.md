# Módulo de Libros de Diario

Este módulo implementa un sistema completo de generación de libros diarios contables con Vue 3 + TypeScript.

## Estructura del Módulo

```
LibrosDeDiario/
├── composables/
│   ├── useJournalBooks.ts           # Helpers y utilidades para formateo
│   ├── useJournalBooksActions.ts    # Acciones de generación y exportación con mock data
│   └── mappingJournalBooksData.ts   # Mapeo entre frontend y backend
├── store/
│   └── journalBooksStore.ts         # Estado global con Pinia (filtros, entradas, totales)
├── types/
│   └── journalBooksTypes.ts         # Definiciones de tipos TypeScript
├── validations/
│   └── journalBooksValidation.ts    # Validaciones con Zod
└── views/
    └── JournalBooksView.vue         # Vista principal con filtros y tabla
```

## Características Principales

### 1. Vista Principal (JournalBooksView.vue)
- ✅ Formulario de parámetros de generación (Mes, Año, Tipo de póliza)
- ✅ Botón "Generar libro diario del periodo"
- ✅ Vista previa condicional (solo se muestra después de generar)
- ✅ Tabla con todas las entradas del periodo
- ✅ Panel de totales (Debe, Haber, Diferencia)
- ✅ Botones de exportación (PDF, Excel, Imprimir)
- ✅ Mensaje de validación fiscal

### 2. Filtros de Generación
- **Mes**: Select con todos los meses del año
- **Año**: Select con años disponibles (2021-2024)
- **Tipo de póliza**: Select opcional (Todas, Diario, Ingresos, Egresos)

### 3. Tabla de Entradas
Columnas incluidas:
- **Fecha**: Formato dd/mm/yyyy
- **Folio**: Badge con número de póliza
- **Tipo**: Badge con color según tipo (Ingreso=verde, Egreso=rojo, Diario=gris)
- **Concepto**: Descripción de la operación
- **Cuenta**: Código y nombre de cuenta
- **Debe**: Monto formateado o "-"
- **Haber**: Monto formateado o "-"

### 4. Panel de Totales
- **Total Debe**: Suma de todos los débitos
- **Total Haber**: Suma de todos los créditos
- **Diferencia**: Debe - Haber (verde si es 0, rojo si no)

### 5. Mock Data
El archivo `useJournalBooksActions.ts` incluye 12 entradas de ejemplo:
- Ajustes de depreciación
- Cobros de facturas
- Pagos de nómina
- Ventas de mercancía
- Pagos de servicios
- Ajustes cambiarios

### 6. Store con Getters
El store incluye getters computados para:
- `totalDebit`: Suma automática de débitos
- `totalCredit`: Suma automática de créditos
- `difference`: Diferencia entre debe y haber

### 7. Validaciones con Zod
- Mes: Requerido
- Año: Requerido
- Tipo de póliza: Opcional

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/libros-diario',
  name: 'LibrosDiario',
  component: () => import('@/modules/Contabilidad/LibrosDeDiario/views/JournalBooksView.vue')
}
```

### Funciones Principales

#### Generar libro diario
```typescript
const { generateJournalBook } = useJournalBooksActions()
const result = await generateJournalBook({
  month: '03',
  year: '2024',
  policyType: 'todas'
})
```

#### Exportar a PDF
```typescript
const { exportJournalBookPDF } = useJournalBooksActions()
await exportJournalBookPDF()
```

#### Exportar a Excel
```typescript
const { exportJournalBookExcel } = useJournalBooksActions()
await exportJournalBookExcel()
```

#### Imprimir
```typescript
const { printJournalBook } = useJournalBooksActions()
await printJournalBook()
```

## Integración con Backend

Para conectar con un backend real, modifica las funciones en `useJournalBooksActions.ts`:

```typescript
// Ejemplo de integración real
import axiosApiInstance from '@/api/axiosApiInstance'

const generateJournalBook = async (filters: JournalBookFiltersType) => {
  const response = await axiosApiInstance.post('/api/libros-diario/generar', {
    mes: filters.month,
    ano: filters.year,
    tipoPoliza: filters.policyType
  })
  return {
    totalDebit: response.data.totalDebe,
    totalCredit: response.data.totalHaber,
    difference: response.data.diferencia,
    entries: response.data.entradas.map(mapJournalEntry)
  }
}
```

## Mapeo de Datos

### Frontend → Backend
```typescript
{
  month: '03',           → mes: '03'
  year: '2024',          → ano: '2024'
  policyType: 'todas'    → tipoPoliza: 'todas'
}
```

### Backend → Frontend
```typescript
{
  fecha: '2024-03-15',   → date: '2024-03-15'
  folio: 'D-001',        → folio: 'D-001'
  debe: 15000,           → debit: 15000
  haber: 0               → credit: 0
}
```

## Estilos

La vista utiliza DaisyUI con clases personalizadas:
- `badge-success`: Tipo Ingreso
- `badge-error`: Tipo Egreso
- `badge-secondary`: Tipo Diario
- `alert-success`: Mensaje de validación fiscal

## Flujo de Usuario

1. Usuario selecciona **Mes**, **Año** y opcionalmente **Tipo de póliza**
2. Usuario hace clic en **"Generar libro diario del periodo"**
3. Sistema muestra loading spinner
4. Sistema genera el libro y muestra la tabla con las entradas
5. Usuario puede:
   - Ver todas las entradas del periodo
   - Revisar los totales
   - Exportar a PDF
   - Exportar a Excel
   - Imprimir

## Características Especiales

1. **Validación fiscal**: Muestra mensaje de cumplimiento normativo
2. **Totales automáticos**: Calculados con getters de Pinia
3. **Diferencia destacada**: Color verde si cuadra (0.00), rojo si no
4. **Filtrado por tipo**: Permite generar solo Ingresos, Egresos o Diario
5. **Mock data realista**: Incluye diferentes tipos de pólizas

## Próximos Pasos

Para producción:
1. Reemplazar mock data con llamadas API reales
2. Implementar exportación real a PDF con jsPDF
3. Implementar exportación real a Excel con XLSX
4. Agregar paginación si hay muchas entradas
5. Implementar búsqueda/filtrado en la tabla
6. Agregar validación de periodo cerrado
7. Implementar firma digital del libro

## Notas Importantes

1. **Sin modales**: Todo se muestra en la misma vista
2. **Generación condicional**: La tabla solo aparece después de generar
3. **Mock data**: Todas las operaciones son simuladas
4. **Validación completa**: Formulario validado con Zod + vee-validate
5. **Patrón del proyecto**: Sigue el patrón establecido en el módulo

# Módulo de Pólizas de Diario

Este módulo implementa un sistema completo de gestión de pólizas de diario contables con Vue 3 + TypeScript, usando BaseTable con paginación.

## Estructura del Módulo

```
PolizasDeDiario/
├── components/
│   ├── JournalPolicyForm.vue        # Formulario completo con partidas dinámicas
│   ├── JournalPolicyModal.vue       # Modal principal que gestiona CREATE/EDIT/DELETE
│   └── DeleteJournalPolicy.vue      # Componente de confirmación de eliminación
├── composables/
│   ├── useJournalPolicies.ts        # Configuración de columnas para BaseTable
│   ├── useJournalPoliciesActions.ts # Acciones CRUD con mock data y paginación
│   └── mappingJournalPoliciesData.ts # Mapeo entre frontend y backend
├── store/
│   └── journalPoliciesStore.ts      # Estado global con getters para totales
├── types/
│   └── journalPoliciesTypes.ts      # Definiciones de tipos TypeScript
├── validations/
│   └── journalPoliciesValidation.ts # Validaciones con Zod (incluye validación de balance)
└── views/
    └── JournalPoliciesView.vue      # Vista principal con BaseTable paginada
```

## Características Principales

### 1. Vista Principal con BaseTable (JournalPoliciesView.vue)
- ✅ Tabla paginada usando BaseTable del proyecto
- ✅ Botón "Crear póliza de diario" en la parte superior
- ✅ Columnas: Folio, Fecha, Concepto, Total, Usuario, Acciones
- ✅ Botones de Editar y Eliminar en cada fila
- ✅ Búsqueda integrada de BaseTable
- ✅ Paginación automática (5, 10, 20, 100 registros)

### 2. Formulario Dinámico de Póliza (JournalPolicyForm.vue)
**Sección de Información General:**
- Tipo de Póliza (readonly: "Diario")
- Fecha (date picker)
- Concepto (textarea)

**Sección de Partidas Contables:**
- Tabla dinámica de partidas
- Botón "Agregar partida" para añadir filas
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
  - ✅ Verde con check: "Póliza Cuadrada" (Debe = Haber)
  - ❌ Rojo con error: "Diferencia: $X.XX" (Debe ≠ Haber)

### 3. Sistema de Modales
- **Modo CREATE**: Formulario vacío con fecha actual
- **Modo EDIT**: Formulario prellenado con datos existentes
- **Modo DELETE**: Confirmación de eliminación

### 4. Validaciones con Zod
- **Fecha**: Requerida
- **Concepto**: Mínimo 10 caracteres
- **Partidas**: 
  - Mínimo 2 partidas requeridas
  - Cada partida debe tener cuenta y descripción
  - **Validación de balance**: Debe = Haber (con tolerancia de 0.01)

### 5. Store con Getters
El store incluye:
- **Actions**: addEntry(), removeEntry(), updateEntry()
- **Getters computados**:
  - `totalDebit`: Suma automática de débitos
  - `totalCredit`: Suma automática de créditos
  - `isBalanced`: true si Debe = Haber

### 6. Mock Data
6 pólizas de ejemplo que incluyen:
- Ajustes de depreciación
- Reclasificación de gastos
- Ajustes cambiarios
- Provisión de impuestos
- Ajustes de inventario
- Provisión de cuentas incobrables

Cada póliza incluye 2 partidas (debe y haber) que cuadran perfectamente.

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/polizas-de-diario',
  name: 'PolizasDiario',
  component: () => import('@contabilidad/PolizasDeDiario/views/JournalPoliciesView.vue')
}
```

### Funciones Principales

#### Obtener pólizas (paginadas)
```typescript
const { getJournalPolicies } = useJournalPoliciesActions()
const result = await getJournalPolicies(1, 10) // page, pageSize
// Returns: { items: JournalPolicyType[], total: number }
```

#### Crear póliza
```typescript
const { createJournalPolicy } = useJournalPoliciesActions()
await createJournalPolicy({
  date: '2024-03-15',
  concept: 'Ajuste de depreciación mensual',
  entries: [
    { id: '1', account: '5201-001', description: 'Depreciación', debit: 15000, credit: 0, reference: 'DEP-001' },
    { id: '2', account: '1201-002', description: 'Contrapartida', debit: 0, credit: 15000, reference: 'DEP-001' }
  ]
})
```

#### Agregar partida dinámicamente
```typescript
const journalPoliciesStore = useJournalPoliciesStore()
journalPoliciesStore.addEntry() // Agrega una nueva fila vacía
```

## Integración con Backend

Para conectar con un backend real, modifica las funciones en `useJournalPoliciesActions.ts`:

```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const getJournalPolicies = async (page: number, pageSize: number) => {
  const response = await axiosApiInstance.get('/api/polizas-diario', {
    params: { page, pageSize }
  })
  return {
    items: response.data.items.map(mapJournalPolicy),
    total: response.data.total
  }
}
```

## Mapeo de Datos

### Frontend → Backend
```typescript
{
  date: '2024-03-15',        → fecha: '2024-03-15'
  concept: 'Ajuste...',      → concepto: 'Ajuste...'
  entries: [...]             → partidas: [...]
}
```

### Partida Frontend → Backend
```typescript
{
  account: '5201-001',       → cuenta: '5201-001'
  description: 'Dep...',     → descripcion: 'Dep...'
  debit: 15000,              → debe: 15000
  credit: 0,                 → haber: 0
  reference: 'DEP-001'       → referencia: 'DEP-001'
}
```

## Flujo de Usuario

### Crear Póliza
1. Usuario hace clic en **"Crear póliza de diario"**
2. Se abre modal con formulario vacío
3. Usuario completa fecha y concepto
4. Usuario hace clic en **"Agregar partida"** (mínimo 2 veces)
5. Usuario llena los datos de cada partida
6. Sistema valida en tiempo real si la póliza está cuadrada
7. Botón "Aceptar" solo se habilita si Debe = Haber
8. Usuario guarda la póliza

### Editar Póliza
1. Usuario hace clic en botón "Editar" de una fila
2. Se abre modal con datos prellenados
3. Usuario modifica partidas (agregar, eliminar, editar)
4. Sistema valida balance en tiempo real
5. Usuario guarda cambios

### Eliminar Póliza
1. Usuario hace clic en botón "Eliminar" de una fila
2. Se abre modal de confirmación
3. Usuario confirma eliminación

## Características Especiales

1. **Validación en tiempo real**: El panel de totales muestra si la póliza está cuadrada
2. **Partidas dinámicas**: Agregar/eliminar partidas sin límite
3. **BaseTable integrada**: Paginación, búsqueda y exportación automáticas
4. **Getters computados**: Totales calculados automáticamente
5. **Validación Zod**: Incluye validación de balance (Debe = Haber)
6. **Mock data realista**: 6 pólizas con partidas que cuadran

## Diferencias con otros módulos

- **Usa BaseTable**: A diferencia de Catálogo de Cuentas (tabla custom)
- **Formulario complejo**: Tabla dinámica de partidas dentro del modal
- **Validación de balance**: Validación especial para asegurar que Debe = Haber
- **Store con actions**: Métodos para manipular partidas dinámicamente

## Próximos Pasos

Para producción:
1. Reemplazar mock data con llamadas API reales
2. Implementar búsqueda de cuentas con autocompletado
3. Agregar validación de cuentas existentes
4. Implementar vista detalle de póliza
5. Agregar impresión de póliza individual
6. Implementar duplicar póliza
7. Agregar filtros por fecha y usuario

## Notas Importantes

1. **BaseTable**: Usa el componente BaseTable del proyecto con paginación
2. **Validación estricta**: No permite guardar si Debe ≠ Haber
3. **Partidas mínimas**: Requiere al menos 2 partidas
4. **Mock data**: Todas las operaciones son simuladas
5. **Patrón del proyecto**: Sigue exactamente el patrón de Categorías

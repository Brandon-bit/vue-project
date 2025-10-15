# Módulo de Catálogo de Cuentas

Este módulo implementa un sistema completo de gestión de catálogo de cuentas contables con Vue 3 + TypeScript.

## Estructura del Módulo

```
CatalogoDeCuentas/
├── components/
│   ├── AccountForm.vue              # Formulario para crear/editar cuentas
│   ├── AccountCatalogModal.vue      # Modal principal que gestiona CREATE/EDIT/DELETE
│   └── DeleteAccount.vue            # Componente de confirmación de eliminación
├── composables/
│   ├── useAccountCatalog.ts         # Lógica de UI y helpers para la tabla
│   ├── useAccountCatalogActions.ts  # Acciones CRUD con mock data
│   └── mappingAccountsCatalogData.ts # Mapeo entre frontend y backend
├── store/
│   └── accountsCatalogStore.ts      # Estado global con Pinia
├── types/
│   └── accountsCatalogTypes.ts      # Definiciones de tipos TypeScript
├── validations/
│   └── accountsCatalogValidation.ts # Validaciones con Zod
└── views/
    └── AccountsCatalogView.vue      # Vista principal con tabla accordion
```

## Características Principales

### 1. Vista de Tabla con Accordion (AccountsCatalogView.vue)
- ✅ Tabla jerárquica con 3 niveles de profundidad
- ✅ Funcionalidad de expandir/colapsar subcuentas
- ✅ Búsqueda en tiempo real por código o nombre
- ✅ Estilos similares a BaseTable pero sin paginación
- ✅ Muestra todos los registros existentes
- ✅ Botones de Editar y Eliminar en cada fila
- ✅ Botón "Agregar Cuenta" en la parte superior

### 2. Sistema de Modales
- **Modo CREATE**: Formulario vacío para nueva cuenta
- **Modo EDIT**: Formulario prellenado con datos existentes
- **Modo DELETE**: Confirmación de eliminación

### 3. Formulario de Cuenta (AccountForm.vue)
Campos incluidos:
- **Código**: Input numérico (ej: 1000, 1100, 1101)
- **Nombre**: Nombre de la cuenta
- **Tipo**: Select (Grupo, Subgrupo, Cuenta, Subcuenta)
- **Naturaleza**: Select (Deudora, Acreedora)
- **Nivel**: Select (1-4)
- **Moneda**: Select (MXN, USD, EUR)
- **¿Acepta movimientos?**: Checkbox
- **¿Requiere auxiliar?**: Checkbox
- **¿Cuenta activa?**: Checkbox

### 4. Mock Data
El archivo `useAccountCatalogActions.ts` incluye datos de ejemplo con:
- 3 grupos principales (ACTIVO, PASIVO, CAPITAL)
- Múltiples niveles de subcuentas
- Saldos y configuraciones realistas

### 5. Validaciones con Zod
- Código: Solo números, requerido
- Nombre: Mínimo 3 caracteres
- Todos los selects: Validación de opciones válidas
- Checkboxes: Valores booleanos

## Uso

### Importar en el Router
```typescript
{
  path: '/contabilidad/catalogo-cuentas',
  name: 'CatalogoCuentas',
  component: () => import('@/modules/Contabilidad/CatalogoDeCuentas/views/AccountsCatalogView.vue')
}
```

### Funciones Principales

#### Obtener todas las cuentas
```typescript
const { getAccountsCatalog } = useAccountCatalogActions()
const accounts = await getAccountsCatalog()
```

#### Obtener cuenta por ID
```typescript
const { getAccountById } = useAccountCatalogActions()
const account = await getAccountById('1-1-2')
```

#### Crear cuenta
```typescript
const { createAccount } = useAccountCatalogActions()
await createAccount({
  code: '1103',
  name: 'Inversiones',
  type: 'Cuenta',
  nature: 'Deudora',
  level: 3,
  currency: 'MXN',
  acceptsMovements: true,
  requiresAuxiliary: false,
  active: true
})
```

## Integración con Backend

Para conectar con un backend real, modifica las funciones en `useAccountCatalogActions.ts`:

```typescript
// Ejemplo de integración real
import axiosApiInstance from '@/api/axiosApiInstance'

const getAccountsCatalog = async (): Promise<AccountType[]> => {
  const response = await axiosApiInstance.get('/api/cuentas')
  return response.data.map(mapAccount)
}
```

## Mapeo de Datos

### Frontend → Backend
```typescript
{
  code: '1000',           → codigo: '1000'
  name: 'ACTIVO',         → nombre: 'ACTIVO'
  acceptsMovements: true  → aceptaMovimientos: true
  // etc...
}
```

### Backend → Frontend
El mapeo inverso se realiza automáticamente con `mapAccount()`.

## Estilos

La tabla utiliza DaisyUI con clases personalizadas:
- `badge-primary`: Grupo
- `badge-secondary`: Subgrupo
- `badge-accent`: Cuenta
- `badge-info`: Naturaleza Deudora
- `badge-warning`: Naturaleza Acreedora

## Notas Importantes

1. **Sin paginación**: La tabla muestra todos los registros
2. **Accordion funcional**: Mantiene el estado de expansión durante búsquedas
3. **Mock data**: Todas las operaciones son simuladas con delays realistas
4. **Validación completa**: Formulario validado con Zod + vee-validate
5. **Patrón del proyecto**: Sigue exactamente el patrón de Categorías e Inventario

## Próximos Pasos

Para producción:
1. Reemplazar mock data con llamadas API reales
2. Implementar manejo de errores robusto
3. Agregar tests unitarios
4. Considerar agregar exportación a Excel/PDF
5. Implementar drag & drop para reorganizar cuentas

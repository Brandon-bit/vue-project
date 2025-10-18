# Módulo Contratos y Convenios (Contracts Management)

Módulo para el control y seguimiento de contratos con clientes y proveedores.

## Estructura del Módulo

```
ContratosYConvenios/
├── components/          # Componentes Vue del módulo
│   ├── ContractForm.vue         # Formulario para crear/editar contratos
│   ├── DeleteContract.vue       # Componente para eliminar contratos
│   ├── ContractModal.vue        # Modal principal que gestiona las acciones
│   └── StatsCard.vue            # Tarjeta de estadísticas
│
├── composables/         # Lógica reutilizable
│   ├── mappingContractData.ts   # Mapeo de datos entre API y aplicación
│   └── useContractActions.ts    # Composable para acciones CRUD
│
├── services/            # Servicios de API
│   └── contractService.ts       # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── contractStore.ts         # Store para gestión de estado de contratos
│
├── types/               # Definiciones de TypeScript
│   └── contractTypes.ts         # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── contractValidation.ts    # Validaciones con Zod
│
└── views/               # Vistas principales
    └── ContractView.vue         # Vista principal del módulo
```

## Características Principales

### 1. Dashboard de Estadísticas (3 Tarjetas)

**Tarjeta 1: Contratos Vigentes**
- Valor: 2 contratos
- Subtítulo: "Activos en el sistema"
- Icono: description (gris)
- Sin borde especial

**Tarjeta 2: Próximos a Vencer** ⚠️
- Valor: 1 contrato (amarillo)
- Subtítulo: "Requieren atención"
- Icono: warning (amarillo)
- Borde: amarillo (border-yellow-500/50)

**Tarjeta 3: Contratos Vencidos** 🔴
- Valor: 1 contrato (rojo)
- Subtítulo: "Acción inmediata"
- Icono: event_busy (rojo)
- Borde: rojo (border-error/50)

### 2. Tabla de Contratos con BaseTable

**7 Columnas:**
1. **ID**: Identificador único (font-medium)
2. **Nombre del Contrato**: Descripción completa
3. **Contraparte**: Cliente o proveedor
4. **Tipo**: Badge outline (Servicios, Arrendamiento, Compras, etc.)
5. **Fecha Vencimiento**: Formato local
6. **Monto**: Formato moneda con separadores (alineado a la derecha)
7. **Estado**: Badge con colores según estado

**Estados con Badges:**
- 🟢 **Vigente** (badge-success)
- 🟡 **Próximo a vencer (Xd)** (badge-warning) - Muestra días restantes
- 🔴 **Vencido** (badge-error)

### 3. Búsqueda y Filtros

- **Barra de búsqueda**: Con icono de lupa
- **Placeholder**: "Buscar por ID, nombre, contraparte..."
- **Botón de filtros**: Con icono filter_alt

### 4. Formulario de Nuevo Contrato

Incluye campos:
- ✅ **Nombre del Contrato**: Input texto (requerido, mín. 5 caracteres)
- ✅ **Contraparte**: Input texto (requerido, mín. 3 caracteres)
- ✅ **Tipo de Contrato**: Selector con 7 opciones
  - Servicios
  - Arrendamiento
  - Compras
  - Consultoría
  - Mantenimiento
  - Suministro
  - Otros
- ✅ **Fecha de Inicio**: Input date (requerido)
- ✅ **Fecha de Vencimiento**: Input date (requerido, debe ser posterior a inicio)
- ✅ **Monto del Contrato**: Input number con decimales (requerido, > 0)
- ✅ **Descripción/Notas**: Textarea (4 filas)
- ✅ **Alert informativo**: "El sistema calculará automáticamente..."

### 5. Mock Data (4 Contratos)

**Contrato 1: Vigente**
- ID: CT-2024-001
- Nombre: Contrato de Servicios de Software
- Contraparte: TechSolutions Inc.
- Tipo: Servicios
- Monto: $150,000
- Vencimiento: 2025-01-15
- Estado: Vigente (98 días restantes)

**Contrato 2: Próximo a Vencer** ⚠️
- ID: CT-2024-002
- Nombre: Arrendamiento Oficinas
- Contraparte: Inmobiliaria Central
- Tipo: Arrendamiento
- Monto: $240,000
- Vencimiento: 2024-11-30
- Estado: Próximo a vencer (23 días)

**Contrato 3: Vencido** 🔴
- ID: CT-2024-003
- Nombre: Suministro de Equipos
- Contraparte: Proveedor Global S.A.
- Tipo: Compras
- Monto: $85,000
- Vencimiento: 2024-10-15
- Estado: Vencido (-23 días)

**Contrato 4: Vigente**
- ID: CT-2024-004
- Nombre: Servicios de Consultoría
- Contraparte: Consultores Asociados
- Tipo: Servicios
- Monto: $200,000
- Vencimiento: 2025-02-20
- Estado: Vigente (135 días restantes)

### 6. Validaciones

Esquema de validación con Zod que incluye:
- Nombre requerido (mínimo 5 caracteres)
- Contraparte requerida (mínimo 3 caracteres)
- Tipo requerido
- Fecha de inicio requerida
- Fecha de vencimiento requerida
- Validación personalizada: Fecha vencimiento > Fecha inicio
- Monto requerido (número positivo > 0)
- Descripción opcional

### 7. Tipos de Datos

#### ContractType
```typescript
{
    id?: string
    name: string
    counterpart: string
    type: string
    startDate: Date
    expirationDate: Date
    amount: number
    status: 'vigente' | 'proximo-vencer' | 'vencido'
    daysToExpiration: number
    description?: string
}
```

#### ContractStatsType
```typescript
{
    active: number
    expiringSoon: number
    expired: number
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import ContractView from '@/modules/Administracion/ContratosYConvenios/views/ContractView.vue'
```

### Usar el Store
```typescript
import useContractStore from '@/modules/Administracion/ContratosYConvenios/store/contractStore'

const contractStore = useContractStore()
contractStore.setData(contractData)
```

### Usar las Acciones
```typescript
import { useContractActions } from '@/modules/Administracion/ContratosYConvenios/composables/useContractActions'

const { 
    getContracts, 
    createContract, 
    editContract, 
    deleteContract
} = useContractActions()
```

## Endpoints de API Esperados

- `GET /contratos` - Obtener contratos con filtros
- `POST /contratos` - Crear nuevo contrato
- `PUT /contratos/:id` - Actualizar contrato
- `DELETE /contratos/:id` - Eliminar contrato

## Tipos de Contrato Disponibles

1. Servicios
2. Arrendamiento
3. Compras
4. Consultoría
5. Mantenimiento
6. Suministro
7. Otros

## Estados de Contrato

- **Vigente** (vigente): Contrato activo con más de 30 días para vencer
- **Próximo a vencer** (proximo-vencer): Contrato con menos de 30 días para vencer
- **Vencido** (vencido): Contrato que ya pasó su fecha de vencimiento

## Características Visuales

- **Badges de estado**: Colores distintivos por estado
- **Iconos Material Symbols**: description, warning, event_busy, search, filter_alt
- **Tabla con BaseTable**: Paginación automática
- **Tarjetas con bordes**: Amarillo para advertencia, rojo para error
- **Formato de moneda**: Con separadores de miles
- **Días para vencimiento**: Mostrados en badge de próximo a vencer
- **Búsqueda integrada**: Con icono y placeholder descriptivo

## Funcionalidades Especiales

1. **Alertas visuales**: Tarjetas con bordes de colores para estados críticos
2. **Cálculo automático**: Días para vencimiento y estado del contrato
3. **Validación de fechas**: Fecha de vencimiento debe ser posterior a inicio
4. **Dashboard de métricas**: Estadísticas calculadas en tiempo real
5. **Formato de moneda**: Presentación profesional de montos
6. **Búsqueda avanzada**: Por ID, nombre o contraparte
7. **Tipos predefinidos**: Sistema de categorización de contratos

## Lógica de Negocio

### Cálculo de Estado
El estado del contrato se determina por:
- **Vencido**: `fechaVencimiento < fechaActual`
- **Próximo a vencer**: `0 < diasRestantes <= 30`
- **Vigente**: `diasRestantes > 30`

### Días para Vencimiento
```typescript
diasVencimiento = Math.floor((fechaVencimiento - fechaActual) / (1000 * 60 * 60 * 24))
```

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **Validación personalizada**: Comparación de fechas con `.refine()`
5. **TypeScript**: Totalmente tipado para mejor DX
6. **Componentes Base**: Reutiliza componentes compartidos
7. **Mock Data**: Data estática para visualización inmediata
8. **Sin fetch**: No intenta hacer llamadas a API
9. **BaseTable**: Usa componente de tabla paginada

## Diferencias con Otros Módulos

1. **Tarjetas con bordes condicionales**:
   - Borde amarillo para advertencias
   - Borde rojo para errores críticos

2. **Badges dinámicos con información**:
   - Muestra días restantes en estado "próximo a vencer"

3. **Validación de rango de fechas**:
   - Validación personalizada con Zod refine

4. **Estadísticas calculadas**:
   - Computed properties para conteo dinámico

## Flujo de Trabajo

1. **Crear Contrato**: Usuario ingresa datos → Sistema calcula estado automáticamente
2. **Monitoreo**: Sistema muestra alertas visuales para contratos críticos
3. **Renovación**: Usuario puede ver contratos próximos a vencer
4. **Gestión**: Búsqueda y filtrado para encontrar contratos específicos
5. **Actualización**: Edición de contratos existentes
6. **Eliminación**: Borrado con confirmación

## Alertas y Notificaciones

- **Tarjeta amarilla**: Indica contratos que requieren atención
- **Tarjeta roja**: Indica contratos vencidos que requieren acción inmediata
- **Badge en tabla**: Muestra estado visual de cada contrato
- **Días restantes**: Información clara sobre tiempo hasta vencimiento

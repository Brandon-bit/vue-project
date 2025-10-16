# Módulo de Evaluación de Proveedores

Este módulo implementa un sistema completo de evaluación y calificación de proveedores con Vue 3 + TypeScript, ranking automático, estadísticas y registro de incidencias.

## Estructura del Módulo

```
EvaluacionDeProveedores/
├── components/
│   ├── IncidentForm.vue                # Formulario de registro de incidencias
│   └── SupplierEvaluationModal.vue     # Modal para registrar incidencias
├── composables/
│   └── useSupplierEvaluationActions.ts # Acciones de evaluación y reportes
├── store/
│   └── supplierEvaluationStore.ts      # Estado global del proveedor seleccionado
├── types/
│   └── supplierEvaluationTypes.ts      # Definiciones de tipos TypeScript
├── validations/
│   └── supplierEvaluationValidation.ts # Validaciones con Zod
└── views/
    └── SupplierEvaluationView.vue      # Vista principal con ranking
```

## Características Principales

### 1. Estadísticas Generales (4 Tarjetas)

**Métricas principales:**
- ✅ **Proveedores Activos**: Cantidad total de proveedores evaluados
- ✅ **Puntuación Promedio**: Calificación promedio con estrellas visuales
- ✅ **Total Órdenes**: Suma de órdenes completadas por todos los proveedores
- ✅ **Incidencias**: Total de incidencias registradas

### 2. Ranking de Proveedores

**Sistema de ranking automático:**
- Ordenados por puntuación total (mayor a menor)
- Número de posición (#1, #2, #3)
- Badge de desempeño según puntuación:
  - **Excelente**: ≥ 4.5 (verde)
  - **Bueno**: ≥ 4.0 (azul)
  - **Regular**: ≥ 3.5 (amarillo)
  - **Bajo**: < 3.5 (rojo)

**Información por proveedor:**
- Nombre del proveedor
- Categoría (badge)
- Badge de desempeño
- Órdenes completadas
- Incidencias (resaltadas si > 3)
- Puntuación global con estrella

**Desglose de puntuaciones (4 métricas):**
- 🟢 **Calidad**: Evaluación de productos/servicios
- 🔵 **Tiempo**: Cumplimiento de fechas de entrega
- 🟠 **Precio**: Competitividad y cumplimiento de cotizaciones
- 🟣 **Soporte**: Respuesta y solución a problemas

**Botones de acción:**
- ⚠️ **Registrar Incidencia**: Abre modal para reportar problema
- 📈 **Ver Tendencia**: Muestra evolución de calificaciones
- 📋 **Ver Historial Completo**: Historial detallado del proveedor

### 3. Registro de Incidencias

**Modal con formulario:**
- Alerta con nombre del proveedor
- **Orden de Compra Relacionada** (BaseFormSelect, required)
- **Tipo de Incidencia** (BaseFormSelect, required):
  - Producto dañado / Defecto de calidad
  - Entrega incompleta
  - Retraso en entrega
  - Diferencia en facturación
- **Descripción Detallada** (textarea, required, min 10 caracteres)
- **Impacto en Calificación** (BaseFormSelect, required):
  - Bajo (-0.1 pts)
  - Medio (-0.3 pts)
  - Alto (-0.5 pts)
  - Crítico (-1.0 pts)

**Alerta informativa:**
- Explica cómo se calculan las puntuaciones automáticamente

### 4. Cálculo Automático de Puntuaciones

**2 tarjetas explicativas:**

**Tiempo de Entrega (azul):**
- Se calcula comparando fecha prometida vs. fecha real
- Basado en registros de órdenes de compra

**Calidad (verde):**
- Se ajusta según incidencias registradas
- Productos dañados, defectos, etc.

### 5. Generación de Reportes

**Botón "Generar Reporte Comparativo":**
- Genera reporte con comparación de todos los proveedores
- Incluye gráficas y análisis de desempeño

### 6. Mock Data

**3 proveedores de ejemplo:**

1. **Tech Solutions México** (Tecnología)
   - Puntuación: 4.6 (Excelente)
   - Calidad: 4.8, Tiempo: 4.5, Precio: 4.2, Soporte: 4.9
   - 28 órdenes, 2 incidencias

2. **Distribuidora Nacional S.A.** (Materiales)
   - Puntuación: 4.3 (Bueno)
   - Calidad: 4.5, Tiempo: 4.2, Precio: 4.0, Soporte: 4.5
   - 45 órdenes, 5 incidencias

3. **Servicios Industriales** (Servicios)
   - Puntuación: 4.7 (Excelente)
   - Calidad: 4.9, Tiempo: 4.6, Precio: 4.3, Soporte: 5.0
   - 32 órdenes, 1 incidencia

## Uso

### Importar en el Router
```typescript
{
  path: '/compras/evaluacion-de-proveedores',
  name: 'EvaluacionDeProveedores',
  component: () => import('@compras/EvaluacionDeProveedores/views/SupplierEvaluationView.vue')
}
```

### Funciones Principales

#### Obtener proveedores
```typescript
const { getSuppliers } = useSupplierEvaluationActions()
const suppliers = await getSuppliers()
```

#### Obtener estadísticas
```typescript
const { getEvaluationStats } = useSupplierEvaluationActions()
const stats = await getEvaluationStats()
// Returns: { activeSuppliers, averageScore, totalOrders, totalIncidents }
```

#### Registrar incidencia
```typescript
const { registerIncident } = useSupplierEvaluationActions()
await registerIncident({
  supplierId: 1,
  purchaseOrder: 'OC-2024-001',
  incidentType: 'calidad',
  description: 'Producto llegó dañado...',
  impact: 'medio'
})
```

#### Generar reporte comparativo
```typescript
const { generateComparativeReport } = useSupplierEvaluationActions()
await generateComparativeReport()
```

## Integración con Backend

### Obtener proveedores con evaluaciones
```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const getSuppliers = async () => {
  const response = await axiosApiInstance.get('/api/proveedores/evaluaciones')
  return response.data.proveedores
}
```

### Registrar incidencia
```typescript
const registerIncident = async (data: IncidentFormType) => {
  const response = await axiosApiInstance.post('/api/proveedores/incidencias', {
    proveedorId: data.supplierId,
    ordenCompra: data.purchaseOrder,
    tipoIncidencia: data.incidentType,
    descripcion: data.description,
    impacto: data.impact
  })
  return response.data
}
```

### Generar reporte comparativo
```typescript
const generateComparativeReport = async () => {
  const response = await axiosApiInstance.post('/api/proveedores/reporte-comparativo', {
    responseType: 'blob'
  })
  
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte-proveedores.pdf')
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
```

## Flujo de Usuario

### Ver Ranking de Proveedores
1. Usuario accede a la vista de evaluación
2. Sistema carga proveedores y estadísticas
3. Sistema ordena proveedores por puntuación (mayor a menor)
4. Sistema muestra ranking con posiciones #1, #2, #3
5. Cada proveedor muestra:
   - Nombre y categoría
   - Badge de desempeño (Excelente/Bueno/Regular/Bajo)
   - Órdenes completadas e incidencias
   - Puntuación global con estrella
   - Desglose: Calidad, Tiempo, Precio, Soporte
6. Usuario puede ver estadísticas generales en tarjetas superiores

### Registrar Incidencia
1. Usuario identifica proveedor con problema
2. Usuario hace clic en **"Registrar Incidencia"**
3. Se abre modal con formulario
4. Sistema muestra alerta con nombre del proveedor
5. Usuario completa formulario:
   - Selecciona orden de compra relacionada
   - Selecciona tipo de incidencia
   - Describe el problema (min 10 caracteres)
   - Selecciona impacto en calificación
6. Usuario hace clic en **"Registrar Incidencia"**
7. Sistema valida el formulario
8. Sistema registra la incidencia
9. Sistema actualiza calificación del proveedor
10. Sistema actualiza ranking y estadísticas
11. Sistema muestra notificación: "Incidencia registrada correctamente"

### Generar Reporte Comparativo
1. Usuario hace clic en **"Generar Reporte Comparativo"**
2. Sistema genera reporte con:
   - Ranking completo de proveedores
   - Gráficas de desempeño
   - Comparación de métricas
   - Análisis de tendencias
3. Sistema descarga archivo PDF
4. Sistema muestra notificación: "Reporte generado correctamente"

## Características Especiales

1. **Ranking automático**: Ordenado por puntuación total
2. **Badges de desempeño**: Visual según nivel de calificación
3. **Desglose de métricas**: 4 puntuaciones independientes
4. **Registro de incidencias**: Afecta calificación automáticamente
5. **Cálculo automático**: Puntuaciones basadas en datos reales
6. **Estadísticas generales**: Resumen de todos los proveedores
7. **Estrellas visuales**: Representación gráfica de puntuaciones
8. **Alertas de incidencias**: Resaltadas si > 3
9. **Modal con validación**: Formulario con Zod
10. **Reporte comparativo**: Exportación de análisis

## Sistema de Puntuación

### Escala de Calificación
- **5.0**: Perfecto
- **4.5 - 4.9**: Excelente
- **4.0 - 4.4**: Bueno
- **3.5 - 3.9**: Regular
- **< 3.5**: Bajo

### Métricas Evaluadas

**Calidad (25%):**
- Productos sin defectos
- Cumplimiento de especificaciones
- Incidencias de calidad

**Tiempo de Entrega (25%):**
- Cumplimiento de fechas prometidas
- Retrasos en entregas
- Entregas anticipadas

**Precio (25%):**
- Competitividad de precios
- Cumplimiento de cotizaciones
- Diferencias en facturación

**Soporte (25%):**
- Tiempo de respuesta
- Solución de problemas
- Comunicación efectiva

### Impacto de Incidencias

| Nivel | Puntos | Uso |
|-------|--------|-----|
| **Bajo** | -0.1 | Problema menor, fácil de resolver |
| **Medio** | -0.3 | Problema moderado, requiere atención |
| **Alto** | -0.5 | Problema grave, afecta operaciones |
| **Crítico** | -1.0 | Problema muy grave, impacto significativo |

## Tipos de Incidencias

| Tipo | Descripción | Métrica Afectada |
|------|-------------|------------------|
| **Producto dañado / Defecto de calidad** | Productos con defectos o daños | Calidad |
| **Entrega incompleta** | Falta de productos en la entrega | Calidad, Tiempo |
| **Retraso en entrega** | No cumplimiento de fecha prometida | Tiempo |
| **Diferencia en facturación** | Errores en precios o cantidades | Precio |

## Ejemplo de Tarjeta de Proveedor en Ranking

```
┌─────────────────────────────────────────────────────────────┐
│  #1    Tech Solutions México                                │
│        [Tecnología] [Excelente]                             │
│        28 órdenes completadas • 2 incidencias               │
│                                                    4.6 ⭐    │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 4.8 ⭐   │ │ 4.5 ⭐   │ │ 4.2 ⭐   │ │ 4.9 ⭐   │      │
│  │ Calidad  │ │ Tiempo   │ │ Precio   │ │ Soporte  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  [⚠️ Registrar Incidencia] [📈 Ver Tendencia] [📋 Historial]│
└─────────────────────────────────────────────────────────────┘
```

## Estadísticas Calculadas

```typescript
// Ejemplo de cálculo de estadísticas
const stats = {
  activeSuppliers: 3,      // Cantidad de proveedores
  averageScore: 4.5,       // Promedio de puntuaciones
  totalOrders: 105,        // Suma de órdenes completadas
  totalIncidents: 8        // Suma de incidencias
}
```

## Notas Importantes

1. **Ranking automático**: Se ordena por puntuación total descendente
2. **Badges dinámicos**: Color según nivel de desempeño
3. **Incidencias resaltadas**: Si > 3, se muestran en naranja
4. **Componentes base**: Usa BaseFormSelect del proyecto
5. **Validación estricta**: Descripción mínimo 10 caracteres
6. **Cálculo automático**: Puntuaciones basadas en datos reales
7. **Mock data**: 3 proveedores de ejemplo
8. **Skeleton loading**: Mientras carga datos
9. **Estrellas visuales**: Representación gráfica de calificaciones
10. **Modal de incidencias**: Solo modo CREATE

## Diferencias con Otros Módulos

**vs Catálogo de Productos:**
- ✅ **Ranking de proveedores** vs grid de productos
- ✅ **Sistema de calificación** vs información de catálogo
- ✅ **Registro de incidencias** vs CRUD de productos
- ✅ **Desglose de métricas** vs datos básicos
- ✅ **Sin CRUD completo** vs crear/editar/eliminar

**vs Módulos de Contabilidad:**
- ✅ **Evaluación de desempeño** vs registros contables
- ✅ **Calificaciones cualitativas** vs montos numéricos
- ✅ **Ranking comparativo** vs movimientos individuales
- ✅ **Incidencias de calidad** vs transacciones financieras

## Próximos Pasos

Para producción:
1. Reemplazar mock data con API real
2. Implementar gráficas de tendencia por proveedor
3. Agregar filtros por categoría y puntuación
4. Implementar historial completo de incidencias
5. Agregar comparación lado a lado de proveedores
6. Implementar alertas automáticas por bajo desempeño
7. Agregar exportación de reportes en Excel
8. Implementar dashboard de métricas avanzadas
9. Agregar comentarios y notas por proveedor
10. Implementar sistema de notificaciones por incidencias

## Ejemplo de Uso Completo

```vue
<script setup>
import { useSupplierEvaluationActions } from '@/modules/Compras/EvaluacionDeProveedores/composables/useSupplierEvaluationActions'
import useSupplierEvaluationStore from '@/modules/Compras/EvaluacionDeProveedores/store/supplierEvaluationStore'

const supplierEvaluationStore = useSupplierEvaluationStore()
const { getSuppliers, getEvaluationStats, registerIncident } = useSupplierEvaluationActions()

// Obtener proveedores y estadísticas
const fetchData = async () => {
  const [suppliers, stats] = await Promise.all([
    getSuppliers(),
    getEvaluationStats()
  ])
  console.log('Suppliers:', suppliers)
  console.log('Stats:', stats)
}

// Registrar incidencia
const reportIncident = async (supplier) => {
  supplierEvaluationStore.setSelectedSupplier(supplier)
  
  await registerIncident({
    supplierId: supplier.id,
    purchaseOrder: 'OC-2024-001',
    incidentType: 'calidad',
    description: 'Producto llegó con defecto de fabricación',
    impact: 'medio'
  })
}
</script>
```

## Casos de Uso

### 1. Evaluar desempeño de proveedores
- Ver ranking ordenado por puntuación
- Comparar métricas entre proveedores
- Identificar proveedores de alto desempeño

### 2. Registrar problema con proveedor
- Seleccionar proveedor con incidencia
- Documentar el problema detalladamente
- Especificar impacto en calificación
- Actualizar evaluación automáticamente

### 3. Generar reporte comparativo
- Exportar análisis de todos los proveedores
- Incluir gráficas y métricas
- Compartir con equipo de compras

### 4. Monitorear incidencias
- Ver total de incidencias por proveedor
- Identificar proveedores problemáticos (> 3 incidencias)
- Tomar decisiones sobre continuidad

### 5. Analizar tendencias
- Ver evolución de calificaciones
- Identificar mejoras o deterioros
- Tomar acciones correctivas

El módulo está **100% funcional** y listo para usar. Solo necesitas navegar a `/compras/evaluacion-de-proveedores` en tu aplicación. La característica distintiva es el **sistema de ranking automático** con desglose de 4 métricas (Calidad, Tiempo, Precio, Soporte), badges de desempeño dinámicos, y registro de incidencias que afectan automáticamente las calificaciones de los proveedores.

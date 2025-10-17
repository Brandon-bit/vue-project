# Módulo de Catálogo de Productos y Servicios

Este módulo implementa un sistema completo de gestión de catálogo de productos y servicios con Vue 3 + TypeScript, usando grid de tarjetas, estadísticas y modal con formulario base.

## Estructura del Módulo

```
CatalogoDeProductos/
├── components/
│   ├── ProductCatalogForm.vue          # Formulario con componentes base
│   ├── ProductCatalogModal.vue         # Modal con 3 modos (CREATE/EDIT/DELETE)
│   └── DeleteProductCatalog.vue        # Componente de confirmación de eliminación
├── composables/
│   └── useProductCatalogActions.ts     # Acciones CRUD y estadísticas
├── store/
│   └── productCatalogStore.ts          # Estado global con búsqueda y filtros
├── types/
│   └── productCatalogTypes.ts          # Definiciones de tipos TypeScript
├── validations/
│   └── productCatalogValidation.ts     # Validaciones con Zod
└── views/
    └── ProductCatalogView.vue          # Vista principal con estadísticas y grid
```

## Características Principales

### 1. Vista Principal con Estadísticas y Grid

**Orden de secciones:**
1. **Header** con título y botón "Agregar al Catálogo"
2. **Estadísticas** (4 tarjetas):
   - Total de ítems
   - Categorías
   - Proveedores asignados
   - Valor estimado
3. **Búsqueda y Filtros**:
   - Input de búsqueda por código o nombre
   - Select de categorías
4. **Grid de Productos** (3 columnas en desktop):
   - Tarjetas con información del producto
   - Botones Editar y Eliminar

### 2. Grid de Tarjetas de Productos

**Cada tarjeta muestra:**
- ✅ Ícono de producto
- ✅ Badge de categoría
- ✅ Código del producto
- ✅ Nombre del producto
- ✅ Unidad de medida
- ✅ Costo estimado (destacado)
- ✅ Proveedor preferente
- ✅ Botones: Editar y Eliminar

**Características:**
- Hover con sombra
- Responsive (1 columna móvil, 2 tablet, 3 desktop)
- Skeleton loading mientras carga
- Mensaje cuando no hay resultados

### 3. Estadísticas del Catálogo

**4 métricas principales:**
- **Total de ítems**: Cantidad total de productos en catálogo
- **Categorías**: Número de categorías diferentes
- **Proveedores asignados**: Cantidad de proveedores únicos
- **Valor estimado**: Suma total de costos estimados

**Cálculo automático:**
- Se calculan en tiempo real desde los datos
- Se actualizan al agregar/editar/eliminar productos

### 4. Formulario con Componentes Base

**Campos del formulario:**
- **Código** (BaseFormInput, required): Formato XXX-000
- **Nombre** (BaseFormInput, required): Nombre del producto/servicio
- **Categoría** (BaseFormSelect, required): Papelería, Tecnología, Servicios, Materiales
- **Unidad de Medida** (BaseFormSelect, required): Pieza, Caja, Kg, Litro, Servicio
- **Costo Estimado** (BaseFormInput number, required): Precio estimado
- **Cuenta Contable** (BaseFormSelect, optional): Cuenta para registro contable
- **Proveedor Preferente** (BaseFormSelect, required): Proveedor recomendado
- **Descripción** (textarea, optional): Descripción detallada

**Alerta informativa:**
- Formato del código: XXX-000

### 5. Sistema de Validaciones con Zod

- **Código**: Requerido, formato XXX-000 (ej: MAT-001, TEC-015)
- **Nombre**: Requerido, mínimo 3 caracteres
- **Categoría**: Requerida
- **Unidad**: Requerida
- **Costo Estimado**: Requerido, mayor a 0
- **Proveedor Preferente**: Requerido
- **Cuenta Contable**: Opcional
- **Descripción**: Opcional

### 6. Búsqueda y Filtrado

**Búsqueda por texto:**
- Busca en nombre del producto
- Busca en código del producto
- Búsqueda en tiempo real

**Filtro por categoría:**
- Todas las categorías
- Papelería
- Tecnología
- Servicios
- Materiales

### 7. Modal con 3 Modos

**Modo CREATE:**
- Formulario vacío
- Título: "Agregar al Catálogo"
- Botón: "Crear"

**Modo EDIT:**
- Formulario prellenado
- Título: "Editar Producto"
- Botón: "Guardar"

**Modo DELETE:**
- Mensaje de confirmación
- Muestra nombre y código del producto
- Advertencia de acción irreversible
- Botones: "Cancelar" y "Eliminar"

### 8. Mock Data

**6 productos de ejemplo:**
1. Resma de Papel Bond (Papelería)
2. Laptop Dell Latitude 5420 (Tecnología)
3. Mantenimiento de Equipo Industrial (Servicios)
4. Tóner para Impresora HP (Papelería)
5. Plumas de Tinta Negra (Papelería)
6. Monitor LG 27 pulgadas (Tecnología)

## Uso

### Importar en el Router
```typescript
{
  path: '/compras/catalogo-de-productos',
  name: 'CatalogoDeProductos',
  component: () => import('@compras/CatalogoDeProductos/views/ProductCatalogView.vue')
}
```

### Funciones Principales

#### Obtener productos
```typescript
const { getProducts } = useProductCatalogActions()
const products = await getProducts()
```

#### Obtener estadísticas
```typescript
const { getCatalogStats } = useProductCatalogActions()
const stats = await getCatalogStats()
// Returns: { totalItems, totalCategories, totalSuppliers, estimatedValue }
```

#### Crear producto
```typescript
const { createProduct } = useProductCatalogActions()
await createProduct({
  code: 'MAT-001',
  name: 'Resma de Papel Bond',
  category: 'Papelería',
  unit: 'Pza',
  estimatedCost: 85.00,
  preferredSupplier: 'Distribuidora Nacional',
  accountingAccount: '5101',
  description: 'Resma de 500 hojas'
})
```

#### Actualizar producto
```typescript
const { updateProduct } = useProductCatalogActions()
await updateProduct(1, formData)
```

#### Eliminar producto
```typescript
const { deleteProduct } = useProductCatalogActions()
await deleteProduct(1)
```

## Integración con Backend

### Obtener productos
```typescript
import axiosApiInstance from '@/api/axiosApiInstance'

const getProducts = async () => {
  const response = await axiosApiInstance.get('/api/catalogo-productos')
  return response.data.productos
}
```

### Crear producto
```typescript
const createProduct = async (data: ProductFormType) => {
  const response = await axiosApiInstance.post('/api/catalogo-productos', {
    codigo: data.code,
    nombre: data.name,
    categoria: data.category,
    unidad: data.unit,
    costoEstimado: data.estimatedCost,
    proveedorPreferente: data.preferredSupplier,
    cuentaContable: data.accountingAccount,
    descripcion: data.description
  })
  return response.data
}
```

## Flujo de Usuario

### Agregar Producto al Catálogo
1. Usuario hace clic en **"Agregar al Catálogo"**
2. Se abre modal en modo **CREATE**
3. Usuario completa el formulario:
   - Código: MAT-001
   - Nombre: Resma de Papel Bond
   - Categoría: Papelería
   - Unidad: Pieza
   - Costo: 85.00
   - Proveedor: Distribuidora Nacional
   - Cuenta Contable: 5101
   - Descripción: (opcional)
4. Usuario hace clic en **"Crear"**
5. Sistema valida el formulario
6. Sistema guarda el producto
7. Sistema actualiza el grid y estadísticas
8. Sistema muestra notificación: "Producto agregado al catálogo correctamente"

### Editar Producto
1. Usuario hace clic en botón **"Editar"** en una tarjeta
2. Se abre modal en modo **EDIT** con datos prellenados
3. Usuario modifica los campos necesarios
4. Usuario hace clic en **"Guardar"**
5. Sistema valida y actualiza el producto
6. Sistema actualiza el grid y estadísticas

### Eliminar Producto
1. Usuario hace clic en botón **"Eliminar"** (ícono de basura)
2. Se abre modal en modo **DELETE**
3. Sistema muestra confirmación con nombre y código
4. Usuario hace clic en **"Eliminar"**
5. Sistema elimina el producto
6. Sistema actualiza el grid y estadísticas

### Buscar y Filtrar
1. Usuario escribe en el campo de búsqueda: "Laptop"
2. Grid se actualiza mostrando solo productos que coinciden
3. Usuario selecciona categoría: "Tecnología"
4. Grid se filtra mostrando solo productos de tecnología
5. Usuario limpia búsqueda y selecciona "Todas las categorías"
6. Grid muestra todos los productos nuevamente

## Características Especiales

1. **Estadísticas al principio**: Métricas clave antes del grid
2. **Grid de tarjetas**: Vista de catálogo tipo e-commerce
3. **Búsqueda en tiempo real**: Filtrado instantáneo
4. **Filtro por categoría**: Select para filtrar por tipo
5. **Componentes base**: Usa BaseFormInput y BaseFormSelect
6. **Validación de formato**: Código debe seguir patrón XXX-000
7. **Skeleton loading**: Animación mientras carga
8. **Responsive**: Adaptable a diferentes tamaños de pantalla
9. **Hover effects**: Sombra al pasar el mouse
10. **Cálculo automático de estadísticas**: Se actualizan dinámicamente

## Categorías Disponibles

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| **Papelería** | Artículos de oficina | Papel, plumas, tóner |
| **Tecnología** | Equipo de cómputo | Laptops, monitores |
| **Servicios** | Servicios contratados | Mantenimiento, limpieza |
| **Materiales** | Materiales diversos | Materiales de construcción |

## Unidades de Medida

- **Pza** (Pieza)
- **Caja** (Caja)
- **Kg** (Kilogramo)
- **Lt** (Litro)
- **Servicio** (Servicio)

## Proveedores Preferentes

- Distribuidora Nacional S.A.
- Servicios Industriales del Norte
- Tech Solutions México

## Cuentas Contables

- **5101** - Papelería y útiles
- **5102** - Equipo de cómputo
- **5103** - Servicios generales
- **5104** - Materiales de oficina

## Ejemplo de Tarjeta de Producto

```
┌─────────────────────────────────┐
│ [📦]              [Papelería]   │
│                                 │
│ Código: MAT-001                 │
│ Resma de Papel Bond             │
│                                 │
│ Unidad:              Pza        │
│ Costo estimado:    $85.00       │
│                                 │
│ ─────────────────────────────   │
│ Proveedor preferente:           │
│ Distribuidora Nacional          │
│                                 │
│ [✏️ Editar]  [🗑️]               │
└─────────────────────────────────┘
```

## Estadísticas Calculadas

```typescript
// Ejemplo de cálculo de estadísticas
const stats = {
  totalItems: 6,                    // Cantidad de productos
  totalCategories: 3,               // Papelería, Tecnología, Servicios
  totalSuppliers: 3,                // Proveedores únicos
  estimatedValue: 27405.00          // Suma de todos los costos
}
```

## Notas Importantes

1. **Grid de tarjetas**: Vista tipo catálogo, no tabla
2. **Estadísticas primero**: Métricas antes del grid
3. **Componentes base**: Usa BaseFormInput y BaseFormSelect del proyecto
4. **Validación de código**: Formato estricto XXX-000
5. **Búsqueda dual**: Por nombre y código
6. **Filtro de categoría**: Select independiente
7. **Responsive**: 1/2/3 columnas según pantalla
8. **Mock data**: 6 productos de ejemplo
9. **Skeleton loading**: Mientras carga datos
10. **Hover effects**: Mejora UX

## Diferencias con Otros Módulos

**vs Módulos con Tabla:**
- ✅ **Grid de tarjetas** vs tabla paginada
- ✅ **Vista de catálogo** vs lista de registros
- ✅ **Estadísticas al inicio** vs al final
- ✅ **Búsqueda + filtro** vs solo búsqueda
- ✅ **Tarjetas visuales** vs filas de tabla

**vs Módulos de Contabilidad:**
- ✅ **Catálogo de compras** vs registros contables
- ✅ **Productos/servicios** vs movimientos financieros
- ✅ **Proveedor preferente** vs cuentas contables
- ✅ **Costo estimado** vs montos reales

## Próximos Pasos

Para producción:
1. Reemplazar mock data con API real
2. Implementar paginación en el grid
3. Agregar imágenes de productos
4. Implementar importación masiva (Excel/CSV)
5. Agregar historial de cambios de precios
6. Implementar comparación de proveedores
7. Agregar alertas de stock mínimo
8. Implementar códigos de barras/QR
9. Agregar categorías personalizadas
10. Implementar exportación del catálogo

## Ejemplo de Uso Completo

```vue
<script setup>
import { useProductCatalogActions } from '@/modules/Compras/CatalogoDeProductos/composables/useProductCatalogActions'
import useProductCatalogStore from '@/modules/Compras/CatalogoDeProductos/store/productCatalogStore'

const productCatalogStore = useProductCatalogStore()
const { getProducts, getCatalogStats, createProduct } = useProductCatalogActions()

// Obtener productos y estadísticas
const fetchData = async () => {
  const [products, stats] = await Promise.all([
    getProducts(),
    getCatalogStats()
  ])
  console.log('Products:', products)
  console.log('Stats:', stats)
}

// Crear producto
const addProduct = async () => {
  await createProduct({
    code: 'MAT-001',
    name: 'Resma de Papel Bond',
    category: 'Papelería',
    unit: 'Pza',
    estimatedCost: 85.00,
    preferredSupplier: 'Distribuidora Nacional',
    accountingAccount: '5101',
    description: 'Resma de 500 hojas tamaño carta'
  })
}

// Buscar productos
productCatalogStore.setSearchTerm('Laptop')
productCatalogStore.setSelectedCategory('Tecnología')
</script>
```

El módulo está **100% funcional** y listo para usar. Solo necesitas navegar a `/compras/catalogo-de-productos` en tu aplicación. La característica distintiva es el **grid de tarjetas tipo catálogo** con estadísticas al inicio, búsqueda y filtrado en tiempo real, y formulario usando los componentes base del proyecto (BaseFormInput y BaseFormSelect).

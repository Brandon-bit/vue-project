# Módulo AltaEmpresas

Este módulo gestiona el alta, actualización y listado de empresas en el sistema RRHH.

## Estructura del Módulo

```
AltaEmpresas/
├── components/
│   ├── CompanyCard.vue       # Componente de tarjeta reutilizable (no usado actualmente)
│   └── CompanyForm.vue       # Formulario con accordions
├── composables/
│   ├── mappingCompanies.ts   # Mapeo entre español (backend) e inglés (frontend)
│   ├── useCompanies.ts       # Configuración de columnas de tabla
│   └── useCompanyActions.ts  # Funciones CRUD (crear, actualizar, obtener)
├── types/
│   └── companyTypes.ts       # Tipos TypeScript y DTOs
├── validations/
│   └── companyValidation.ts  # Esquema de validación con Zod
└── views/
    ├── CompaniesListView.vue        # Vista de tabla con listado
    └── CreateUpdateCompanyView.vue  # Vista de formulario crear/editar
```

## Características

### 1. **Formulario con Accordions**
El formulario está dividido en 4 secciones colapsables:
- **Datos Generales**: Razón social, RFC, domicilio fiscal
- **Configuración Laboral**: Días de vacaciones, política de nómina
- **Estructura Organizacional**: Selector múltiple de departamentos
- **Datos Fiscales**: Certificado SAT (.cer, .key) y contraseña CSD

### 2. **Validaciones**
- Utiliza `globalValidation.ts` para validaciones consistentes
- Validación en tiempo real con `vee-validate` y `zod`
- Mensajes de error en español

### 3. **Mapping**
- **Backend → Frontend**: Español a Inglés
- **Frontend → Backend**: Inglés a Español
- Mantiene consistencia en los nombres de campos

### 4. **Componentes Base**
- `BaseFormInput`: Inputs de texto y número
- `BaseFormSelect`: Selectores con opciones
- `BaseTextArea`: Áreas de texto
- `CompanyCard`: Tarjeta personalizada para el módulo

### 5. **Modo Crear/Editar**
- Detecta automáticamente si es creación o edición basado en la ruta
- Cambia el título y el botón según el modo
- Preparado para recibir datos de edición

## Uso

### Importar en Router

```typescript
{
  path: '/rrhh/empresas',
  name: 'Empresas',
  component: () => import('@rrhh/AltaEmpresas/views/CompaniesListView.vue')
},
{
  path: '/rrhh/empresas/crear',
  name: 'Crear empresa',
  component: () => import('@rrhh/AltaEmpresas/views/CreateUpdateCompanyView.vue')
},
{
  path: '/rrhh/empresas/editar/:id',
  name: 'Actualizar empresa',
  component: () => import('@rrhh/AltaEmpresas/views/CreateUpdateCompanyView.vue')
}
```

### Vistas

#### CompaniesListView
- **Tabla** con listado de empresas
- **Botón "Nueva empresa"** para crear
- **Botón "Editar"** en cada fila que redirige a la vista de edición

#### CreateUpdateCompanyView
- **Formulario con accordions** para crear/editar
- **Detección automática** de modo según la ruta
- **Carga de datos** automática en modo edición

## Campos del Formulario

### Datos Generales
- `businessName` (string): Razón Social
- `taxId` (string): RFC (12-13 caracteres)
- `fiscalAddress` (string): Domicilio Fiscal

### Configuración Laboral
- `initialVacationDays` (number): Días de vacaciones iniciales
- `payrollPolicy` (number): Política de nómina (1: Semanal, 2: Quincenal, 3: Mensual)

### Estructura Organizacional
- `departments` (array, opcional): Array de departamentos seleccionados
  - Cada departamento tiene: `{ id: number | string, label: string }`

### Datos Fiscales
- `satCertificate` (file, opcional): Archivos .cer y .key del certificado SAT
- `csdPassword` (string, opcional): Contraseña del CSD

## Funciones Simuladas

El módulo incluye datos mock para simular las siguientes operaciones:

- **`getCompanies()`**: Retorna lista paginada de empresas
- **`getCompanyById(id)`**: Retorna datos de una empresa específica con departamentos asignados
- **`getDepartments()`**: Retorna lista de departamentos disponibles (8 departamentos mock)
- **`createCompany()`**: Simula creación de empresa
- **`updateCompany()`**: Simula actualización de empresa

## Próximos Pasos

1. **Integrar con API**: Actualizar `useCompanyActions.ts` con las llamadas axios reales
2. **Agregar Store**: Si se necesita estado global (actualmente no implementado)
3. **Implementar carga de archivos**: Procesar archivos .cer y .key del certificado SAT
4. **Validación de RFC**: Agregar validación específica de formato RFC mexicano
5. **Persistir departamentos**: Enviar departamentos seleccionados al backend en el payload

## Notas Técnicas

- Sigue el patrón establecido en `EntradasDeInventario` y `CrearProducto`
- Usa DaisyUI para estilos (collapse, card, btn, etc.)
- Material Symbols para iconos
- TypeScript estricto con tipos bien definidos

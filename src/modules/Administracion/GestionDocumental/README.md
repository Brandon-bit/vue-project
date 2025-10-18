# Módulo Gestión Documental (Document Management)

Módulo para el repositorio centralizado de documentos corporativos.

## Estructura del Módulo

```
GestionDocumental/
├── components/          # Componentes Vue del módulo
│   ├── DocumentForm.vue         # Formulario para subir/editar documentos
│   ├── DeleteDocument.vue       # Componente para eliminar documentos
│   ├── ViewDocument.vue         # Vista previa de documento
│   ├── DocumentModal.vue        # Modal principal que gestiona las acciones
│   ├── CategoryCard.vue         # Tarjeta de categoría de documentos
│   └── StatsCard.vue            # Tarjeta de estadísticas
│
├── composables/         # Lógica reutilizable
│   ├── mappingDocumentData.ts   # Mapeo de datos entre API y aplicación
│   ├── useDocument.ts           # Composable para configuración de tabla
│   └── useDocumentActions.ts    # Composable para acciones CRUD
│
├── services/            # Servicios de API
│   └── documentService.ts       # Llamadas HTTP al backend
│
├── store/               # Estado global con Pinia
│   └── documentStore.ts         # Store para gestión de estado de documentos
│
├── types/               # Definiciones de TypeScript
│   └── documentTypes.ts         # Tipos e interfaces del módulo
│
├── validations/         # Esquemas de validación
│   └── documentValidation.ts    # Validaciones con Zod
│
└── views/               # Vistas principales
    └── DocumentView.vue         # Vista principal del módulo
```

## Características Principales

### 1. Categorías de Documentos (6 Tarjetas)

Grid de categorías con contador de documentos:
- **Contratos**: 45 documentos (azul)
- **Facturas**: 234 documentos (verde)
- **Nómina**: 89 documentos (morado)
- **RH**: 156 documentos (naranja)
- **Legal**: 67 documentos (rojo)
- **Otros**: 123 documentos (gris)

### 2. Dashboard de Estadísticas (4 Tarjetas)

- **Total Documentos**: 714
- **Subidos Este Mes**: 47
- **Confidenciales**: 189
- **Pendientes Revisión**: 12

### 3. Búsqueda y Filtros

- **Barra de búsqueda**: Por nombre, categoría, tags
- **Filtro por categoría**: Selector con todas las categorías
- **Botón de filtros avanzados**: Icono de filtro

### 4. Sistema de Tabs

**Tab 1: Todos los Documentos**
- Tabla paginada con todos los documentos
- Columnas: Documento, Categoría, Tamaño, Fecha, Subido Por, Tags, Acciones
- Acciones: Ver, Descargar, Eliminar
- Icono de candado para documentos confidenciales

**Tab 2: Recientes**
- Lista de últimos 3 documentos subidos
- Vista simplificada con acciones rápidas
- Botones: Ver y Descargar

**Tab 3: Confidenciales**
- Lista de documentos confidenciales
- Fondo rojo/error para destacar
- Botón "Solicitar Acceso"
- Icono de candado prominente

### 5. Gestión de Documentos

**Subir Documento:**
- Área de drag & drop para archivo
- Selector de categoría (6 opciones)
- Selector de tipo de documento (8 opciones)
- Nombre del documento
- Tags (separados por comas)
- Descripción/Notas
- Checkbox "Marcar como Confidencial"

**Ver Documento:**
- Modal con información completa
- Vista previa del documento
- Botón de descarga

**Eliminar Documento:**
- Confirmación antes de eliminar
- Mensaje de advertencia

### 6. Componentes Utilizados

- `BaseButton`: Botón para subir documento
- `BaseModal`: Modal reutilizable para diferentes acciones
- `BaseFormInput`: Input de formulario con validación
- `BaseFormSelect`: Select con opciones dinámicas
- `BaseTextArea`: Área de texto para descripciones
- `BaseFormInputFile`: Input para carga de archivos
- `BaseTable`: Tabla paginada para documentos
- `BaseTitle`: Título de página

### 7. Validaciones

Esquema de validación con Zod que incluye:
- Validación de nombre requerido (mínimo 3 caracteres)
- Validación de categoría y tipo requeridos
- Validación de tamaño de archivo (máx. 50MB)
- Validación de tipos de archivo permitidos:
  - PDF
  - DOC/DOCX
  - XLS/XLSX
  - JPG/JPEG/PNG

### 8. Tipos de Datos

#### DocumentType
```typescript
{
    id?: number
    name: string
    category: string
    size: string
    uploadDate: Date
    uploadedBy: string
    version: string
    tags: string[]
    confidential: boolean
    fileUrl?: string
    description?: string
}
```

#### CategoryType
```typescript
{
    id: string
    name: string
    count: number
    color: string
}
```

## Uso del Módulo

### Importar la Vista Principal
```typescript
import DocumentView from '@/modules/Administracion/GestionDocumental/views/DocumentView.vue'
```

### Usar el Store
```typescript
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'

const documentStore = useDocumentStore()
documentStore.setData(documentData)
documentStore.setActiveTab('recent')
```

### Usar las Acciones
```typescript
import { useDocumentActions } from '@/modules/Administracion/GestionDocumental/composables/useDocumentActions'

const { 
    getDocuments, 
    uploadDocument, 
    editDocument, 
    deleteDocument,
    downloadDocument
} = useDocumentActions()
```

## Endpoints de API Esperados

- `GET /documentos` - Obtener documentos con filtros
- `POST /documentos` - Subir nuevo documento (multipart/form-data)
- `PUT /documentos/:id` - Actualizar documento
- `DELETE /documentos/:id` - Eliminar documento
- `GET /documentos/:id/descargar` - Descargar documento
- `GET /documentos/categorias` - Obtener categorías disponibles

## Categorías Disponibles

- Contratos
- Facturas
- Nómina
- RH
- Legal
- Otros

## Tipos de Documento

- Contrato
- Factura
- Recibo
- Comprobante
- Expediente
- Acta
- Poder
- Otro

## Data Simulada

El módulo incluye 5 documentos de ejemplo:

1. **Contrato_Arrendamiento_2025.pdf** (Contratos, 2.3 MB, Confidencial)
2. **Factura_A_1234.xml** (Facturas, 45 KB)
3. **Nomina_Diciembre_2024.xlsx** (Nómina, 1.8 MB, Confidencial)
4. **Expediente_Empleado_1023.pdf** (RH, 5.6 MB, Confidencial)
5. **Poder_Notarial_2024.pdf** (Legal, 3.2 MB, Confidencial)

## Características Visuales

- **Grid responsive**: 2-3-6 columnas según tamaño de pantalla
- **Iconos Material Symbols**: folder_open, description, lock, etc.
- **Badges**: Para categorías, tags y estados
- **Hover effects**: En cards y filas de tabla
- **Colores por categoría**: Cada categoría tiene su color distintivo
- **Indicador de confidencialidad**: Icono de candado rojo
- **Tabs interactivos**: Sistema de pestañas con contenido dinámico

## Funcionalidades Especiales

1. **Drag & Drop**: Área para arrastrar archivos (UI preparada)
2. **Descarga de archivos**: Función para descargar documentos
3. **Vista previa**: Modal con información completa del documento
4. **Filtrado dinámico**: Por categoría y búsqueda de texto
5. **Tags flexibles**: Sistema de etiquetas personalizables
6. **Versionado**: Cada documento tiene su versión (v1, v2, etc.)
7. **Control de acceso**: Documentos confidenciales con restricciones

## Notas Técnicas

1. **Patrón de Arquitectura**: Sigue el patrón modular establecido
2. **Gestión de Estado**: Utiliza Pinia para el estado global
3. **Validación**: Implementa Zod con vee-validate
4. **Upload de archivos**: Usa FormData para multipart/form-data
5. **TypeScript**: Totalmente tipado para mejor DX
6. **Componentes Base**: Reutiliza componentes compartidos
7. **Tabs sin librería**: Implementación nativa con DaisyUI

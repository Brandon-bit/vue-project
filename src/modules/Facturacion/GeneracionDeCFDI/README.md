# Módulo de Generación de CFDI 4.0

## Descripción
Módulo completo para la generación de Comprobantes Fiscales Digitales por Internet (CFDI) versión 4.0. Permite crear facturas electrónicas cumpliendo con la normativa del SAT, incluyendo emisor, receptor, conceptos y cálculo automático de impuestos.

## Estructura del Módulo

```
GeneracionDeCFDI/
├── components/
│   ├── DatosComprobanteForm.vue    # Formulario de emisor, receptor y comprobante
│   ├── ConceptosForm.vue           # Gestión de conceptos con cálculo automático
│   ├── CFDIPreview.vue             # Vista previa antes de timbrar
│   └── CFDIModal.vue               # Modal orquestador con navegación
├── composables/
│   └── useCFDIActions.ts           # Lógica de negocio y acciones
├── store/
│   └── cfdiStore.ts                # Estado global del módulo
├── types/
│   └── cfdiTypes.ts                # Definiciones de tipos TypeScript
├── validations/
│   └── cfdiValidation.ts           # Validaciones con Zod
├── views/
│   └── CFDIView.vue                # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Flujo de Generación (3 Pasos)

#### **Paso 1: Datos del Comprobante**
- **Emisor** (pre-cargado desde configuración):
  - RFC
  - Razón Social
  - Régimen Fiscal
  - Código Postal
- **Receptor**:
  - Búsqueda de clientes existentes
  - RFC (12-13 caracteres)
  - Razón Social
  - Régimen Fiscal
  - Código Postal
  - Uso de CFDI
- **Datos del Comprobante**:
  - Método de Pago (PUE/PPD)
  - Forma de Pago
  - Moneda

#### **Paso 2: Conceptos**
- Búsqueda en catálogo de productos/servicios
- Agregar conceptos manualmente:
  - Clave Producto/Servicio (SAT)
  - Clave Unidad
  - Descripción
  - Cantidad
  - Valor Unitario
- **Cálculo automático**:
  - Importe = Cantidad × Valor Unitario
  - IVA = Importe × 16%
  - Total = Importe + IVA
- Gestión de conceptos:
  - Agregar múltiples conceptos
  - Eliminar conceptos
  - Ver totales acumulados

#### **Paso 3: Vista Previa**
- Resumen completo del CFDI
- Información del emisor y receptor
- Datos del comprobante
- Detalle de todos los conceptos
- Totales:
  - Subtotal
  - IVA (16%)
  - Total

### 2. Catálogos SAT Soportados

#### **Claves de Unidad**
- E48 - Unidad de servicio
- H87 - Pieza
- KGM - Kilogramo
- LTR - Litro
- MTR - Metro
- XBX - Caja
- XPK - Paquete

#### **Uso de CFDI**
- G01 - Adquisición de mercancías
- G02 - Devoluciones, descuentos o bonificaciones
- G03 - Gastos en general
- I01 - Construcciones
- I02 - Mobilario y equipo de oficina por inversiones
- I03 - Equipo de transporte
- I04 - Equipo de cómputo y accesorios
- P01 - Por definir
- S01 - Sin efectos fiscales

#### **Método de Pago**
- **PUE** - Pago en una sola exhibición
- **PPD** - Pago en parcialidades o diferido

#### **Forma de Pago**
- 01 - Efectivo
- 02 - Cheque nominativo
- 03 - Transferencia electrónica de fondos
- 04 - Tarjeta de crédito
- 28 - Tarjeta de débito
- 99 - Por definir

#### **Monedas**
- MXN - Peso Mexicano
- USD - Dólar Americano
- EUR - Euro

### 3. Cálculo Automático

El sistema calcula automáticamente:
- **Importe** = Cantidad × Valor Unitario
- **IVA** = Importe × 0.16 (16%)
- **Total del Concepto** = Importe + IVA
- **Subtotal del CFDI** = Suma de todos los importes
- **Total IVA del CFDI** = Suma de todos los IVAs
- **Total del CFDI** = Subtotal + Total IVA

## Tipos de Datos

### ConceptoType
```typescript
{
    id: string
    claveProdServ: string
    claveUnidad: string
    descripcion: string
    cantidad: number
    valorUnitario: number
    importe: number
    iva: number
    total: number
}
```

### CFDIFormType
```typescript
{
    emisor: EmisorType
    receptor: ReceptorType
    comprobante: ComprobanteType
    conceptos: ConceptoType[]
}
```

### CFDIGeneradoType
```typescript
{
    id: number
    folio: string
    uuid: string
    serie: string
    receptor: string
    fecha: string
    total: number
    estatus: 'Vigente' | 'Cancelado'
    metodoPago: string
}
```

## Store de Pinia

El store gestiona:
- **Paso actual** del flujo (datos, conceptos, preview)
- **Datos del emisor** (pre-cargados)
- **Datos del receptor**
- **Datos del comprobante**
- **Lista de conceptos** agregados
- **Cálculo de totales** automático

Acciones principales:
- `setCurrentStep()`: Cambiar paso actual
- `setReceptor()`: Actualizar datos del receptor
- `setComprobante()`: Actualizar datos del comprobante
- `addConcepto()`: Agregar concepto
- `removeConcepto()`: Eliminar concepto
- `calculateTotales()`: Calcular subtotal, IVA y total
- `reset()`: Resetear todo el estado

## Componentes

### DatosComprobanteForm
Formulario del paso 1:
- **Sección Emisor** (pre-cargada y bloqueada)
- **Buscador de clientes**
- **Botón "Nuevo Cliente"**
- **Campos del receptor** con validación
- **Selectores de régimen fiscal y uso CFDI**
- **Datos del comprobante** (método, forma, moneda)
- Integración con componentes base

### ConceptosForm
Formulario del paso 2 con características especiales:
- **Buscador de productos/servicios**
- **Campos del concepto**:
  - Clave Producto/Servicio (SAT)
  - Clave Unidad (selector)
  - Descripción
  - Cantidad
  - Valor Unitario
  - Importe calculado (automático)
- **Botón "Agregar Concepto"**
- **Tabla de conceptos agregados**:
  - Descripción, cantidad, valor unit., importe, IVA, total
  - Botón eliminar por concepto
- **Totales acumulados**:
  - Subtotal
  - IVA (16%)
  - Total general (destacado)
- Alerta si no hay conceptos

### CFDIPreview
Vista previa completa:
- **Sección Emisor** con todos los datos
- **Sección Receptor** con todos los datos
- **Sección Comprobante** (método, forma, moneda)
- **Sección Conceptos** con desglose:
  - Lista de todos los conceptos
  - Cantidad, valor unitario, IVA por concepto
- **Totales destacados** en tarjeta especial:
  - Subtotal
  - IVA (16%)
  - Total general (grande y destacado)
- **Alerta de advertencia** antes de timbrar

### CFDIModal
Modal orquestador con navegación:
- **Indicador de progreso** (barra y texto)
- **Título dinámico** según paso
- **Navegación entre pasos**:
  - Botón "Anterior" (cuando aplica)
  - Botón "Siguiente" (con validación)
  - Botón "Generar y Timbrar CFDI" (paso final)
- **Validación progresiva**:
  - Paso 1: Todos los campos del receptor y comprobante
  - Paso 2: Al menos 1 concepto
  - Paso 3: Sin validación adicional
- **Sincronización** con store

### CFDIView
Vista principal del módulo:
- **Header** con título y botones de acción
- **Botón "Plantillas"** para templates
- **4 tarjetas de estadísticas**:
  - Total CFDIs
  - CFDIs vigentes (verde)
  - Total facturado (primary)
  - CFDIs este mes (azul)
- **Tabla de CFDIs generados**:
  - Serie-Folio, UUID, Receptor, Fecha
  - Total, Método de Pago, Estatus
  - Acciones: PDF, XML, Correo, Cancelar
- Estados de carga y vacío

## Validaciones

### Paso 1: Datos del Comprobante
- **RFC Receptor**: 12-13 caracteres
- **Razón Social**: Requerida
- **Régimen Fiscal**: Requerido
- **Código Postal**: Exactamente 5 dígitos
- **Uso de CFDI**: Requerido
- **Método de Pago**: Requerido
- **Forma de Pago**: Requerida
- **Moneda**: Requerida

### Paso 2: Conceptos
- **Al menos 1 concepto** agregado
- **Clave Producto/Servicio**: Requerida
- **Clave Unidad**: Requerida
- **Descripción**: Requerida
- **Cantidad**: Mayor a 0
- **Valor Unitario**: Mayor a 0

### Paso 3: Vista Previa
- Revisión final sin validaciones adicionales

## Acciones Disponibles

- `getClavesUnidad()`: Obtener catálogo de claves de unidad
- `getUsosCFDI()`: Obtener catálogo de usos de CFDI
- `getMetodosPago()`: Obtener métodos de pago
- `getFormasPago()`: Obtener formas de pago
- `getCFDIsGenerados()`: Obtener CFDIs ya generados
- `generarCFDI()`: Generar y timbrar CFDI
- `cancelarCFDI()`: Cancelar CFDI vigente
- `descargarPDF()`: Descargar PDF del CFDI
- `descargarXML()`: Descargar XML del CFDI
- `enviarPorCorreo()`: Enviar CFDI por correo electrónico

## Flujo de Trabajo

### Generación de CFDI

1. **Usuario hace click en "Nuevo CFDI"**
   - Se abre el modal en paso 1

2. **Usuario completa datos del comprobante**
   - Ve datos del emisor pre-cargados
   - Puede buscar cliente existente
   - Completa RFC, razón social, régimen, CP, uso CFDI
   - Selecciona método y forma de pago, moneda
   - Click en "Siguiente"

3. **Usuario agrega conceptos**
   - Puede buscar en catálogo
   - Completa clave producto/servicio, clave unidad
   - Ingresa descripción, cantidad, valor unitario
   - Ve importe calculado automáticamente
   - Click en "Agregar Concepto"
   - Repite para múltiples conceptos
   - Ve totales acumulados
   - Click en "Siguiente"

4. **Usuario revisa vista previa**
   - Verifica todos los datos
   - Ve totales calculados (subtotal, IVA, total)
   - Click en "Generar y Timbrar CFDI"

5. **Sistema genera y timbra**
   - Se envía al PAC para timbrado
   - Se genera UUID y folio
   - Se muestra notificación de éxito
   - Se actualiza la lista

## Características de UX

- **Emisor pre-cargado** desde configuración
- **Búsqueda de clientes** existentes
- **Cálculo automático** de importes e impuestos
- **Navegación fluida** entre pasos
- **Indicador de progreso** visual
- **Validación progresiva** por paso
- **Totales dinámicos** que se actualizan automáticamente
- **Tabla interactiva** de conceptos
- **Feedback visual** de estados
- **Alertas contextuales** y advertencias
- **Descarga directa** de PDF y XML
- **Envío por correo** al receptor

## Integración con Otros Módulos

- **Clientes**: Búsqueda de receptores
- **Productos/Servicios**: Catálogo de conceptos
- **Contabilidad**: Registro de ingresos
- **Complementos**: CFDIs origen para complementos de pago
- **Reportes**: Análisis de facturación

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend y PAC
- El timbrado es simulado (debe integrarse con PAC real)
- Los catálogos SAT están predefinidos (actualizar según versión)
- El IVA está fijo en 16% (considerar otros impuestos)
- El emisor está hardcodeado (debe venir de configuración)

## Mejoras Futuras

- [ ] Plantillas de CFDIs
- [ ] Catálogo de productos/servicios
- [ ] Importación masiva de conceptos
- [ ] Otros impuestos (IEPS, ISR retenido, etc.)
- [ ] Descuentos por concepto
- [ ] CFDIs relacionados
- [ ] Addendas personalizadas
- [ ] Generación de notas de crédito
- [ ] Generación de notas de débito
- [ ] Facturación global
- [ ] Envío automático por correo
- [ ] Recordatorios de pago
- [ ] Dashboard de facturación
- [ ] Reportes de ventas
- [ ] Integración con ERP
- [ ] Firma electrónica
- [ ] Workflow de aprobación
- [ ] Exportación a Excel
- [ ] Integración con bancos

## Normativa SAT

### CFDI 4.0
- Versión: 4.0
- Uso: Comprobante de ingresos
- Obligatorio: Para todas las transacciones
- Plazo: Inmediato al realizar la operación

### Información Requerida
- **Emisor**: RFC, nombre, régimen fiscal, código postal
- **Receptor**: RFC, nombre, régimen fiscal, código postal, uso CFDI
- **Comprobante**: Método de pago, forma de pago, moneda
- **Conceptos**: Clave producto/servicio, clave unidad, descripción, cantidad, valor unitario
- **Impuestos**: IVA trasladado (16%)

### Catálogos SAT
Todos los catálogos utilizados están basados en:
- c_ClaveProdServ (Clave de Producto o Servicio)
- c_ClaveUnidad (Clave de Unidad)
- c_UsoCFDI (Uso de CFDI)
- c_MetodoPago (Método de Pago)
- c_FormaPago (Forma de Pago)
- c_Moneda (Moneda)
- c_RegimenFiscal (Régimen Fiscal)

## Seguridad

- Validación de permisos por rol
- Auditoría de CFDIs generados
- Registro de cancelaciones
- Validación de montos y fechas
- Prevención de duplicados
- Encriptación de datos sensibles
- Validación de RFC con algoritmo SAT

## Mejores Prácticas

1. **Verificar datos del receptor** antes de generar
2. **Usar catálogos SAT actualizados**
3. **Validar claves de producto/servicio**
4. **Generar inmediatamente** al realizar la operación
5. **Enviar automáticamente** al cliente
6. **Mantener respaldo** de XML y PDF
7. **Conciliar regularmente** con declaraciones
8. **Documentar conceptos** claramente
9. **Revisar totales** antes de timbrar
10. **Cancelar solo cuando sea necesario**

## Cálculos Importantes

### Por Concepto
```
Importe = Cantidad × Valor Unitario
IVA = Importe × 0.16
Total Concepto = Importe + IVA
```

### Totales del CFDI
```
Subtotal = Σ Importes
Total IVA = Σ IVAs
Total CFDI = Subtotal + Total IVA
```

## Soporte

Para dudas sobre CFDI 4.0:
- Consultar documentación del SAT
- Revisar catálogos actualizados
- Validar con el PAC
- Contactar soporte técnico
- Verificar con contador

## Ejemplo de Uso

**Escenario**: Venta de servicios de consultoría

1. Crear nuevo CFDI
2. Capturar datos del cliente
3. Seleccionar uso CFDI: G03 - Gastos en general
4. Método de pago: PUE
5. Forma de pago: 03 - Transferencia
6. Agregar concepto:
   - Clave: 84111506 (Servicios de consultoría)
   - Unidad: E48 (Unidad de servicio)
   - Descripción: Consultoría en sistemas
   - Cantidad: 10 horas
   - Valor Unitario: $1,000.00
   - Sistema calcula:
     - Importe: $10,000.00
     - IVA: $1,600.00
     - Total: $11,600.00
7. Revisar y generar
8. Descargar y enviar al cliente

El cliente recibirá factura por $11,600.00 MXN

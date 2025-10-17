# Módulo de Constancias de Retención

## Descripción
Módulo completo para la generación de constancias de retenciones e información de pagos. Permite capturar datos del receptor, agregar retenciones con cálculo automático de ISR e IVA, y generar el timbrado automático.

## Estructura del Módulo

```
ConstanciasDeRetencion/
├── components/
│   ├── ReceptorPeriodoForm.vue    # Formulario de receptor y periodo
│   ├── RetencionesForm.vue        # Gestión de retenciones con cálculo automático
│   ├── RetencionPreview.vue       # Vista previa antes de timbrar
│   └── RetencionModal.vue         # Modal orquestador con navegación
├── composables/
│   └── useRetencionActions.ts     # Lógica de negocio y acciones
├── store/
│   └── retencionStore.ts          # Estado global del módulo
├── types/
│   └── retencionTypes.ts          # Definiciones de tipos TypeScript
├── validations/
│   └── retencionValidation.ts     # Validaciones con Zod
├── views/
│   └── RetencionView.vue          # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Flujo de Generación (3 Pasos)

#### **Paso 1: Receptor y Periodo**
- Búsqueda de proveedores existentes
- Captura de datos del receptor:
  - RFC (12-13 caracteres)
  - Razón Social
  - Régimen Fiscal
  - Código Postal
- Selección del periodo:
  - Mes
  - Año

#### **Paso 2: Detalle de Retenciones**
- Selección de concepto de retención
- Captura de base de cálculo
- **Cálculo automático** de:
  - Retención ISR (10%)
  - Retención IVA (según concepto)
  - Total retenido
- Gestión de retenciones:
  - Agregar múltiples retenciones
  - Eliminar retenciones
  - Ver totales acumulados

#### **Paso 3: Vista Previa**
- Resumen completo de la constancia
- Información del receptor
- Periodo de la constancia
- Detalle de todas las retenciones
- Totales:
  - Total ISR retenido
  - Total IVA retenido
  - Total general retenido

### 2. Conceptos de Retención Soportados

Cada concepto tiene tasas predefinidas:

| Concepto | Tasa ISR | Tasa IVA |
|----------|----------|----------|
| Servicios Profesionales | 10% | 10.6667% |
| Arrendamiento | 10% | 10.6667% |
| Honorarios | 10% | 10.6667% |
| Intereses | 10% | 0% |
| Dividendos | 10% | 0% |

### 3. Cálculo Automático

El sistema calcula automáticamente:
- **Retención ISR** = Base de Cálculo × Tasa ISR
- **Retención IVA** = Base de Cálculo × Tasa IVA
- **Total Retenido** = Retención ISR + Retención IVA

**Ejemplo:**
- Base de Cálculo: $10,000.00
- Concepto: Servicios Profesionales
- Retención ISR: $10,000 × 0.10 = $1,000.00
- Retención IVA: $10,000 × 0.106667 = $1,066.67
- Total Retenido: $2,066.67

## Tipos de Datos

### RetencionType
```typescript
{
    id: string
    concepto: string
    baseCalculo: number
    tasaISR: number
    montoISR: number
    tasaIVA: number
    montoIVA: number
    total: number
}
```

### ConstanciaFormType
```typescript
{
    rfc: string
    razonSocial: string
    regimenFiscal: string
    codigoPostal: string
    mes: string
    anio: string
    retenciones: RetencionType[]
}
```

### ConstanciaGeneradaType
```typescript
{
    id: number
    folio: string
    uuid: string
    receptor: string
    periodo: string
    totalRetenido: number
    fecha: string
    estatus: 'Vigente' | 'Cancelada'
}
```

## Store de Pinia

El store gestiona:
- **Paso actual** del flujo (receptor, retenciones, preview)
- **Datos del formulario** completo
- **Lista de retenciones** agregadas
- **Cálculo de totales** automático

Acciones principales:
- `setCurrentStep()`: Cambiar paso actual
- `setFormData()`: Actualizar datos del formulario
- `addRetencion()`: Agregar retención
- `removeRetencion()`: Eliminar retención
- `calculateTotales()`: Calcular totales de ISR, IVA y total
- `reset()`: Resetear todo el estado

## Componentes

### ReceptorPeriodoForm
Formulario del paso 1:
- Buscador de proveedores
- Campos del receptor con validación
- Selector de mes y año
- Integración con componentes base

### RetencionesForm
Formulario del paso 2 con características especiales:
- **Selector de concepto** con catálogo predefinido
- **Input de base de cálculo**
- **Cálculo automático en tiempo real**:
  - Muestra preview del cálculo antes de agregar
  - Actualiza al cambiar concepto o monto
- **Tabla de retenciones agregadas**:
  - Muestra todas las retenciones
  - Permite eliminar individualmente
  - Calcula totales acumulados
- **Totales dinámicos**:
  - Total ISR
  - Total IVA
  - Total general

### RetencionPreview
Vista previa completa:
- Sección de receptor con todos los datos
- Periodo formateado
- Lista de retenciones con desglose
- Totales destacados en tarjeta especial
- Alerta de advertencia antes de timbrar

### RetencionModal
Modal orquestador:
- Navegación entre 3 pasos
- Indicador de progreso visual
- Título dinámico según paso
- Validación antes de avanzar
- Botones contextuales
- Sincronización con store

### RetencionView
Vista principal:
- Tarjetas de estadísticas:
  - Total constancias
  - Constancias vigentes
  - Total retenido
- Tabla de constancias generadas
- Acciones: PDF, XML, Cancelar
- Estados de carga y vacío

## Validaciones

### Paso 1: Receptor y Periodo
- **RFC**: 12-13 caracteres
- **Razón Social**: Requerida
- **Régimen Fiscal**: Requerido
- **Código Postal**: Exactamente 5 dígitos
- **Mes**: Requerido
- **Año**: Requerido

### Paso 2: Retenciones
- **Al menos 1 retención** agregada
- **Concepto**: Requerido
- **Base de Cálculo**: Mayor a 0

### Paso 3: Vista Previa
- Revisión final sin validaciones adicionales

## Acciones Disponibles

- `getConceptosRetenciones()`: Obtener catálogo de conceptos
- `getConstanciasGeneradas()`: Obtener constancias ya generadas
- `generarConstancia()`: Generar y timbrar constancia
- `cancelarConstancia()`: Cancelar constancia vigente
- `descargarPDF()`: Descargar PDF de la constancia
- `descargarXML()`: Descargar XML de la constancia

## Flujo de Trabajo

### Generación de Constancia

1. **Usuario hace click en "Nueva Constancia"**
   - Se abre el modal en paso 1

2. **Usuario completa datos del receptor**
   - Puede buscar proveedor existente
   - Completa RFC, razón social, régimen, CP
   - Selecciona mes y año
   - Click en "Siguiente"

3. **Usuario agrega retenciones**
   - Selecciona concepto
   - Ingresa base de cálculo
   - Ve cálculo automático en tiempo real
   - Click en "Agregar Retención"
   - Repite para múltiples retenciones
   - Click en "Siguiente"

4. **Usuario revisa vista previa**
   - Verifica todos los datos
   - Ve totales calculados
   - Click en "Generar y Timbrar"

5. **Sistema genera y timbra**
   - Se envía al PAC para timbrado
   - Se genera UUID
   - Se muestra notificación de éxito
   - Se actualiza la lista

## Regímenes Fiscales Soportados

- **612**: Personas Físicas con Actividades Empresariales
- **605**: Sueldos y Salarios
- **606**: Arrendamiento
- **621**: Incorporación Fiscal
- **601**: General de Ley Personas Morales

## Meses del Año

- 01 - Enero
- 02 - Febrero
- 03 - Marzo
- 04 - Abril
- 05 - Mayo
- 06 - Junio
- 07 - Julio
- 08 - Agosto
- 09 - Septiembre
- 10 - Octubre
- 11 - Noviembre
- 12 - Diciembre

## Características de UX

- **Cálculo automático en tiempo real** de retenciones
- **Preview del cálculo** antes de agregar
- **Navegación fluida** entre pasos
- **Indicador de progreso** visual
- **Validación progresiva** por paso
- **Totales dinámicos** que se actualizan automáticamente
- **Tabla interactiva** de retenciones
- **Feedback visual** de estados
- **Alertas contextuales** y advertencias
- **Descarga directa** de PDF y XML

## Integración con Otros Módulos

- **Proveedores**: Búsqueda de receptores
- **Contabilidad**: Registro de retenciones
- **Facturación**: CFDIs relacionados
- **Reportes**: Análisis de retenciones

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend y PAC
- El timbrado es simulado (debe integrarse con PAC real)
- Los conceptos y tasas están predefinidos según normativa SAT
- El cálculo es automático y no editable

## Mejoras Futuras

- [ ] Más conceptos de retención
- [ ] Tasas configurables por empresa
- [ ] Importación de proveedores
- [ ] Plantillas de constancias
- [ ] Generación masiva
- [ ] Envío automático por correo
- [ ] Recordatorios de generación mensual
- [ ] Dashboard de retenciones
- [ ] Reportes anuales
- [ ] Integración con DIOT
- [ ] Conciliación con declaraciones
- [ ] Exportación a Excel
- [ ] Firma electrónica
- [ ] Workflow de aprobación

## Normativa SAT

### Constancia de Retención
- Versión: 2.0
- Uso: Informar retenciones efectuadas
- Obligatorio: Mensualmente
- Plazo: Antes del día 15 del mes siguiente

### Información Requerida
- RFC del receptor
- Periodo de la retención
- Concepto de retención
- Base de cálculo
- Monto retenido de ISR
- Monto retenido de IVA (si aplica)

### Tasas de Retención
Las tasas varían según el concepto:
- **Servicios Profesionales**: ISR 10%, IVA 10.6667%
- **Arrendamiento**: ISR 10%, IVA 10.6667%
- **Honorarios**: ISR 10%, IVA 10.6667%
- **Intereses**: ISR 10%, sin IVA
- **Dividendos**: ISR 10%, sin IVA

## Seguridad

- Validación de permisos por rol
- Auditoría de constancias generadas
- Registro de cancelaciones
- Validación de montos y fechas
- Prevención de duplicados por periodo
- Encriptación de datos sensibles

## Mejores Prácticas

1. **Generar mensualmente** dentro del plazo
2. **Verificar datos del receptor** antes de generar
3. **Revisar cálculos** en la vista previa
4. **Mantener respaldo** de XML y PDF
5. **Enviar al proveedor** inmediatamente
6. **Conciliar** con declaraciones mensuales
7. **Documentar** conceptos especiales

## Cálculos Importantes

### Retención ISR
```
Retención ISR = Base de Cálculo × 0.10
```

### Retención IVA (Servicios Profesionales)
```
Retención IVA = Base de Cálculo × 0.106667
```

### Total Retenido
```
Total = Retención ISR + Retención IVA
```

## Soporte

Para dudas sobre constancias de retención:
- Consultar documentación del SAT
- Revisar catálogos actualizados
- Validar tasas vigentes
- Contactar soporte técnico
- Verificar con contador

## Ejemplo de Uso

**Escenario**: Pago de servicios profesionales por $10,000

1. Crear nueva constancia
2. Capturar datos del proveedor
3. Seleccionar periodo (Enero 2024)
4. Agregar retención:
   - Concepto: Servicios Profesionales
   - Base: $10,000.00
   - Sistema calcula:
     - ISR: $1,000.00
     - IVA: $1,066.67
     - Total: $2,066.67
5. Revisar y generar
6. Descargar y enviar al proveedor

El proveedor recibirá $10,000 - $2,066.67 = $7,933.33

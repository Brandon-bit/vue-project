# Módulo de Generación de Complementos

## Descripción
Módulo completo para la generación de complementos de CFDI 4.0, incluyendo complementos de pago (REP) y carta porte. Permite seleccionar un CFDI origen, capturar los datos del complemento y generar el timbrado automático.

## Estructura del Módulo

```
GeneracionDeComplementos/
├── components/
│   ├── ComplementTypeSelector.vue    # Selector de tipo de complemento
│   ├── CFDISelector.vue              # Búsqueda y selección de CFDI origen
│   ├── PaymentComplementForm.vue     # Formulario de complemento de pago
│   ├── ComplementPreview.vue         # Vista previa antes de timbrar
│   └── ComplementModal.vue           # Modal orquestador con navegación
├── composables/
│   └── useComplementActions.ts       # Lógica de negocio y acciones
├── store/
│   └── complementStore.ts            # Estado global del módulo
├── types/
│   └── complementTypes.ts            # Definiciones de tipos TypeScript
├── views/
│   └── ComplementView.vue            # Vista principal del módulo
└── README.md
```

## Características Principales

### 1. Tipos de Complementos Soportados

#### **Complemento de Pago (REP)**
- Recepción de pagos para facturas con método PPD
- Captura de información bancaria
- Cálculo automático de saldos
- Soporte para múltiples formas de pago
- Información de cuentas ordenante y beneficiaria

#### **Carta Porte**
- Transporte de mercancías
- En desarrollo (estructura preparada)

### 2. Flujo de Generación (3 Pasos)

#### **Paso 1: Selección de CFDI Origen**
- Búsqueda de CFDIs disponibles
- Filtro por folio, UUID o receptor
- Vista de CFDIs pendientes de complemento
- Información pre-cargada del CFDI seleccionado

#### **Paso 2: Captura de Datos**
- Formulario específico según tipo de complemento
- Datos del CFDI origen pre-cargados y bloqueados
- Validación en tiempo real
- Campos opcionales para información bancaria

#### **Paso 3: Vista Previa**
- Resumen completo de la información
- Validación final antes de timbrar
- Cálculo de saldos pendientes
- Alertas y advertencias

### 3. Complemento de Pago - Campos

**Información Obligatoria:**
- Fecha de pago
- Forma de pago (catálogo SAT)
- Monto del pago
- Moneda

**Información Opcional:**
- Banco ordenante
- Cuenta ordenante (últimos 4 dígitos)
- Banco beneficiario
- Cuenta beneficiaria (últimos 4 dígitos)
- Número de operación/referencia

## Tipos de Datos

### ComplementTypeEnum
```typescript
type ComplementTypeEnum = 'pago' | 'cartaporte' | ''
```

### CFDIDisponibleType
```typescript
{
    id: string
    folio: string
    uuid: string
    receptor: string
    fecha: string
    total: number
    metodoPago: string
}
```

### ComplementoPagoFormType
```typescript
{
    cfdiRelacionado: CFDIDisponibleType | null
    fechaPago: string
    formaPago: string
    montoPago: number
    moneda: string
    bancoOrdenante?: string
    cuentaOrdenante?: string
    bancoBeneficiario?: string
    cuentaBeneficiaria?: string
    numeroOperacion?: string
}
```

### ComplementoGeneradoType
```typescript
{
    id: number
    tipo: 'pago' | 'cartaporte'
    folio: string
    uuid: string
    cfdiRelacionado: string
    fecha: string
    estatus: 'Vigente' | 'Cancelado'
}
```

## Store de Pinia

El store gestiona:
- **Tipo de complemento** seleccionado
- **Paso actual** del flujo (seleccion, formulario, preview)
- **CFDI seleccionado** como origen
- **Datos del formulario** según el tipo
- **Navegación** entre pasos

Acciones principales:
- `setTipoComplemento()`: Establecer tipo de complemento
- `setCurrentStep()`: Cambiar paso actual
- `setCfdiSeleccionado()`: Seleccionar CFDI origen
- `setFormDataPago()`: Actualizar datos del formulario
- `reset()`: Resetear todo el estado

## Componentes

### ComplementTypeSelector
Selector visual de tipo de complemento:
- Tarjetas grandes con iconos
- Complemento de Pago (activo)
- Carta Porte (activo)
- Otros (deshabilitado - próximamente)

### CFDISelector
Búsqueda y selección de CFDI origen:
- Buscador en tiempo real
- Lista de CFDIs disponibles
- Información completa de cada CFDI
- Estados de carga y vacío
- Selección con un click

### PaymentComplementForm
Formulario de complemento de pago:
- Sección de CFDI origen (pre-cargado y bloqueado)
- Campos obligatorios del pago
- Sección opcional de información bancaria
- Validación con vee-validate y Zod
- Integración con componentes base

### ComplementPreview
Vista previa antes de timbrar:
- Resumen del CFDI relacionado
- Información completa del pago
- Información bancaria (si existe)
- Cálculo de saldo pendiente
- Alertas de advertencia

### ComplementModal
Modal orquestador principal:
- Navegación entre componentes
- Título dinámico según paso
- Botones Anterior/Siguiente
- Validación antes de avanzar
- Botón "Generar y Timbrar" en paso final
- Sincronización con store

### ComplementView
Vista principal del módulo:
- Tarjetas de estadísticas
- Listado de complementos generados
- Acciones: Descargar PDF, XML, Cancelar
- Filtros y búsqueda
- Estados de carga y vacío

## Acciones Disponibles

- `getCFDIsDisponibles()`: Obtener CFDIs pendientes de complemento
- `getComplementosGenerados()`: Obtener complementos ya generados
- `generarComplementoPago()`: Generar y timbrar complemento de pago
- `generarComplementoCartaPorte()`: Generar complemento de carta porte
- `cancelarComplemento()`: Cancelar complemento vigente
- `descargarPDF()`: Descargar PDF del complemento
- `descargarXML()`: Descargar XML del complemento

## Flujo de Trabajo

### Generación de Complemento de Pago

1. **Usuario hace click en "Nuevo Complemento"**
   - Se abre el modal
   - Se muestra selector de tipo

2. **Usuario selecciona "Complemento de Pago"**
   - Se activa el tipo
   - Se cambia al paso de selección de CFDI

3. **Usuario busca y selecciona CFDI origen**
   - Puede buscar por folio, UUID o receptor
   - Click en "Seleccionar" de un CFDI
   - Se pre-cargan los datos del CFDI
   - Se avanza al formulario

4. **Usuario completa datos del pago**
   - Fecha de pago
   - Forma de pago
   - Monto del pago
   - Moneda
   - Opcionalmente: información bancaria
   - Click en "Siguiente"

5. **Usuario revisa vista previa**
   - Verifica toda la información
   - Ve el cálculo de saldo pendiente
   - Click en "Generar y Timbrar"

6. **Sistema genera y timbra**
   - Se envía al PAC para timbrado
   - Se genera UUID
   - Se muestra notificación de éxito
   - Se cierra el modal
   - Se actualiza la lista

## Validaciones

### Paso 1: Selección de CFDI
- Debe seleccionar un CFDI antes de continuar

### Paso 2: Formulario de Pago
- **Fecha de pago**: Requerida
- **Forma de pago**: Requerida (catálogo SAT)
- **Monto del pago**: Requerido, mayor a 0
- **Moneda**: Requerida
- **Cuenta ordenante**: Máximo 4 dígitos (opcional)
- **Cuenta beneficiaria**: Máximo 4 dígitos (opcional)

### Paso 3: Vista Previa
- Revisión final, sin validaciones adicionales

## Integración con Otros Módulos

- **Facturación**: CFDIs origen para complementos
- **Clientes**: Información del receptor
- **Contabilidad**: Registro de pagos recibidos
- **Reportes**: Análisis de complementos generados

## Formas de Pago (Catálogo SAT)

- **01**: Efectivo
- **02**: Cheque nominativo
- **03**: Transferencia electrónica de fondos
- **04**: Tarjeta de crédito
- **28**: Tarjeta de débito

## Monedas Soportadas

- **MXN**: Peso Mexicano
- **USD**: Dólar Americano
- **EUR**: Euro

## Características de UX

- **Selector visual** de tipo de complemento
- **Búsqueda en tiempo real** de CFDIs
- **Navegación fluida** entre pasos
- **Validación progresiva** por paso
- **Vista previa completa** antes de timbrar
- **Feedback visual** de estados
- **Alertas contextuales** y advertencias
- **Cálculo automático** de saldos
- **Descarga directa** de PDF y XML

## Notas de Implementación

- Los datos actualmente son simulados en el composable
- Para producción, conectar con API backend y PAC
- El timbrado es simulado (debe integrarse con PAC real)
- Los CFDIs disponibles deben filtrarse por método PPD
- La cancelación requiere integración con SAT

## Mejoras Futuras

- [ ] Complemento de Carta Porte completo
- [ ] Otros tipos de complementos
- [ ] Aplicación de múltiples pagos a un CFDI
- [ ] Pagos parciales con seguimiento
- [ ] Conciliación automática de pagos
- [ ] Recordatorios de pagos pendientes
- [ ] Integración con bancos (API bancaria)
- [ ] Estados de cuenta automáticos
- [ ] Reportes de cobranza
- [ ] Dashboard de pagos recibidos
- [ ] Notificaciones automáticas al cliente
- [ ] Plantillas de complementos
- [ ] Importación masiva de pagos
- [ ] Exportación a Excel
- [ ] Integración con ERP

## Normativa SAT

### Complemento de Pago (REP)
- Versión: 2.0
- Uso: Facturas con método de pago PPD
- Obligatorio: Cuando se recibe el pago
- Plazo: Dentro del mes en que se recibe el pago

### Información Requerida
- UUID del CFDI relacionado
- Monto pagado
- Forma de pago
- Fecha de pago
- Moneda

### Información Opcional pero Recomendada
- Número de operación
- RFC del banco emisor
- Cuenta ordenante
- RFC del banco receptor
- Cuenta beneficiaria

## Seguridad

- Validación de permisos por rol
- Auditoría de complementos generados
- Registro de cancelaciones
- Encriptación de información bancaria
- Validación de montos y fechas
- Prevención de duplicados

## Mejores Prácticas

1. **Verificar datos del CFDI origen** antes de generar
2. **Capturar información bancaria completa** para mejor control
3. **Generar complemento inmediatamente** al recibir el pago
4. **Enviar automáticamente** al cliente
5. **Mantener respaldo** de XML y PDF
6. **Conciliar regularmente** con estados de cuenta
7. **Documentar pagos parciales** adecuadamente

## Soporte

Para dudas sobre complementos de pago:
- Consultar documentación del SAT
- Revisar catálogos actualizados
- Validar con el PAC
- Contactar soporte técnico

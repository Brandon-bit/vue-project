POST:
{
    fecha:
    auditorId:
    notaGeneral:
    calificacion:
    productos: [
        {
            productoId: 1,
            conteoReal: 2,
            conteoEsperado: 3 
            diferencia: -1,
            nota: 'Nota de producto 1'
        },
        {
            productoId: 1,
            conteoReal: 2,
            conteoEsperado: 3,
            diferencia: -1,
            nota: 'Nota de producto 1'
        }
    ]
}


GET:

[
    {
        fecha: '',
        idAuditor: 1,
        nombreAuditor: 'El auditor',
        NotaGeneral: '',
        calificacion: 2,
        productosAuditados: 30,
    },
    {
        fecha: '',
        idAuditor: 1,
        nombreAuditor: 'El auditor',
        NotaGeneral: '',
        calificacion: 3,
        productosAuditados: 30,
        diferenciaTotal: 20
    }
]

Diferencia Total: 
La diferencia total (sumatoria de todas las diferencias de los productos auditados,
positiva o negativa) en esa auditoría.


GET/:ID:
[
    {
        nombreProducto: 'Mi producto 1',
        conteoReal: 2,
        conteoEsperado: 3,
        diferencia: -1,
        nota: 'Nota de producto 1'
    },
    {
        nombreProducto: 'Mi producto 2',
        conteoReal: 2,
        conteoEsperado: 3,
        diferencia: -1,
        nota: 'Nota de producto 1'
    }
]


PUT:
{
    id:
    notaGeneral:
}



Campos generales de "Crear auditoría":

Fecha
Auditor
Nota General

Campos por repetir:

Resumen de la Tabla de Auditoría de Inventarios:
Producto    Conteo Real    Conteo Esperado    Diferencia    Nota por Producto    Acción
Producto A  10              12                -2            Faltante	         [Eliminar]
Producto B  5               5                 0             -                    [Eliminar]
Producto C  20              18                +2            Sobrado              [Eliminar]
Total                                         0

--------------------------------------------------------------------------------------------
Tabla de "Auditoría de inventarios":
Fecha
Auditor
Nota general
Número de productos auditados
Diferencia Total: La diferencia total (sumatoria de todas las diferencias de los productos auditados, positiva o negativa) en esa auditoría.

Fecha: Esta es la fecha en que se realizó la auditoría, y la tabla debería mostrarla en formato dd/mm/yyyy.

Auditor: Nombre del usuario o auditor que realizó la auditoría. Esto te da contexto sobre quién llevó a cabo el proceso.

Nota General: Si se agregó alguna nota general a la auditoría, la muestra aquí. Es útil para mostrar si hubo algún comentario importante sobre todo el proceso de auditoría.

Productos Auditados: El número total de productos auditados en esa auditoría. Esto da una idea rápida de la magnitud de la auditoría. Este número se calcula automáticamente en función de la cantidad de productos registrados en esa auditoría.

Diferencia Total: Este es el valor más importante que muestra un resumen de cómo fue la auditoría en términos de diferencia total entre el inventario real y el esperado:

Si la diferencia es positiva (+), significa que el inventario físico es superior al esperado (sobrantes).

Si la diferencia es negativa (-), significa que el inventario físico es inferior al esperado (faltantes).

Si la diferencia es 0, significa que el inventario concuerda perfectamente con lo esperado.
---------------------------------------------------------------------------------------------------
Acción (Ver Detalles): Un enlace o botón para que el usuario pueda hacer clic y ver los detalles completos de esa auditoría, con los productos y las diferencias individuales. Esto te permitirá mostrar los productos auditados, sus diferencias y las notas específicas para cada uno.

-------------------------------------------------------------------
Campos generales de "Crear pedido":
Proveedor
fecha

Campos por repetir:
igual que el POS.

------------------------------------------



POST:
{
    idProveedor:
    fecha:
    productos: [
        {
            productoId: 1,
            cantidad: 2,
        },
        {
            productoId: 1,
            cantidad: 2,
        },
        {
            productoId: 1,
            cantidad: 2,
        }
    ]
}


GET:

[
    {
        folio: '',
        proveedor: 1,
        fecha: 'El auditor',
        totalProductos: 20,
        estado: ''
    },
    {
        folio: '',
        proveedor: 1,
        fecha: 'El auditor',
        estado: '',
        totalProductos: 20
    }
]


GET/:ID:
[
    {
        productoId: 1,
        cantidad: 2,
        precioTotal: 100.00
    },
    {
        productoId: 1,
        cantidad: 2,
        precioTotal: 1000.00
    }
]


POST:
{
    id:
    tipo:
}



GET:

[
    {
        folio: '',
        proveedor: 1,
        fecha: 'El auditor'
    },
    {
        folio: '',
        proveedor: 1,
        fecha: 'El auditor'
    }
]

export type SupplierType = {
    id: number
    nombre: string
    rfc: string
    categoria: string
    estatus: 'Activo' | 'Inactivo' | 'Suspendido'
    puntuacion: number
    ordenes: number
    montoTotal: number
    telefono?: string
    email?: string
    banco?: string
    clabe?: string
    direccion?: string
    contactoPrincipal?: string
    fechaRegistro: string
    ultimaCompra?: string
}

export type SupplierFormType = {
    nombre: string
    rfc: string
    categoria: string
    telefono: string
    email: string
    banco: string
    clabe: string
    direccion?: string
    contactoPrincipal?: string
}

export type SupplierStatsType = {
    totalProveedores: number
    proveedoresActivos: number
    categorias: number
    promedioCalificacion: number
}

export type SupplierOrderHistoryType = {
    id: number
    folio: string
    fecha: string
    monto: number
    estatus: string
}

export type SupplierEvaluationType = {
    calidad: number
    tiempoEntrega: number
    precio: number
    servicio: number
    promedio: number
}

export type SupplierDocumentType = {
    id: number
    nombre: string
    tipo: string
    fechaSubida: string
    url: string
}

export type SupplierCategoryType = 'Materiales' | 'Servicios' | 'Tecnología' | 'Insumos' | 'Otros'

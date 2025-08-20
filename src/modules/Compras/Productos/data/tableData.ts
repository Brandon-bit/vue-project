import { useUserActions } from '../composables/useProductActions'
import { h, withDirectives, resolveDirective } from 'vue'

export const columns = [
    {
        header: 'SKU',
        accessorKey: 'SKU'
    },
    {
        header: 'Nombre',
        accessorKey: 'ProductName'
    },
    {
        header: 'Categoría',
        accessorKey: 'Category'
    },
    {
        header: 'Marca',
        accessorKey: 'Brand'
    },
    {
        header: 'Precio',
        accessorKey: 'Price'
    },
    {
        header: 'Unidad',
        accessorKey: 'Unit'
    },
    {
        header: 'Cantidad',
        accessorKey: 'Quantity'
    },
    {
        header: 'Acciones',
        accessorKey: '',
        cell: ({ row }: any) => {
            const data = row.original

            const { showInfo, edit, toggleStatus, deleteData } = useUserActions()
            const tooltip = resolveDirective('tooltip')

            
            return h('div', { class: 'flex gap-4 justify-center' }, [
                withDirectives(
                    h(
                        'button',
                        {
                            class: 'btn btn-outline btn-info table-icon-btn',
                            onClick: () => showInfo(data)
                        },
                        [h('span', { class: 'material-symbols-outlined' }, 'info')]
                    ),
                    [[tooltip, 'Más información']]
                ),
                withDirectives(
                    h(
                        'button',
                        {
                            class: 'btn btn-outline btn-primary table-icon-btn',
                            onClick: () => edit(data)
                        },
                        h('span', { class: 'material-symbols-outlined' }, 'edit_square')
                    ),
                    [[tooltip, 'Editar']]
                ),
                withDirectives(
                    h(
                        'button',
                        {
                            class: 'btn btn-outline btn-success table-icon-btn',
                            onClick: () => toggleStatus(data)
                        },
                        h('span', { class: 'material-symbols-outlined' }, 'toggle_on')
                    ),
                    [[tooltip, 'Cambiar estado']]
                ),
                withDirectives(
                    h(
                        'button',
                        {
                            class: 'btn btn-outline btn-error table-icon-btn',
                            onClick: () => deleteData(data)
                        },
                        h('span', { class: 'material-symbols-outlined' }, 'delete')
                    ),
                    [[tooltip, 'Eliminar']]
                )
            ])
        }
    }
]

export const data = [
    {
        SKU: 'SKU001',
        ProductName: 'Camiseta básica',
        Category: 'Ropa',
        Brand: 'MarcaA',
        Price: 15.99,
        Unit: 'pieza',
        Quantity: 100
    },
    {
        SKU: 'SKU002',
        ProductName: 'Pantalón jeans',
        Category: 'Ropa',
        Brand: 'MarcaB',
        Price: 35.5,
        Unit: 'pieza',
        Quantity: 60
    },
    {
        SKU: 'SKU003',
        ProductName: 'Zapatos deportivos',
        Category: 'Calzado',
        Brand: 'MarcaC',
        Price: 50.0,
        Unit: 'par',
        Quantity: 40
    },
    {
        SKU: 'SKU004',
        ProductName: 'Bolsa de cuero',
        Category: 'Accesorios',
        Brand: 'MarcaD',
        Price: 45.75,
        Unit: 'pieza',
        Quantity: 30
    },
    {
        SKU: 'SKU005',
        ProductName: 'Reloj digital',
        Category: 'Electrónica',
        Brand: 'MarcaE',
        Price: 120.0,
        Unit: 'pieza',
        Quantity: 20
    },
    {
        SKU: 'SKU006',
        ProductName: 'Auriculares Bluetooth',
        Category: 'Electrónica',
        Brand: 'MarcaF',
        Price: 80.99,
        Unit: 'pieza',
        Quantity: 25
    },
    {
        SKU: 'SKU007',
        ProductName: 'Camisa formal',
        Category: 'Ropa',
        Brand: 'MarcaG',
        Price: 25.0,
        Unit: 'pieza',
        Quantity: 50
    },
    {
        SKU: 'SKU008',
        ProductName: 'Pantalones cortos',
        Category: 'Ropa',
        Brand: 'MarcaH',
        Price: 20.0,
        Unit: 'pieza',
        Quantity: 70
    },
    {
        SKU: 'SKU009',
        ProductName: 'Gorra deportiva',
        Category: 'Accesorios',
        Brand: 'MarcaI',
        Price: 12.99,
        Unit: 'pieza',
        Quantity: 80
    },
    {
        SKU: 'SKU010',
        ProductName: 'Mochila urbana',
        Category: 'Accesorios',
        Brand: 'MarcaJ',
        Price: 60.0,
        Unit: 'pieza',
        Quantity: 15
    },
    {
        SKU: 'SKU011',
        ProductName: 'Camisa polo',
        Category: 'Ropa',
        Brand: 'MarcaK',
        Price: 22.5,
        Unit: 'pieza',
        Quantity: 45
    },
    {
        SKU: 'SKU012',
        ProductName: 'Calcetines deportivos',
        Category: 'Ropa',
        Brand: 'MarcaL',
        Price: 8.99,
        Unit: 'par',
        Quantity: 120
    },
    {
        SKU: 'SKU013',
        ProductName: 'Chaqueta impermeable',
        Category: 'Ropa',
        Brand: 'MarcaM',
        Price: 55.0,
        Unit: 'pieza',
        Quantity: 35
    },
    {
        SKU: 'SKU014',
        ProductName: 'Gafas de sol',
        Category: 'Accesorios',
        Brand: 'MarcaN',
        Price: 30.0,
        Unit: 'pieza',
        Quantity: 40
    },
    {
        SKU: 'SKU015',
        ProductName: 'Zapatos formales',
        Category: 'Calzado',
        Brand: 'MarcaO',
        Price: 75.0,
        Unit: 'par',
        Quantity: 25
    }
]

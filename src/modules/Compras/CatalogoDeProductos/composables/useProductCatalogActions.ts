import type { ProductType, ProductFormType, CatalogStatsType } from '@/modules/Compras/CatalogoDeProductos/types/productCatalogTypes'

// Mock data
const mockProducts: ProductType[] = [
    {
        id: 1,
        code: 'MAT-001',
        name: 'Resma de Papel Bond',
        category: 'Papelería',
        unit: 'Pza',
        estimatedCost: 85.00,
        preferredSupplier: 'Distribuidora Nacional',
        accountingAccount: '5101',
        description: 'Resma de 500 hojas tamaño carta'
    },
    {
        id: 2,
        code: 'TEC-015',
        name: 'Laptop Dell Latitude 5420',
        category: 'Tecnología',
        unit: 'Pza',
        estimatedCost: 18500.00,
        preferredSupplier: 'Tech Solutions',
        accountingAccount: '5102',
        description: 'Laptop empresarial con Windows 11 Pro'
    },
    {
        id: 3,
        code: 'SRV-008',
        name: 'Mantenimiento de Equipo Industrial',
        category: 'Servicios',
        unit: 'Servicio',
        estimatedCost: 3500.00,
        preferredSupplier: 'Servicios Industriales',
        accountingAccount: '5103',
        description: 'Mantenimiento preventivo mensual'
    },
    {
        id: 4,
        code: 'MAT-045',
        name: 'Tóner para Impresora HP',
        category: 'Papelería',
        unit: 'Pza',
        estimatedCost: 1200.00,
        preferredSupplier: 'Distribuidora Nacional',
        accountingAccount: '5101',
        description: 'Tóner original HP 85A'
    },
    {
        id: 5,
        code: 'MAT-002',
        name: 'Plumas de Tinta Negra',
        category: 'Papelería',
        unit: 'Caja',
        estimatedCost: 120.00,
        preferredSupplier: 'Distribuidora Nacional',
        accountingAccount: '5101',
        description: 'Caja con 12 plumas'
    },
    {
        id: 6,
        code: 'TEC-020',
        name: 'Monitor LG 27 pulgadas',
        category: 'Tecnología',
        unit: 'Pza',
        estimatedCost: 4500.00,
        preferredSupplier: 'Tech Solutions',
        accountingAccount: '5102',
        description: 'Monitor Full HD con entrada HDMI'
    }
]

export const useProductCatalogActions = () => {
    const getProducts = async (): Promise<ProductType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return mockProducts
    }

    const getProductById = async (id: number): Promise<ProductType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockProducts.find(product => product.id === id) || null
    }

    const getCatalogStats = async (): Promise<CatalogStatsType> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const categories = new Set(mockProducts.map(p => p.category))
        const suppliers = new Set(mockProducts.map(p => p.preferredSupplier))
        const totalValue = mockProducts.reduce((sum, p) => sum + p.estimatedCost, 0)
        
        return {
            totalItems: mockProducts.length,
            totalCategories: categories.size,
            totalSuppliers: suppliers.size,
            estimatedValue: totalValue
        }
    }

    const createProduct = async (data: ProductFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating product:', data)
        
        return {
            message: 'Producto agregado al catálogo correctamente',
            status: 'success'
        }
    }

    const updateProduct = async (id: number, data: ProductFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating product:', id, data)
        
        return {
            message: 'Producto actualizado correctamente',
            status: 'success'
        }
    }

    const deleteProduct = async (id: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Deleting product:', id)
        
        return {
            message: 'Producto eliminado del catálogo',
            status: 'success'
        }
    }

    return {
        getProducts,
        getProductById,
        getCatalogStats,
        createProduct,
        updateProduct,
        deleteProduct
    }
}

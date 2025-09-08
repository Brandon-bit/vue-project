export type Product = {
    id: number;
    name: string;
    code: string;
    price: number;
    stock: number;
    brandId: string;
    categoryId: number;
    storeId: string;
    warehouseId: string;
}

export type Store = {
    id: string;
    label: string;
}

export type Warehouse = {
    id: string;
    label: string;
}

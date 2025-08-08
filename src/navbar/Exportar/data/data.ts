import type { User, UserHeader } from '../types/User.ts'


export const data: User[] = [
    { id: 1, nombre: 'Juan', edad: 28, ciudad: 'Lima', estado: 'Activo' },
    { id: 2, nombre: 'Ana', edad: 32, ciudad: 'Bogotá', estado: 'Inactivo' },
    { id: 3, nombre: 'Luis', edad: 24, ciudad: 'Santiago', estado: 'Activo' },
    { id: 4, nombre: 'Carla', edad: 29, ciudad: 'Quito', estado: 'Activo' },
    { id: 5, nombre: 'Pedro', edad: 35, ciudad: 'Montevideo', estado: 'Inactivo' },
    { id: 6, nombre: 'Lucía', edad: 27, ciudad: 'Buenos Aires', estado: 'Activo' },
    { id: 7, nombre: 'Marco', edad: 31, ciudad: 'Caracas', estado: 'Activo' },
    { id: 8, nombre: 'Sofía', edad: 26, ciudad: 'La Paz', estado: 'Activo' },
    { id: 9, nombre: 'Diego', edad: 33, ciudad: 'Asunción', estado: 'Inactivo' },
    { id: 10, nombre: 'Elena', edad: 30, ciudad: 'Ciudad de México', estado: 'Activo' },
    { id: 6, nombre: 'Margaro', edad: 27, ciudad: 'Buenos Aires', estado: 'Activo' },
    { id: 7, nombre: 'Mariana', edad: 31, ciudad: 'Caracas', estado: 'Activo' },
    { id: 8, nombre: 'Alejandra', edad: 26, ciudad: 'La Paz', estado: 'Activo' },
    { id: 9, nombre: 'Ramiro', edad: 33, ciudad: 'Asunción', estado: 'Inactivo' },
    { id: 10, nombre: 'Karla', edad: 30, ciudad: 'Ciudad de México', estado: 'Activo' }
]

export const headers: UserHeader[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre'
    },
    {
        accessorKey: 'edad',
        header: 'Edad'
    },
    {
        accessorKey: 'ciudad',
        header: 'Ciudad'
    },
    {
        accessorKey: 'estado',
        header: 'Estado'
    }
]

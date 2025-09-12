import { z } from 'zod';

/**
 * Validador reutilizable para los campos <select>.
 * Los selects en HTML envían valores como texto ('1', '2', etc.) o a veces vacíos.
 * Esta función se encarga de "limpiar" ese valor antes de validarlo.
 */
const selectValidator = (message: string) =>
    z.preprocess(
        // 1. PRIMERO, se ejecuta esta función de pre-proceso:
        (value) => {
            // Si el valor es un string vacío, nulo o indefinido, lo tratamos como 'undefined'.
            if (value === '' || value === null || value === undefined) return undefined;
            // Si tiene un valor, intentamos convertirlo a un número.
            return Number(value);
        },
        // 2. DESPUÉS, se aplica la regla de Zod sobre el valor ya limpio:
        z.number({
            // Mensajes de error si la validación de número falla.
            required_error: message,
            invalid_type_error: message
        })
    );

/**
 * El esquema de validación para el formulario de Subcategorías.
 * Cada clave corresponde al atributo 'name' de un campo del formulario.
 */
export const subCategorySchema = z.object({
    
    // El 'name' es un texto (string) y es obligatorio.
    // .min(1, ...) asegura que el campo no esté vacío.
    name: z.string({ required_error: 'El nombre es requerido.' }).min(1, 'El nombre es requerido.'),

    // El 'code' es un texto (string), pero es opcional.
    // El usuario no está obligado a llenarlo.
    code: z.string().optional(),
    
    // La 'description' también es un texto (string) opcional.
    description: z.string().optional(),

    // Para el 'categoryId', usamos nuestro validador reutilizable.
    // Se asegura de que se seleccione una opción y que el valor sea un número.
    categoryId: selectValidator('Debe seleccionar una categoría padre.'),
    
    // El 'status' debe ser un booleano (true o false).
    // Corresponde a un checkbox o un toggle.
    status: z.boolean()
});
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const schema = toTypedSchema(
  z.object({
    name: z.string({ required_error: 'El campo es obligatorio.' }).nonempty(),
    email: z.string({ required_error: 'El campo es obligatorio.' }).nonempty().email(
        {message: 'Asegúrate de ingresar un email válido'}
    ),
    lastname: z.string({ required_error: 'El campo es obligatorio.' }).nonempty(),
    description: z.string({ required_error: 'El campo es obligatorio.' }).nonempty({
        message: 'El campo es obligatorio.'
    }).min(1, { message: 'El campo es obligatorio.'}),
    status: z.string({ required_error: 'El campo es obligatorio.' }).nonempty(),
}),
);

export default schema

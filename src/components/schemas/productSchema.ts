import { z } from 'zod'

export const CreateProductSchema = z.object({
    name: z
        .string({ message: 'El nombre del producto es obligatorio' }),
    price: z
        .preprocess((val) => Number(val), z
            .number({ message: 'El precio del producto debe ser un numero' })
            .min(0.01, { message: 'El precio del producto debe ser mayor a 0' })),
    stock: z
        .preprocess((val) => Number(val), z
            .number({ message: 'La cantidad de stock debe ser un numero' })
            .min(0, { message: 'La camtidad de stock debe ser mayor a 0' }))
})

export type CreateProductInputs = z.infer<typeof CreateProductSchema>

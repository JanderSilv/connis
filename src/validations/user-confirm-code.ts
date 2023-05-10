import { z } from 'zod'

export const userConfirmCodeSchema = z.object({
  code: z
    .string({
      required_error: 'O código é obrigatório',
    })
    .array()
    .min(6, {
      message: 'O código deve ter 6 dígitos',
    })
    .max(6, {
      message: 'O código deve ter 6 dígitos',
    })
    .refine(value => value.join('').match(/^[0-9]{6}$/), {
      message: 'O código deve ter 6 dígitos',
    }),
})

export type UserConfirmCodeSchema = z.infer<typeof userConfirmCodeSchema>

import * as zod from 'zod'

export const recoverPasswordSchemaValidation = zod.object({
  email: zod.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
})

export type RecoverPasswordSchema = zod.infer<typeof recoverPasswordSchemaValidation>

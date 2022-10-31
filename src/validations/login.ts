import * as zod from 'zod'

export const loginSchemaValidation = zod.object({
  email: zod.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: zod.string().min(1, 'Senha é obrigatória'),
})

export type LoginSchema = zod.infer<typeof loginSchemaValidation>

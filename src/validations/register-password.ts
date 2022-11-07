import * as zod from 'zod'
import { regex } from 'src/constants'

export const registerPasswordSchemaValidation = zod
  .object({
    password: zod
      .string()
      .min(1, 'Senha é obrigatório')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(
        regex.strongPassword,
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número'
      ),
    passwordConfirmation: zod.string().min(1, 'Confirmação de senha é obrigatório'),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'A confirmação de senha não confere',
        path: ['passwordConfirmation'],
      })
    }
  })

export type RegisterPasswordSchema = zod.infer<typeof registerPasswordSchemaValidation>

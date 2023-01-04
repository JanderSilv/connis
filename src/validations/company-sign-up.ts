import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'
import { regex } from 'src/constants'
import * as zod from 'zod'

const messages = {
  cnae: 'Código de atividade da empresa é obrigatório',
}

export const cnpjValidationSchema = zod.object({
  cnpj: zod
    .string()
    .min(1, 'CNPJ é obrigatório')
    .refine(value => !!value && isValidCNPJ(value), 'CNPJ inválido'),
})

export type CnpjSchema = zod.infer<typeof cnpjValidationSchema>

export const companySocialSignUpValidationSchema = zod
  .object({
    name: zod
      .string()
      .min(1, 'Nome da empresa é obrigatório')
      .min(3, 'Nome da empresa deve ter no mínimo 3 caracteres'),
    email: zod.string().min(1, 'Email é obrigatório').email('Email inválido'),
    phone: zod.string().min(1, 'Telefone é obrigatório'),
    cnae: zod
      .object(
        {
          id: zod.string().min(1, messages.cnae),
          label: zod.string().min(1, messages.cnae),
        },
        {
          required_error: messages.cnae,
        }
      )
      .nullable()
      .transform((value, ctx) => {
        if (value == null)
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: messages.cnae,
          })
        return value ?? null
      }),
    image: zod.string().nullable().optional(),
  })
  .merge(cnpjValidationSchema)

export type CompanySocialSignUpSchema = zod.infer<typeof companySocialSignUpValidationSchema>

export const companySignUpValidationSchema = companySocialSignUpValidationSchema
  .extend({
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

export type CompanySignUpSchema = zod.infer<typeof companySignUpValidationSchema>

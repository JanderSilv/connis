import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'
import * as zod from 'zod'

import { CompanySize } from 'src/models/enums'

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

export const companySignUpValidationSchema = zod
  .object({
    name: zod
      .string()
      .min(1, 'Nome da empresa é obrigatório')
      .min(3, 'Nome da empresa deve ter no mínimo 3 caracteres'),
    email: zod.string().min(1, 'Email é obrigatório').email('Email inválido'),
    phone: zod.string().min(1, 'Telefone é obrigatório'),
    address: zod.object({
      city: zod.string().min(1, 'Cidade é obrigatório'),
      cep: zod.string().min(1, 'CEP é obrigatório'),
      uf: zod.string().min(1, 'UF é obrigatório'),
      street: zod.string({
        required_error: 'Rua é obrigatório',
      }),
      number: zod.number({
        required_error: 'Número é obrigatório',
      }),
      complement: zod.string({
        required_error: 'Complemento é obrigatório',
      }),
      country: zod.string({
        required_error: 'País é obrigatório',
      }),
    }),
    size: zod.nativeEnum(CompanySize),
    socialCapital: zod.number().min(1, 'Capital social é obrigatório'),
    cnae: zod.object(
      {
        id: zod.string().min(1, messages.cnae),
        label: zod.string().min(1, messages.cnae),
      },
      {
        required_error: messages.cnae,
      }
    ),
    image: zod.string().nullable().optional(),
  })
  .merge(cnpjValidationSchema)

export type CompanySignUpSchema = zod.infer<typeof companySignUpValidationSchema>

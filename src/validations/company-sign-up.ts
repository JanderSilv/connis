import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

const strongPasswordRegex = /^(?=[^A-Z\s]*[A-Z])(?=[^a-z\s]*[a-z])(?=[^\d\s]*\d)(?=\w*[\W_])\S{8,}$/

const messages = {
  cnae: 'Código de atividade da empresa é obrigatório',
}

export const companySignUpSchemaValidation = yup.object({
  name: yup
    .string()
    .required('Nome da empresa é obrigatório')
    .min(3, 'Nome da empresa deve ter no mínimo 3 caracteres'),
  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .test('cnpj', 'CNPJ inválido', value => !!value && isValidCNPJ(value)),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  phone: yup.string().required('Telefone é obrigatório'),
  cnae: yup
    .object({
      id: yup.string().required(),
      label: yup.string().required(),
    })
    .required(messages.cnae)
    .typeError(messages.cnae),
  password: yup
    .string()
    .required('Senha é obrigatório')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(
      strongPasswordRegex,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número'
    ),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha é obrigatório')
    .oneOf([yup.ref('password')], 'A senha e a confirmação necessitam ser iguais'),
})

export type CompanySignUpSchema = yup.InferType<typeof companySignUpSchemaValidation>

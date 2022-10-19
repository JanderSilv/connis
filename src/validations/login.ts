import * as yup from 'yup'

export const loginSchemaValidation = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
})

export type LoginSchema = yup.InferType<typeof loginSchemaValidation>

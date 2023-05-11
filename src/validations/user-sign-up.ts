import { z } from 'zod'
import { isValidMobilePhone } from '@brazilian-utils/brazilian-utils'

import { UserType } from 'src/models/enums'

import { regex } from 'src/constants'
import { userService } from 'src/services'
import { toast } from 'src/helpers/shared'

const validatedFieldValues = {
  email: '',
  userName: '',
}

export const userSignUpValidationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  userName: z
    .string({
      required_error: 'Nome de usuário é obrigatório',
    })
    .min(3, 'Deve ter no mínimo 3 caracteres')
    .max(20, 'Deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9]/, 'Não pode começar com hífen ou underscore')
    .regex(/^[a-zA-Z0-9\_\-\.]*$/, 'Deve conter apenas letras, números, hífens, ponto e underscores')
    .refine(
      async value => {
        if (!value || value === validatedFieldValues.userName) return true
        try {
          const { data } = await userService.checkUsername(value)
          if (data) validatedFieldValues.userName = value
          return data
        } catch (error) {
          toast.show('Erro ao verificar nome de usuário. Por favor, tente novamente mais tarde', 'error')
        }
      },
      {
        message: 'Nome de usuário já cadastrado',
      }
    ),
  email: z
    .string({
      required_error: 'Email é obrigatório',
    })
    .email('Email inválido')
    .refine(
      async value => {
        if (!value || value === validatedFieldValues.email) return true
        try {
          const { data } = await userService.checkEmail(value)
          if (data) validatedFieldValues.email = value
          return data
        } catch (error) {
          toast.show('Erro ao verificar o email. Por favor, tente novamente mais tarde', 'error')
        }
      },
      {
        message: 'Email já cadastrado',
      }
    ),
  image: z.string().nullable().optional(),
  type: z.nativeEnum(UserType),
  phone: z
    .string({
      required_error: 'Telefone é obrigatório',
    })
    .refine(value => isValidMobilePhone(value), 'Telefone inválido'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, 'Deve ter no mínimo 8 caracteres')
    .regex(
      regex.strongPassword,
      'Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
    ),
})

export type UserSignUpSchema = z.infer<typeof userSignUpValidationSchema>

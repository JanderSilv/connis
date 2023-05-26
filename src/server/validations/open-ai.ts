import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { z } from 'zod'

const errors = {
  messages: {
    min: 'É necessário enviar pelo menos uma mensagem',
    required: 'As mensagens são obrigatórias',
  },
  userId: {
    invalidType: 'O id do usuário necessita ser um número',
    required: 'O id do usuário é obrigatório',
    nonNegative: 'O id do usuário precisa ser um número não negativo',
  },
}

export const validationSchema = z.object({
  messages: z
    .object({ role: z.nativeEnum(ChatCompletionRequestMessageRoleEnum), content: z.string() })
    .array()
    .min(1, errors.messages.min),
  userId: z
    .number({
      invalid_type_error: errors.userId.invalidType,
      required_error: errors.userId.required,
    })
    .nonnegative(errors.userId.nonNegative),
})

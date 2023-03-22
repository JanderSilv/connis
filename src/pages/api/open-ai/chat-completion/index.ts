import { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai'
import * as zod from 'zod'

import { openAIApi } from 'src/server/services/open-ai'

type ChatCompletionBody = {
  messages: ChatCompletionRequestMessage[]
  userId: string
}

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

const schema = zod.object({
  messages: zod
    .object({ role: zod.nativeEnum(ChatCompletionRequestMessageRoleEnum), content: zod.string() })
    .array()
    .min(1, errors.messages.min),
  userId: zod
    .number({
      invalid_type_error: errors.userId.invalidType,
      required_error: errors.userId.required,
    })
    .nonnegative(errors.userId.nonNegative),
})

async function chatCompletionHandler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { messages, userId } = request.body as ChatCompletionBody

    const result = schema.safeParse(request.body)

    if (!result.success) return response.status(400).json(result.error.issues[0])

    try {
      const completion = await openAIApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.6,
        user: userId.toString(),
      })
      response.status(200).json(completion.data.choices[0].message?.content)
    } catch (error) {
      console.error({ error })
      response.status(500).json({
        message: 'Ocorreu um erro durante a sua requisição',
      })
    }
  }
}

export default chatCompletionHandler

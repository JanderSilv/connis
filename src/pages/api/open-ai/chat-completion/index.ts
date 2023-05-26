import { NextApiRequest, NextApiResponse } from 'next'

import { ChatCompletionBody } from 'src/server/models/types'

import { openAIApi } from 'src/server/services/open-ai'
import { validationSchema } from 'src/server/validations/open-ai'

async function chatCompletionHandler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { messages, userId } = request.body as ChatCompletionBody

    const result = validationSchema.safeParse(request.body)

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

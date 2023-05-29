import { ChatCompletionBody } from 'src/server/models/types'
import { OpenAIStream } from 'src/server/services/open-ai'
import { validationSchema } from 'src/server/validations/open-ai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const config = {
  runtime: 'edge',
}

async function chatCompletionStreamHandler(request: Request): Promise<Response> {
  if (request.method === 'POST') {
    const body = (await request.json()) as ChatCompletionBody

    const result = validationSchema.safeParse(body)

    if (!result.success) return new Response(result.error.issues[0].message, { status: 400 })

    const { messages, userId } = body

    const stream = await OpenAIStream({
      model: 'gpt-3.5-turbo',
      messages,
      stream: true,
      user: userId.toString(),
    })

    return new Response(stream)
  }

  return new Response('Method not allowed', { status: 405 })
}

export default chatCompletionStreamHandler

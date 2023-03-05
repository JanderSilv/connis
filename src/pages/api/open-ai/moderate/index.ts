import { NextApiRequest, NextApiResponse } from 'next'
import * as zod from 'zod'
import { openAIApi } from 'src/server/services/open-ai'

const schema = zod.object({
  input: zod.string().min(1, 'O input é obrigatório'),
})

type ModerateBody = zod.infer<typeof schema>

async function moderateHandler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { input } = request.body as ModerateBody

    const result = schema.safeParse(request.body)

    if (!result.success) {
      return response.status(400).json({
        error: result.error.issues[0],
      })
    }

    try {
      const { data } = await openAIApi.createModeration({
        input,
      })

      const moderatedProposal = data.results[0]

      return response.status(200).json(moderatedProposal)
    } catch (error) {
      console.error({ error })
      response.status(500).json({
        error: {
          message: 'Ocorreu um erro durante a sua requisição',
        },
      })
    }
  }
}

export default moderateHandler

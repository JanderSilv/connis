import { proposalRegisterService } from 'src/services/proposal-register'
import { server, rest } from 'src/__tests__/test-server'

const baseUrl = '/api/open-ai'

describe('Proposal Register - getAllSuggestionsGenerator', () => {
  it('should return all suggestions', async () => {
    server.use(
      rest.post(`${baseUrl}/moderate`, (request, response, context) => {
        return response(
          context.status(200),
          context.json({
            flagged: false,
          })
        )
      })
    )
    server.use(
      rest.post(`${baseUrl}/chat-completion`, (request, response, context) => {
        return response(context.status(200), context.json('Olá, mundo'))
      })
    )

    const proposal = {
      projectDescription: 'Descrição do projeto',
      description: 'Descrição da proposta',
      userId: 1,
    }

    const suggestions = []
    for await (const suggestion of proposalRegisterService.getAllSuggestionsGenerator(proposal)) {
      suggestions.push(suggestion)
    }

    expect(suggestions).toEqual([
      {
        key: 'proposal',
        data: 'Olá, mundo',
        moderation: {
          flagged: false,
        },
      },
      {
        key: 'keywords',
        data: 'Olá, mundo',
        moderation: {
          flagged: false,
        },
      },
      {
        key: 'trl',
        data: 'Olá, mundo',
        moderation: {
          flagged: false,
        },
      },
    ])
  })
})

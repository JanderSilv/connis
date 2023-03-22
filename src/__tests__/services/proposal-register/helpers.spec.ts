import { getModeratedProposal, getSuggestionPrompt, sendMessages } from 'src/services/proposal-register/helpers'
import { server, rest } from 'src/__tests__/test-server'

const baseUrl = '/api/open-ai'

describe('Proposal Register - getModeratedProposal', () => {
  it('should return a moderated proposal without violations', async () => {
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

    const response = await getModeratedProposal('Sou um texto sem violações')
    expect(response).toEqual({
      flagged: false,
    })
  })

  it('should return a moderated proposal with violations', async () => {
    server.use(
      rest.post(`${baseUrl}/moderate`, (request, response, context) => {
        return response(
          context.status(200),
          context.json({
            flagged: true,
            categories: {
              'hate/threatening': true,
            },
          })
        )
      })
    )

    const response = await getModeratedProposal('Desejo a morte de todos os funcionários da Connis')

    expect(response).toEqual({
      flagged: true,
      categories: {
        'hate/threatening': true,
      },
    })
  })
})

describe('Proposal Register - sendMessages', () => {
  it('should send messages to the chat completion endpoint', async () => {
    server.use(
      rest.post(`${baseUrl}/chat-completion`, (request, response, context) => {
        return response(context.status(200), context.json('Olá, mundo'))
      })
    )

    const response = await sendMessages({
      userId: 1,
      messages: [
        {
          role: 'user',
          content: 'Diga: Olá, mundo',
        },
      ],
    })

    expect(response.data).toEqual('Olá, mundo')
  })
})

describe('Proposal Register - getSuggestionPrompt', () => {
  it('should return the correct prompt for the proposal suggestion', () => {
    const prompt = getSuggestionPrompt('proposal', 'Sou um texto de teste')

    expect(prompt).toEqual(
      'Com base na descrição do problema abaixo, sugira em tópicos, sem marcador antes do tópico, como melhor descrever o problema, com o objetivo de entender todo o escopo:\n' +
        'Sou um texto de teste'
    )
  })
  it('should return the correct prompt for the keywords suggestion', () => {
    const prompt = getSuggestionPrompt('keywords', 'Sou um texto de teste')

    expect(prompt).toEqual(
      'Com base na descrição do projeto e do problema, retorne algumas palavras chaves. Retorne somente as palavras, separadas por vírgula e sem ponto final.\n' +
        'Sou um texto de teste'
    )
  })
  it('should return the correct prompt for the trl suggestion', () => {
    const prompt = getSuggestionPrompt('trl', 'Sou um texto de teste')

    expect(prompt).toEqual(
      'Com base na descrição do projeto e do problema, retorne a possível métrica TRL\n' + 'Sou um texto de teste'
    )
  })
})

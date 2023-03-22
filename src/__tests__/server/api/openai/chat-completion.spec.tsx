import { testApiHandler } from 'next-test-api-route-handler'
import { ResponseError } from 'src/models/types'
import chatCompletionHandler from 'src/pages/api/open-ai/chat-completion'

describe('Moderate Api Route', () => {
  it('should return 400 error case send empty messages', async () => {
    await testApiHandler<ResponseError>({
      handler: chatCompletionHandler,
      test: async ({ fetch }) => {
        const fetchResponse = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            messages: [],
            userId: 123,
          }),
        })

        const response = await fetchResponse.json()
        expect(fetchResponse.status).toBe(400)
        expect(response.message).toBe('É necessário enviar pelo menos uma mensagem')
      },
    })
  })

  it('should return 400 error case send empty userId', async () => {
    await testApiHandler<ResponseError>({
      handler: chatCompletionHandler,
      test: async ({ fetch }) => {
        const fetchResponse = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content:
                  'Você é um consultor que auxilia empresas a escrever bons pedidos de ajuda para problemas em projetos',
              },
            ],
          }),
        })

        const response = await fetchResponse.json()
        expect(fetchResponse.status).toBe(400)
        expect(response.message).toBe('O id do usuário é obrigatório')
      },
    })
  })

  it(
    'should succeed case send valid body',
    async () =>
      await testApiHandler<string | undefined>({
        handler: chatCompletionHandler,
        test: async ({ fetch }) => {
          const fetchResponse = await fetch({
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              messages: [
                {
                  role: 'system',
                  content:
                    'Você é um consultor que auxilia empresas a escrever bons pedidos de ajuda para problemas em projetos',
                },
                {
                  role: 'user',
                  content: 'Olá, tudo bem?',
                },
              ],
              userId: 123,
            }),
          })

          const response = await fetchResponse.json()
          expect(fetchResponse.status).toBe(200)
          expect(response).not.toBeUndefined()
        },
      }),
    50_000
  )
})

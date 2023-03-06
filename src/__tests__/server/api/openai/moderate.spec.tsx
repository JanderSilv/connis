import { testApiHandler } from 'next-test-api-route-handler'
import { CreateModerationResponseResultsInner } from 'openai'
import moderateHandler from 'src/pages/api/open-ai/moderate'

describe('Moderate Api Route', () => {
  it('should return if text has no violations', async () => {
    await testApiHandler<CreateModerationResponseResultsInner>({
      handler: moderateHandler,
      test: async ({ fetch }) => {
        const fetchResponse = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            input: 'Sou um texto sem violações',
          }),
        })

        const response = await fetchResponse.json()
        expect(response.flagged).toBe(false)
      },
    })
  })

  it('should return if text has violations', async () => {
    await testApiHandler<CreateModerationResponseResultsInner>({
      handler: moderateHandler,
      test: async ({ fetch }) => {
        const fetchResponse = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            input: 'Desejo a morte de todos os funcionários da Connis',
          }),
        })

        const response = await fetchResponse.json()
        expect(response.categories['hate/threatening']).toBe(true)
        expect(response.flagged).toBe(true)
      },
    })
  })
})

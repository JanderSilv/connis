import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('*', (request, response, context) => {
    console.error('Please add request handler for: ', request.url.toString())
    return response(
      context.status(500),
      context.json({ error: 'Please add request handler for: ' + request.url.toString() })
    )
  }),
  rest.post('*', (request, response, context) => {
    console.error('Please add request handler for: ', request.url.toString())
    return response(
      context.status(500),
      context.json({ error: 'Please add request handler for: ' + request.url.toString() })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export { server, rest }

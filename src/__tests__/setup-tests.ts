// **Global Mocks**
// Any mocks included here, in `@/__tests__/test-utils`, apply to all tests.
import '@testing-library/jest-dom'
import { fakeData } from 'src/data/fake'

// Due to Jest transformer issues, we mock next-auth's useSession hook directly:
export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: fakeData.company,
}
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => ({
      data: mockSession,
      status: 'authenticated',
    })),
  }
})
// Reference: https://github.com/nextauthjs/next-auth/discussions/4185#discussioncomment-2397318
// We also need to mock the whole next-auth package, since it's used in
// our various pages via the `export { getServerSideProps }` function.
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(),
  getServerSession: jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          expiresIn: undefined,
          loggedInAt: undefined,
          session: mockSession,
        })
      })
  ),
}))
// Reference: https://github.com/nextauthjs/next-auth/issues/4866

// Mock Next.js's useRouter hook using the "next-router-mock" package:
jest.mock('next/dist/client/router', () => jest.requireActual('next-router-mock'))
jest.mock('next/dist/shared/lib/router-context', () => {
  const { createContext } = jest.requireActual('react')
  const router = jest.requireActual('next-router-mock').default
  const RouterContext = createContext(router)
  return { RouterContext }
})
// Reference: https://github.com/scottrippey/next-router-mock/issues/58#issuecomment-1182861712

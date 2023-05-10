import { act, fireEvent, render } from '@testing-library/react'
import { Layout } from 'src/layouts/app'

describe('App Layout', () => {
  it('should render the app layout', () => {
    const { container } = render(
      <Layout>
        <h1>Test</h1>
      </Layout>
    )
    expect(container).toBeInTheDocument()
  })
  it('should open the user menu', () => {
    const { getByRole } = render(
      <Layout>
        <h1>Test</h1>
      </Layout>
    )
    const button = getByRole('button', { name: /user-menu-button/i })
    act(() => {
      fireEvent.click(button)
    })
  })
})

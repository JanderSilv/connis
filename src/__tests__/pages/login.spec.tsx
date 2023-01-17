import { render, screen } from '@testing-library/react'
import LoginPage from 'src/pages/login'

describe('Login page', () => {
  it('should render login page', () => {
    render(<LoginPage />)
    const title = screen.getByRole('heading', { name: /Login/i })
    expect(title).toBeInTheDocument()
  })
})

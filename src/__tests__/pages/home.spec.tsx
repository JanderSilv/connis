import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'

import { fakeData } from 'src/data/fake'
import HomePage from 'src/pages/index'
import { theme } from 'src/styles/theme'

describe('Home page', () => {
  const { myProposals, recentOffers } = fakeData
  it('should render home page as company', async () => {
    render(<HomePage myProposals={myProposals} myOffers={recentOffers} userType="company" />)
    const title = screen.getByRole('heading', { name: /Propostas Recentes/i })
    expect(title).toBeInTheDocument()
  })

  it('should render home page as ICT', async () => {
    render(<HomePage negotiations={myProposals} requests={myProposals} opportunities={myProposals} userType="ict" />, {
      wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    })
    const title = screen.getByRole('heading', { name: /Seja bem vindo ao Connis\./i })
    expect(title).toBeInTheDocument()
  })
})

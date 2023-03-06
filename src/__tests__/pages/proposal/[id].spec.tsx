import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'

import { fakeData } from 'src/data/fake'
import ProposalPage from 'src/pages/proposta/[id]'
import { theme } from 'src/styles/theme'

describe('Home page', () => {
  const { proposal, myOffers } = fakeData
  it('should render proposal page', () => {
    render(<ProposalPage proposal={proposal} offers={myOffers} />, {
      wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    })
    const title = screen.getByRole('heading', { name: proposal.title })
    expect(title).toBeInTheDocument()
  })
})

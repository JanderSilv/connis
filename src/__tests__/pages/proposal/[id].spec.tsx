import { render, screen } from '@testing-library/react'
import { fakeData } from 'src/data/fake'
import ProposalPage from 'src/pages/proposta/[id]'

describe('Home page', () => {
  const { proposal, myOffers } = fakeData
  it('should render proposal page', () => {
    render(<ProposalPage proposal={proposal} offers={myOffers} />)
    const title = screen.getByRole('heading', { name: proposal.title })
    expect(title).toBeInTheDocument()
  })
})

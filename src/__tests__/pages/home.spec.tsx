import { render, screen } from '@testing-library/react'
import { fakeData } from 'src/data/fake'
import HomePage from 'src/pages/index'

describe('Home page', () => {
  const { myProposals, recentOffers } = fakeData
  it('should render home page', async () => {
    render(<HomePage myProposals={myProposals} myOffers={recentOffers} />)
    const title = screen.getByRole('heading', { name: /Propostas Recentes/i })
    expect(title).toBeInTheDocument()
  })
})

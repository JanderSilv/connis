import { BoxProps, List, ListProps, Typography } from '@mui/material'
import { Link } from 'src/components/link'
import { ProposalCard } from 'src/components/proposal'
import { ProposalStatus } from 'src/models/enums'

import { ProposalWithOffers } from 'src/models/types'
import { EmptyTypography, Header, Wrapper } from '../styles'

type RecentProposalsProps = {
  proposals: ProposalWithOffers[]
  listProps?: ListProps
} & BoxProps

const countUnseenProposals = (proposal: ProposalWithOffers) => {
  const offers = Object.values(proposal.offers)
  if (offers.length === 0) return 0
  if (proposal.status === ProposalStatus.opened)
    return offers.reduce((acc, offer) => (offer.at(-1)?.viewed ? acc : acc + 1), 0)
  return 0
}

export const RecentProposals = (props: RecentProposalsProps) => {
  const { title, proposals, listProps, ...rest } = props

  const hasProposals = proposals.length > 0

  const seeMoreLinkComponent = (isMobile = false) =>
    hasProposals && (
      <Link
        href="/minhas-propostas"
        muiLinkProps={{
          sx: isMobile
            ? { textAlign: 'center', display: { xs: 'block', sm: 'none' } }
            : { display: { xs: 'none', sm: 'inline' } },
        }}
      >
        Ver todas
      </Link>
    )

  return (
    <Wrapper {...rest}>
      <Header>
        <Typography variant="h2" color="primary">
          Propostas Recentes
        </Typography>
        {seeMoreLinkComponent()}
      </Header>

      {hasProposals ? (
        <List {...listProps} aria-label="Propostas Recentes">
          {proposals.map(proposal => (
            <ProposalCard key={proposal.id} {...proposal} unseenActivities={countUnseenProposals(proposal)} />
          ))}
        </List>
      ) : (
        <EmptyTypography>Nenhuma proposta recente</EmptyTypography>
      )}

      {seeMoreLinkComponent(true)}
    </Wrapper>
  )
}

import { BoxProps, List, ListProps, Typography } from '@mui/material'
import { Proposal } from 'src/models/types'
import { Link } from 'src/components/shared'
import { ProposalCard } from 'src/components/proposal'
import { EmptyTypography, Header, Wrapper } from '../styles'

type RecentProposalsProps = {
  proposals: Proposal[]
  listProps?: ListProps
} & BoxProps

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
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </List>
      ) : (
        <EmptyTypography>Nenhuma proposta recente</EmptyTypography>
      )}

      {seeMoreLinkComponent(true)}
    </Wrapper>
  )
}

import { BoxProps, List, ListProps, Typography } from '@mui/material'
import { Link } from 'src/components/shared'
import { NegotiationCard } from 'src/components/proposal'

import { Negotiation } from 'src/models/types'
import { EmptyTypography, Header, Wrapper } from '../styles'

type RecentNegotiationsProps = {
  negotiations: Negotiation[]
  listProps?: ListProps
} & BoxProps

export const RecentNegotiations = (props: RecentNegotiationsProps) => {
  const { negotiations, listProps, ...rest } = props

  const hasNegotiations = negotiations.length > 0

  const seeMoreLinkComponent = (isMobile = false) =>
    hasNegotiations && (
      <Link
        href="/minhas-negociacoes"
        sx={
          isMobile
            ? { textAlign: 'center', display: { xs: 'block', sm: 'none' } }
            : { display: { xs: 'none', sm: 'inline' } }
        }
      >
        Ver todas
      </Link>
    )

  return (
    <Wrapper {...rest}>
      <Header>
        <Typography variant="h2" color="primary">
          Negociações Recentes
        </Typography>
        {seeMoreLinkComponent()}
      </Header>

      {hasNegotiations ? (
        <List {...listProps} aria-label="Ofertas Recentes">
          {negotiations.map(negotiation => (
            <NegotiationCard key={negotiation.id} negotiation={negotiation} unseenActivities={1} />
          ))}
        </List>
      ) : (
        <EmptyTypography>Nenhuma negociação recente</EmptyTypography>
      )}

      {seeMoreLinkComponent(true)}
    </Wrapper>
  )
}

import { BoxProps, List, ListProps, Typography } from '@mui/material'
import { Link } from 'src/components/shared'
import { OfferCard } from 'src/components/proposal'

import { Offer } from 'src/models/types'
import { EmptyTypography, Header, Wrapper } from '../styles'

type RecentOffersProps = {
  offers: Offer[]
  listProps?: ListProps
} & BoxProps

export const RecentOffers = (props: RecentOffersProps) => {
  const { offers, listProps, ...rest } = props

  const hasOffers = offers.length > 0

  const seeMoreLinkComponent = (isMobile = false) =>
    hasOffers && (
      <Link
        href="/minhas-ofertas"
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
          Ofertas Recentes
        </Typography>
        {seeMoreLinkComponent()}
      </Header>

      {hasOffers ? (
        <List {...listProps} aria-label="Ofertas Recentes">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} unseenActivities={offer.viewed ? 1 : 0} />
          ))}
        </List>
      ) : (
        <EmptyTypography>Nenhuma proposta recente</EmptyTypography>
      )}

      {seeMoreLinkComponent(true)}
    </Wrapper>
  )
}

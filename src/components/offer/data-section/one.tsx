import { Typography } from '@mui/material'
import { OfferStatusChip } from 'src/components/proposal'

import { useOfferSession } from 'src/hooks/offer'

import { Offer } from 'src/models/types'

import { DataContainer, Section, Title } from 'src/styles/proposal'
import { makeMessageTitle } from './helpers'

export const OfferDataSectionOne = (offer: Offer) => {
  const { description } = offer

  const { userIsTheOfferOwner, status } = useOfferSession(offer)

  return (
    <Section>
      <OfferStatusChip status={offer.status} />

      <DataContainer>
        <Title>{makeMessageTitle(status, userIsTheOfferOwner)}</Title>
        <Typography>{description}</Typography>
      </DataContainer>
    </Section>
  )
}

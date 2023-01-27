import { Typography } from '@mui/material'
import { OfferStatusChip } from 'src/components/proposal'

import { useOfferSession } from 'src/hooks/offer'

import { Offer } from 'src/models/types'

import { DataContainer, Section, Title } from 'src/styles/proposal'
import { makeMessageTitle } from './helpers'

export const OfferDataSectionOne = (offer: Offer) => {
  const { message } = offer

  const { userIsTheOwnerOfOffer, status } = useOfferSession(offer)

  return (
    <Section>
      <OfferStatusChip status={offer.status} />

      <DataContainer>
        <Title>{makeMessageTitle(status, userIsTheOwnerOfOffer)}</Title>
        <Typography>{message}</Typography>
      </DataContainer>
    </Section>
  )
}

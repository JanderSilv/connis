import { Typography } from '@mui/material'
import { OfferStatusChip } from 'src/components/proposal'

import { useOfferSession } from 'src/hooks/offer'

import { Offer } from 'src/models/types'

import { DataContainer, Section, Title } from 'src/styles/proposal'
import { makeMessageTitle } from './helpers'

type Props = {
  hideStatus?: boolean
} & Offer

export const OfferDataSectionOne = (props: Props) => {
  const { description, hideStatus } = props

  const { userIsTheOfferOwner, status } = useOfferSession(props)

  return (
    <Section>
      {!hideStatus && <OfferStatusChip status={props.offerStatus} />}

      <DataContainer sx={{ mt: hideStatus ? 0 : undefined }}>
        <Title>{makeMessageTitle(status, userIsTheOfferOwner)}</Title>
        <Typography>{description}</Typography>
      </DataContainer>
    </Section>
  )
}

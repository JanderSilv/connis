import { Chip, ChipProps } from '@mui/material'
import { offerStatus } from 'src/data/offer'
import { OfferStatus } from 'src/models/enums'

type OfferStatusChipProps = {
  status: OfferStatus
} & ChipProps

export const OfferStatusChip = ({ status, sx, ...rest }: OfferStatusChipProps) => {
  const { label, color } = offerStatus[status]
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        color: 'primary.contrastText',
        backgroundColor: color,
        ...sx,
      }}
      {...rest}
    />
  )
}

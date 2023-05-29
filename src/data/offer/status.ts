import { OfferStatus } from 'src/models/enums'

export const offerStatus = {
  [OfferStatus.opened]: {
    id: OfferStatus.opened,
    color: 'primary.light',
    label: 'Aberto',
  },
  [OfferStatus.accepted]: {
    id: OfferStatus.accepted,
    color: 'success.light',
    label: 'Aceito',
  },
  [OfferStatus.rejected]: {
    id: OfferStatus.rejected,
    color: 'error.light',
    label: 'Cancelado',
  },
}

export const offerStatusOptions = Object.values(offerStatus)

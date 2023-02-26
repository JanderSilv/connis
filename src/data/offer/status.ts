import { OfferStatus } from 'src/models/enums'

export const offerStatus = {
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
  [OfferStatus.opposed]: {
    id: OfferStatus.opposed,
    color: 'warning.light',
    label: 'Contraposto',
  },
  [OfferStatus.sended]: {
    id: OfferStatus.sended,
    color: 'info.light',
    label: 'Aguardando Resposta',
  },
  [OfferStatus.saw]: {
    id: OfferStatus.saw,
    color: 'primary.light',
    label: 'Visualizado',
  },
}

export const offerStatusOptions = Object.values(offerStatus)

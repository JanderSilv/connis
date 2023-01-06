import { OfferStatus } from 'src/models/enums'

export const offerStatus = {
  [OfferStatus.accepted]: {
    color: 'success.light',
    label: 'Aberto',
  },
  [OfferStatus.rejected]: {
    color: 'error.light',
    label: 'Cancelado',
  },
  [OfferStatus.sended]: {
    color: 'warning.light',
    label: 'Aguardando Resposta',
  },
  [OfferStatus.saw]: {
    color: 'warning.light',
    label: 'Visualizado',
  },
}

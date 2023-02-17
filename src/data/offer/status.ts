import { OfferStatus } from 'src/models/enums'

export const offerStatus = {
  [OfferStatus.accepted]: {
    color: 'success.light',
    label: 'Aceito',
  },
  [OfferStatus.rejected]: {
    color: 'error.light',
    label: 'Cancelado',
  },
  [OfferStatus.opposed]: {
    label: 'Contraposto',
    color: 'warning.light',
  },
  [OfferStatus.sended]: {
    color: 'info.light',
    label: 'Aguardando Resposta',
  },
  [OfferStatus.saw]: {
    color: 'primary.light',
    label: 'Visualizado',
  },
}

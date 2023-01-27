import { EditIcon, TaskIcon } from 'src/assets/icons'
import { OfferCategory } from 'src/models/enums'

export const offerCategories = {
  [OfferCategory.default]: {
    id: OfferCategory.default,
    text: 'oferta',
    icon: TaskIcon,
  },
  [OfferCategory.counterProposal]: {
    id: OfferCategory.counterProposal,
    text: 'contra proposta',
    icon: EditIcon,
  },
}

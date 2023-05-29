import { Company } from './company'
import { ICTOffer } from './formalization/ict-offer'
import { Offer } from './offer'
import { Proposal } from './proposal'

export type Negotiation = {
  id: string
  proponent: Company
  interested: Company
  proposal: Proposal
  offers: Offer[]
  ictOffers: ICTOffer[]
  ictOfferAccepted: boolean
}

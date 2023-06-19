import { Company } from './company'
import { ICTOffer } from './formalization/ict-offer'
import { Offer } from './offer'
import { Proposal } from './proposal'

export type Negotiation = {
  id: string
  companyProponent: Company
  companyInterested: Company
  proposal: Proposal
  offers: Offer[]
  ictOffers: ICTOffer[]
  ictOfferAccepted: boolean
}

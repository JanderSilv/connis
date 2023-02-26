import { Proposal } from '../proposal'
import { Offer } from '../offer'

export type CompanyHomeProps = {
  userType: 'company'
  myProposals: Proposal[]
  myOffers: Offer[]
}

export type ICTHomeProps = {
  userType: 'ict'
  negotiations: Proposal[]
  requests: Proposal[]
  opportunities: Proposal[]
}

export type HomeProps = CompanyHomeProps | ICTHomeProps

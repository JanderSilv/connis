import { Proposal } from '../proposal'
import { Offer } from '../offer'
import { UserType } from 'src/models/enums'

export type CompanyHomeProps = {
  userType: UserType.company
  myProposals: Proposal[]
  myOffers: Offer[]
}

export type ICTHomeProps = {
  userType: UserType.ict
  negotiations: Proposal[]
  requests: Proposal[]
  opportunities: Proposal[]
}

export type HomeProps = CompanyHomeProps | ICTHomeProps

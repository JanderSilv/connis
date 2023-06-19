import { Proposal } from '../proposal'
import { Negotiation } from '../negotiation'

export type CompanyHomeProps = {
  userType: 'company'
  proposals: Proposal[]
  negotiations: Negotiation[]
}

export type ICTHomeProps = {
  userType: 'ict'
  data: {
    negotiations: Negotiation[]
    catalog: Proposal[]
  }
}

export type HomeProps = CompanyHomeProps | ICTHomeProps
